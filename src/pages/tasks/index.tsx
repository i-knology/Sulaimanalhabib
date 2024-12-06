import ProjectTable from "@/components/projects/ProjectTable";
import TopBar from "@/components/ui/TopBar";
import { Button, Drawer, Input } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCommentDetail } from "react-icons/bi";
import { LuSend } from "react-icons/lu";
import { useParams } from "react-router-dom";

import DisplayCards from "@/components/tasks/DisplayCards";
import StatusPanel from "@/components/tasks/StatusPanel";
import TaskDetails from "@/components/tasks/TaskDetails";
import TaskForm from "@/components/tasks/TaskForm";

export default function Tasks() {
  const { t } = useTranslation();
  const { projectId } = useParams();

  const [isOpen, setIsOpen] = useState("close");
  const [displayItems] = useState(true);

  const openAddDrawer = () => {
    setIsOpen("addNewTask");
  };
  const openDetailsDrawer = () => {
    setIsOpen("taskDetails");
  };
  const closeDrawer = () => {
    setIsOpen("close");
  };

  // const handleDisplayItems = () => setDisplayItems(!displayItems);

  return (
    <div className="p-2 space-y-4">
      {!projectId && (
        <>
          <TopBar
            text={t("addNewTask")}
            openDrawer={openAddDrawer}
            // displayItems={handleDisplayItems}
          />

          <StatusPanel />

          {displayItems ? (
            <DisplayCards openDetailsDrawer={openDetailsDrawer} />
          ) : (
            <></>
            // {/* <ProjectTable /> */}
          )}

          <Drawer
            onClose={closeDrawer}
            footer={
              <div className="flex items-center ">
                <img src="/illustrations/profile-image.svg" alt="" />
                <Input
                  variant="filled"
                  className="w-full border-e-0 rounded-r-none"
                  placeholder={t("writeYourCommentHere")}
                  prefix={<BiCommentDetail size={24} />}
                />

                <div className="bg-gray-100 rounded-l-lg px-1">
                  <Button
                    className="bg-gradient-to-r rounded-full border-primary border-s-0 from-primary/[0.92] to-secondary/[0.92]"
                    type="primary"
                    htmlType="submit"
                  >
                    <LuSend size={24} />
                  </Button>
                </div>
              </div>
            }
            open={isOpen == "taskDetails"}
            placement="left"
            title={t("taskDetails")}
            size="large"
          >
            <TaskDetails />
          </Drawer>

          <Drawer
            onClose={closeDrawer}
            open={isOpen == "addNewTask"}
            placement="left"
            title={t("addNewTask")}
            size="large"
          >
            <TaskForm />
          </Drawer>
        </>
      )}
    </div>
  );
}
