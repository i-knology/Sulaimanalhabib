import ApiOptions, { initialState } from "@/assets/reducers/apiOptions";
import MissionForm from "@/components/missions/MissionForm";
import DisplayCards from "@/components/projects/DisplayCards";
import MissionTable from "@/components/projects/MissionTable";
import ProjectForm, {
  ProjectFormValues,
} from "@/components/projects/ProjectForm";
import ProjectTable from "@/components/projects/ProjectTable";
import StatusPanel from "@/components/projects/StatusPanel";
import FormBtn from "@/components/ui/FormBtn";
import MissionTopBar from "@/components/ui/MissionsTopbar";
import TopBar from "@/components/ui/TopBar";
import useResultModal from "@/hooks/useModal";
import { getAllMissions } from "@/services/missions";
import {
  createProject,
  updateProject,
} from "@/services/projects";

import errorException from "@/utils/errorException";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import { MenuProps } from "antd/lib";
import { AxiosError } from "axios";
import { useReducer, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";

export default function Missions() {
  const { t } = useTranslation();
  const { missionId } = useParams();
  const queryClient = useQueryClient();
  const globalModal = useResultModal();

  // State management
  const [errors, setErrors] = useState<
    [{ [key: string]: string }] | string | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);
  const [displayItems, setDisplayItems] = useState(false);
  const [searchKey, setSearchKey] = useState<string>();
  const [statusId, setStatusId] = useState<number>();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  // Fetch projects
  const { data, isFetching } = useQuery({
    queryKey: ["missions", filterOptions, searchKey, statusId],
    queryFn: () => {
      const params = searchKey
        ? { ...(searchKey ? { Name: searchKey } : {}) }
        : {
          ...(searchKey ? { Name: searchKey } : {}),
          ...filterOptions,
          ...(statusId ? { StatusId: statusId } : {}),
        };
        return getAllMissions(params);
      },
  });
  
  console.log("🚀 ~ Missions ~ data:", data)
  // Handlers
  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const toggleDisplayItems = () => setDisplayItems((prev) => !prev);
  const handleSearch = (value: string) => setSearchKey(value);
  const handleStatusChange = (id: number) => setStatusId(id);

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
      missionId ? createProject(values) : updateProject(values),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  // Status menu items
  const statusItems: MenuProps["items"] = [
    {
      key: "all",
      label: <span>{t("statuses:all")}</span>,
      onClick: () => handleStatusChange(0),
    },
    {
      key: "completed",
      label: getStatusLabel(t("statuses:completed"), "#2BB900"),
      onClick: () => handleStatusChange(3),
    },
    {
      key: "incomplete",
      label: getStatusLabel(t("statuses:incomplete"), "#E88A0A"),
      onClick: () => handleStatusChange(5),
    },
    {
      key: "ongoing",
      label: getStatusLabel(t("statuses:ongoing"), "#E88A0A"),
      onClick: () => handleStatusChange(2),
    },
    {
      key: "notStarted",
      label: getStatusLabel(t("statuses:notStarted"), "#D10008"),
      onClick: () => handleStatusChange(1),
    },
  ];

  return (
    <div className="p-2 space-y-4">
      {!missionId && (
        <>
          <TopBar
            text={t("addNewMission")}
            openDrawer={toggleDrawer}
          />
    <MissionTopBar 
    search={handleSearch}
    />

          {displayItems ? (
            <DisplayCards
              isLoading={isFetching}
              data={data?.data?.items}
              dispatch={dispatch}
              totalCount={data?.data?.totalCount}
            />
          ) : (
            <MissionTable
              isFetching={isFetching}
              dispatch={dispatch}
              totalCount={data?.data?.totalCount}
              data={data?.data?.items}
            />
          )}

          <Drawer
            onClose={toggleDrawer}
            footer={
              <FormBtn
                form="createProject"
                text={t("addNewMission")}
                loading={mutation.isPending}
              />
            }
            open={isOpen}
            className="p-0"
            placement="left"
            title={t("addNewMission")}
            size="large"
          >
            <MissionForm
              errors={errors}
              action={(values: ProjectFormValues) => mutation.mutate(values)}
            />
          </Drawer>
        </>
      )}
      <Outlet />
    </div>
  );
}

// Helper for generating status label with color
const getStatusLabel = (label: string, color: string) => (
  <div className="flex items-center gap-2">
    <span className={`bg-[${color}] p-2 rounded-full`}></span>
    {label}
  </div>
);
