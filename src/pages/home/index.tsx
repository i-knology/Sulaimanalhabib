import HomeCalender from "@/components/home/Calender";
import CategoryPanel from "@/components/home/CategoryPanel";
import StatusPanel from "@/components/home/StatusPanel";
import MeetingForm, { Meeting } from "@/components/meetings/MeetingForm";
import useResultModal from "@/hooks/useModal";
import { createMeeting } from "@/services/meetings";
import errorException from "@/utils/errorException";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleCloseDrawer = () => setIsOpenDrawer(false);
  const handleOpenDrawer = () => setIsOpenDrawer(true);

  const client = useQueryClient();
  const globalModal = useResultModal();

  const mutation = useMutation<unknown, AxiosError,Meeting>({
    mutationFn: (data) => createMeeting(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Statistics"] });
      client.invalidateQueries({ queryKey: ["meetings"] });
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

  return (
    <>
      <StatusPanel />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-5">
        <CategoryPanel />
        <HomeCalender handleOpenDrawer={handleOpenDrawer} />
      </div>

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
    </>
  );
}