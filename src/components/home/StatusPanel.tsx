import { Typography } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { FaUsersGear } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuCalendarCheck } from "react-icons/lu";
import { TbUsersGroup } from "react-icons/tb";
import StatusButton from "../ui/StatusButton";
import { getStatistics } from "@/services/home";
import { useQuery } from "@tanstack/react-query";

export default function StatusPanel() {
  const { t } = useTranslation();

  const { data } = useQuery({
    queryKey: ["Statistics"],
    queryFn: () => getStatistics(),
  });

  const statusButtonProps = [
    {
      bgcolor: "white",
      count: data?.Users,
      color: "#2336AD",
      text: t("users"),
      icon: <TbUsersGroup className="text-2xl" />,
    },
    {
      bgcolor: "white",
      count: data?.Committees,
      color: "#46C974",
      text: t("committees"),
      icon: <FaUsersGear className="text-2xl" />,
    },
    {
      bgcolor: "white",
      count: data?.Projects,
      color: "#F3B332",
      text: t("projects"),
      icon: <IoDocumentTextOutline className="text-2xl" />,
    },
    {
      bgcolor: "white",
      count: data?.Meetings,
      color: "#ED8E00",
      text: t("meetings"),
      icon: <LuCalendarCheck className="text-2xl" />,
    },
  ];
  
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 xl:grid-cols-5 gap-2 py-4 px-5">
        <div
          className="flex flex-col gap-2 py-3 px-4 border-[#00000008] border-solid border rounded-lg"
          style={{
            boxShadow: "0px 4px 75px 0px #00000008",
            minWidth: "150px",
            backgroundColor: "black",
          }}
        >
          <Typography.Text className="font-semibold text-lg font-su text-white">
            {dayjs().hour() < 12 ? t("welcomeDay") : t("welcomeNight")}
          </Typography.Text>
          <Typography.Text className="font-semibold text-lg font-su text-gray-300">
            {t("wishHappyDay")}👋
          </Typography.Text>
        </div>

        {statusButtonProps.map((props, index) => (
          <StatusButton key={index} {...props} />
        ))}
      </div>
    </>
  );
}
