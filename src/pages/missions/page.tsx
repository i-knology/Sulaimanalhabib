import ApiOptions, { initialState } from "@/assets/reducers/apiOptions";
import MissionForm from "@/components/missions/MissionForm";
import DisplayCards from "@/components/projects/DisplayCards";
import MissionTable from "@/components/projects/MissionTable";
import { ProjectFormValues } from "@/components/projects/ProjectForm";
import FormBtn from "@/components/ui/FormBtn";
import MissionTopBar from "@/components/ui/MissionsTopbar";
import useResultModal from "@/hooks/useModal";
import { createMission, getAllMissions, updateMission } from "@/services/missions";

import errorException from "@/utils/errorException";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import { AxiosError } from "axios";
import { useReducer, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Missions() {
  const { t } = useTranslation();
  const [mission, setMission] = useState<any>();
  const queryClient = useQueryClient();
  const globalModal = useResultModal();

  // State management
  const [errors, setErrors] = useState<[{ [key: string]: string }] | string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [displayItems, _setDisplayItems] = useState(false);
  const [searchKey, setSearchKey] = useState<string>();
  const [statusId, setStatusId] = useState<number>();
  const [userId, setUserId] = useState<any>();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  // Fetch projects
  const { data, isFetching } = useQuery({
    queryKey: ["missions", filterOptions, searchKey, statusId, userId],
    queryFn: () => {
      const params = searchKey
        ? { ...(searchKey ? { Title: searchKey } : {}) }
        : {
            ...(searchKey ? { Title: searchKey } : {}),
            ...filterOptions,
            ...(statusId ? { StatusId: statusId } : {}),
            ...(userId ? { UserId: userId } : {}),
          };
      return getAllMissions(params);
    },
  });

  console.log("🚀 ~ Missions ~ data:", data);
  // Handlers
  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
    setMission(undefined);
  };
  const handleSearch = (value: string) => setSearchKey(value);

  // Callbacks for mutation
  const handleSuccess = () => {
    toggleDrawer();
    setErrors(null);
    setStatusId(0);
    setSearchKey("");
    queryClient.invalidateQueries({ queryKey: ["missions", filterOptions] });
    globalModal.success({ title: t("createdSuccessfully"), subtitle: "" });
  };

  const handleError = (error: AxiosError) => {
    setErrors(errorException(error));
  };

  // Mutation for creating a project
  const mutation = useMutation({
    mutationFn: (values: ProjectFormValues) =>
      mission ? updateMission(values) : createMission(values),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return (
    <div className="p-2">
      <div className="p-2 bg-white overflow-hidden rounded-xl">
        <MissionTopBar
          search={handleSearch}
          onMemberClick={setUserId}
          onNew={toggleDrawer}
        />

        {displayItems ? (
          <DisplayCards
            isLoading={isFetching}
            data={data?.data?.items}
            dispatch={dispatch}
            totalCount={data?.data?.totalCount}
            // onEdit={(item) => {
            //   setMissionId(item);
            // }}
          />
        ) : (
          <MissionTable
            isFetching={isFetching}
            dispatch={dispatch}
            totalCount={data?.data?.totalCount}
            data={data?.data?.items}
            onEdit={(item) => {
              setMission(item);
              setIsOpen(true);
            }}
          />
        )}

        <Drawer
          onClose={toggleDrawer}
          footer={
            <FormBtn
              form={mission ? "editMission" : "createdMission"}
              text={mission ? t("save") : t("addNewMission")}
              loading={mutation.isPending}
            />
          }
          open={isOpen}
          className="p-0"
          placement="left"
          title={mission ? mission?.title : t("addNewMission")}
          size="large"
        >
          <MissionForm
            errors={errors}
            action={(values: ProjectFormValues) => mutation.mutate(values)}
            data={mission}
          />
        </Drawer>
      </div>
    </div>
  );
}
