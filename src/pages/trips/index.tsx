import ProjectTable from "@/components/projects/ProjectTable";
import DisplayCards from "@/components/trips/DisplayCards";
import TripFrom from "@/components/trips/TripFrom";
import TopBar from "@/components/ui/TopBar";
import { Drawer } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";

export default function Trips() {
  const { t } = useTranslation();
  const { taskId } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [displayItems, setDisplayItems] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  const handleDisplayItems = () => setDisplayItems(!displayItems);

  return (
    <div className="p-2 space-y-4">
      {!taskId && (
        <>
          <TopBar
            text={t("addNewTrip")}
            openDrawer={openDrawer}
            displayItems={handleDisplayItems}
          />

          {!displayItems ? <DisplayCards /> : <ProjectTable />}

          <Drawer
            onClose={closeDrawer}
            open={isOpen}
            placement="left"
            title={t("addNewTrip")}
            size="large"
          >
            <TripFrom />
          </Drawer>
        </>
      )}
      <Outlet />
    </div>
  );
}
