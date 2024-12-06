import { Tag, Typography } from "antd";
import StatusBtn from "../ui/StatusBtn";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

export default function StatusPanel({ totalCount }: { totalCount: number }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center gap-3 flex-wrap">
        <Typography className="m-0 font-semibold text-lg">
          {t("committeesCouncils")}
        </Typography>
        {totalCount ? (
          <Tag className="text-primary font-semibold bg-white rounded-xl py-1.5 px-3 border-none">
            {totalCount}
          </Tag>
        ) : (
          <Skeleton width={15} height={20} />
        )}
        <span className="flex-1"></span>
        <ul className="inline-flex items-center gap-1 flex-wrap">
          <li>
            <StatusBtn
              bgColor="bg-[#F0A02A]"
              count="120"
              text={t("statuses:permanentCommittees")}
            />
          </li>
          <li>
            <StatusBtn
              bgColor="bg-[#12704C]"
              count="120"
              text={t("statuses:fixedCommittees")}
            />
          </li>
          <li>
            <StatusBtn
              bgColor="bg-[#5ECCE8]"
              count="120"
              text={t("statuses:procurementCommittees")}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
