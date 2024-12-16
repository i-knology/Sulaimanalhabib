import { Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import StatusBtn from "../ui/StatusBtn";

export default function StatusPanel({
  isFetching,
  totalCount,
  completedCount = 0,
  uncompletedCount = 0,
  ongoingCount = 0,
}) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center gap-3 flex-wrap">
        <Typography className="m-0 mx-2 font-semibold text-lg">{t("allProjects")}</Typography>
        <Tag className="text-primary font-semibold bg-white rounded-xl py-1.5 px-3 border-none">
          {isFetching ? <Skeleton width={20} /> : totalCount}
        </Tag>
        <span className="flex-1"></span>
        <ul className="inline-flex items-center gap-2 flex-wrap">
          <li>
            <StatusBtn
              bgColor="bg-[#2BB900]"
              count={completedCount}
              text={t("statuses:completed")}
            />
          </li>
          <li>
            <StatusBtn
              bgColor="bg-[#E88A0A]"
              count={ongoingCount}
              text={t("statuses:ongoing")}
            />
          </li>
          <li>
            <StatusBtn
              bgColor="bg-[#D10008]"
              count={uncompletedCount}
              text={t("statuses:incomplete")}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
