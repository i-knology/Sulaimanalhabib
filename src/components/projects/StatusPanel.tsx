import { Tag, Typography } from "antd";
import StatusBtn from "../ui/StatusBtn";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

export default function StatusPanel({ isFetching, totalCount }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center gap-3 flex-wrap">
        <Typography className="m-0 mx-2 font-semibold text-lg">
          {t("allProjects")}
        </Typography>
        <Tag className="text-primary font-semibold bg-white rounded-xl py-1.5 px-3 border-none">
          {isFetching ? <Skeleton width={20} /> : totalCount}
        </Tag>
        <span className="flex-1"></span>
        <ul className="inline-flex items-center gap-2 flex-wrap">
          <li>
            <StatusBtn
              bgColor="bg-[#2BB900]"
              count="120"
              text={t("statuses:completed")}
            />
          </li>
          <li>
            <StatusBtn
              bgColor="bg-[#E88A0A]"
              count="120"
              text={t("statuses:ongoing")}
            />
          </li>
          <li>
            <StatusBtn
              bgColor="bg-[#D10008]"
              count="120"
              text={t("statuses:incomplete")}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
