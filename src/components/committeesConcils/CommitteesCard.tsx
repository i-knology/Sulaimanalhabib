import { Divider, Image, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { FaRegUser } from "react-icons/fa6";
import { FiFileMinus } from "react-icons/fi";
import { LuCalendarCheck } from "react-icons/lu";
import Card from "../ui/Card";
import DisplayIcon from "../ui/DisplayIcon";
import CommitteeStatus from "./CommitteeStatus";
import { Link } from "react-router-dom";

export interface Committee {
  title: string | null;
  id: string;
  description: string | null;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  createdBy: string;
  messions?: [];
  members?: [];
  typeInfo: {
    id: number;
    nameAr: string | null;
    nameEn: string | null;
  } | null;
}

export default function CommitteesCard({
  committee,
}: {
  committee: Committee;
}) {
  const { t } = useTranslation();

  return (
    <Link to={"/committees-councils/" + committee?.id}>
      <Card>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-secondary bg-lightGray rounded-full">
            <LuCalendarCheck size={20} />
          </div>
          <Typography.Paragraph
            ellipsis={{
              rows: 1,
            }}
            className="!mb-0 text-base"
          >
            {committee?.title || "-"}
          </Typography.Paragraph>
          <span className="flex-1"></span>
          <CommitteeStatus committee={committee} />
        </div>
        <Typography.Paragraph ellipsis={{rows:1}} className="mt-3 text-content">
          {committee?.description || "-"}
        </Typography.Paragraph>
        <Divider className="my-2 border-semiGray" />

        <div className="flex items-center w-full">
          <Image
            width={50}
            src={
              committee?.members
                ?.filter(
                  (el: { typeId: number; userInfo: { name: string } }) =>
                    el?.typeId == 1
                )
                .map(
                  (el: { userInfo: { profilePictureUrl: string } }) =>
                    el?.userInfo
                )?.[0]?.profilePictureUrl
            }
            className=" rounded-full cursor-pointer"
            alt=""
          />

          <div className="mx-2 w-full flex flex-col">
            <span className="text-primary my-1">{t("committeeChair")}</span>
            <span>
              {
                committee?.members
                  ?.filter(
                    (el: { typeId: number; userInfo: { name: string } }) =>
                      el?.typeId == 1
                  )
                  .map(
                    (el: { userInfo: { name: string } }) => el?.userInfo
                  )?.[0]?.name
              }
            </span>
          </div>
        </div>

        <Divider className="my-2 border-semiGray" />
        <div className="grid grid-cols-2">
          <div className="flex gap-2 items-center">
            <DisplayIcon children={<FiFileMinus size={20} />} />
            <Typography>
              {committee?.messions?.length + " " + t("important") || "-"}
            </Typography>
          </div>

          <div className="flex gap-2 items-center">
            <DisplayIcon children={<FaRegUser size={20} />} />
            <Typography>
              {committee?.members?.length + " " + t("member") || "-"}
            </Typography>
          </div>
        </div>
      </Card>
    </Link>
  );
}
