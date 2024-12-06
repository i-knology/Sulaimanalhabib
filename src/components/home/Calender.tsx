import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { LuPlus } from "react-icons/lu";
import HomeStatisticCalender from "./HomeStatisticCalender";
export default function HomeCalender({ handleOpenDrawer }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg">
      <Button
        onClick={handleOpenDrawer}
        id="topBarBtn"
        className="bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92] w-full justify-self-end group flex items-center gap-2 overflow-hidden"
        htmlType="button"
        type="primary"
      >
        <span className="flex items-center justify-center transition-all duration-500 xl:group-hover:-translate-x-[-230%] group-hover:-translate-x-[-190%] md:group-hover:-translate-x-[-250%]">
          <LuPlus size={35} />
        </span>

        <p className="absolute -left-[100%] transition-all duration-500 group-hover:left-[35%]">
          <span>{t("addNewMeeting")}</span>
        </p>
      </Button>
      <HomeStatisticCalender />

      {/* <Calender /> */}
    </div>
  );
}
