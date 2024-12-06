import LogisticItemForm from "@/components/logisticItems/LogisticItemForm";
import LogisticItemsHeader from "@/components/logisticItems/LogisticItemsHeader";
import LogisticItemsTable, {
  DataType,
} from "@/components/logisticItems/LogisticItemsTable";
import TopBar from "@/components/ui/TopBar";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LogisticItems() {
  const { t } = useTranslation();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const dummyData: DataType[] = [
    {
      item: "Logistic Item 1",
      lastUpdate: "2024-11-01",
      actions: "Edit",
    },
    {
      item: "Logistic Item 2",
      lastUpdate: "2024-11-02",
      actions: "Edit",
    },
    {
      item: "Logistic Item 3",
      lastUpdate: "2024-11-03",
      actions: "Edit",
    },
    {
      item: "Logistic Item 4",
      lastUpdate: "2024-11-04",
      actions: "Edit",
    },
  ];

  return (
    <div className="p-2 space-y-4">
      <TopBar text={t("addNewItem")} openDrawer={() => setIsOpenDrawer(true)} />
        
      <LogisticItemsHeader />

      <LogisticItemsTable
        actions={{
          edit: () => setIsOpenDrawer(true),
        }}
        data={dummyData}
      />

      <Drawer
        onClose={() => setIsOpenDrawer(false)}
        open={isOpenDrawer == true}
        placement="left"
        title={t("addNewItem")}
        size="large"
        footer={
          <Button
            className="w-full mt-4 bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
            type="primary"
            htmlType="submit"
          >
            {t("save")}
          </Button>
        }
      >
        <LogisticItemForm />
      </Drawer>
    </div>
  );
}
