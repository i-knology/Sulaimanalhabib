import { useReducer, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Drawer } from "antd";
import { useTranslation } from "react-i18next";

import ApiOptions, { initialState } from "@/assets/reducers/apiOptions";
import DisplayCards from "@/components/meetings/DisplayCards";
import MeetingForm from "@/components/meetings/MeetingForm";
import MeetingTable from "@/components/meetings/MeetingTable";
import StatusPanel from "@/components/meetings/StatusPanel";
import TopBar from "@/components/ui/TopBar";
import useResultModal from "@/hooks/useModal";
import { createMeeting, getMeetings } from "@/services/meetings";
import errorException from "@/utils/errorException";
import { MenuProps } from "antd/lib";

export default function Meetings() {
  const { t } = useTranslation();
  const client = useQueryClient();

  // States
  const [displayItems, setDisplayItems] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterByPriority, setFilterByPriority] = useState<number>();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);

  // Modal for feedback
  const globalModal = useResultModal();

  // Queries and Mutations
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["meetings", filterOptions, searchKey, filterByPriority],
    queryFn: () =>
      getMeetings({
        ...filterOptions,
        Title: searchKey,
        PriorityTypeId: filterByPriority,
      }),
  });

  const mutation = useMutation<unknown, AxiosError>({
    mutationFn: (data) => createMeeting(data),
    onSuccess: () => {
      refetch();
      client.invalidateQueries({
        queryKey: ["Statistics"],
      });
      handleCloseDrawer();
      globalModal.success({
        title: t("createdSuccessfully"),
        subtitle: "",
      });
    },
    onError: (error: AxiosError) => {
      const messages = errorException(error);
      console.error(messages);
    },
  });

  // Handlers
  const handleOpenDrawer = () => setIsOpenDrawer(true);
  const handleCloseDrawer = () => setIsOpenDrawer(false);
  const handleSearch = (value: string) => setSearchKey(value);
  const items: MenuProps["items"] = [
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2">
          <span className="bg-[#D10008] p-2 rounded-full"></span>
          {t("statuses:urgent")}
        </div>
      ),
      onClick: () => {
        setFilterByPriority(3);
      },
    },
    {
      key: "3",
      label: (
        <div className="flex items-center gap-2">
          <span className="bg-[#E88A0A] p-2 rounded-full"></span>
          {t("statuses:notUrgent")}
        </div>
      ),
      onClick: () => {
        setFilterByPriority(2);
      },
    },
    {
      key: "4",
      label: (
        <div className="flex items-center gap-2">
          <span className="bg-[#4CADCF] p-2 rounded-full"></span>
          {t("statuses:notUrgentAndNotImportant")}
        </div>
      ),
      onClick: () => {
        setFilterByPriority(1);
      },
    },
  ];

  return (
    <div className="p-2 space-y-4 overflow-hidden">
      <TopBar
        search={handleSearch}
        text={t("addNewMeeting")}
        openDrawer={handleOpenDrawer}
        displayItems={setDisplayItems}
        items={items}
      />

      <StatusPanel
        isFetching={isFetching}
        tagsCount={String(data?.data?.data?.totalCount)}
      />

      {displayItems ? (
        <DisplayCards
          loading={isFetching}
          dispatch={dispatch}
          totalCount={data?.data?.data?.totalCount}
          data={data?.data?.data?.items}
        />
      ) : (
        <MeetingTable
          isFetching={isFetching}
          dispatch={dispatch}
          totalCount={data?.data?.data?.totalCount}
          data={data?.data?.data?.items}
        />
      )}

      <Drawer
        onClose={handleCloseDrawer}
        open={isOpenDrawer}
        placement="left"
        title={t("addNewMeeting")}
        size="large"
      >
        <div className="overflow-hidden">
          <MeetingForm mutation={mutation} />
        </div>
      </Drawer>
    </div>
  );
}
