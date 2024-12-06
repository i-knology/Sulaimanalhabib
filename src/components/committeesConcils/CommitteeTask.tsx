import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { LiaUserCheckSolid } from "react-icons/lia";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import DisplayIcon from "../ui/DisplayIcon";
import HrDivider from "../ui/HrDivider";
import MissionStatus from "./MissionStatus";

export interface Mession {
  id: string;
  title: string;
  statusId: number;
  progressValue?: number;
  members: Array<{
    id: number;
    name: string;
    avatarUrl?: string;
  }>;
  startDate?: string;
  endDate?: string;
}
export default function CommitteeTask({
  mession,
  openDetails,
}: {
  mession: Mession;
  openDetails: (id: string) => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="p-2 mb-4 rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-[5px] bg-primary bg-gradient-to-b from-primary/[0.92] to-secondary/[0.92] rounded-e-lg" />
          <p className="mx-2 ">{mession?.title}</p>
        </div>
      </div>

      <div className="mt-2">
        <HrDivider />
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex gap-3 items-center">
          <DisplayIcon>
            <LiaUserCheckSolid color="black" size={22} />
          </DisplayIcon>
          <>
            <Typography.Text>
              {mession?.members?.length} {t("member")}
            </Typography.Text>
          </>
        </div>

        <button className="mt-1" onClick={() => openDetails(mession?.id)}>
          <DisplayIcon>
            <MdOutlineKeyboardArrowLeft color="black" size={22} />
          </DisplayIcon>
        </button>
      </div>
    </div>
  );
}
