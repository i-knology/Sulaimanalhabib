import { Tag, Typography } from "antd";
import StatusBtn from "../ui/StatusBtn";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

export default function StatusPanel({ tagsCount ,isFetching}: {isFetching:boolean, tagsCount: string }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center gap-3 flex-wrap">
        <Typography className="m-0 font-semibold text-lg">
          {t("allMeetings")}
        </Typography>
        <Tag className="text-black font-semibold bg-white rounded-xl py-1.5 px-3 border-none">
          {isFetching?<Skeleton width={20}/>:tagsCount?tagsCount:0}
        </Tag>
        <span className="flex-1"></span>
        <ul className="md:inline-flex items-center gap-2 flex-wrap">
          <li>
            <StatusBtn
              bgColor="bg-[#D10008]"
              count="120"
              text={t("statuses:urgent")}
            />
          </li>
          <li>
            <StatusBtn
              bgColor="bg-[#E88A0A]"
              count="120"
              text={t("statuses:notUrgent")}
            />
          </li>
          <li>
            <StatusBtn
              bgColor="bg-[#4CADCF]"
              count="120"
              text={t("statuses:notUrgentAndNotImportant")}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
