import { formatDate } from "@/utils/displayDate";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { LiaUserCheckSolid } from "react-icons/lia";
import { SlCalender } from "react-icons/sl";
import DisplayIcon from "../ui/DisplayIcon";
import ProjectStatus from "./ProjectStatus";
export interface Mession {
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

export default function ProjectTask({ mession }: { mession: Mession }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="p-2 mb-4 rounded-lg bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-8 w-[5px] bg-primary bg-gradient-to-b from-primary/[0.92] to-secondary/[0.92] rounded-e-lg" />
          <p className="mx-2 ">{mession?.title}</p>
        </div>
        <ProjectStatus id={mession?.statusId} />
      </div>

      <div className="w-full h-2 my-2 bg-gray-50 rounded-full relative">
        <div
          style={{ width: `${String(mession?.progressValue || 1)}%` }}
          className="absolute inset-0 bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92] rounded-full"
        />
      </div>

      <div className="flex gap-3 items-center">
        <DisplayIcon>
          <LiaUserCheckSolid color="black" size={22} />
        </DisplayIcon>
        <>
          {mession?.members?.length > 0 && mession?.members?.length == 1 && (
            <img
              width={42}
              className="rounded-full"
              src="/illustrations/user-image.svg"
              alt=""
            />
          )}

          {mession?.members?.length > 0 && mession?.members?.length > 1 && (
            <div className="flex gap-0">
              {mession?.members?.slice(0, 3)?.map((_, index: number) => {
                return (
                  <img
                    width={42}
                    className={`rounded-full ${
                      index === 0 ? "" : "mr-[-20px]"
                    }`}
                    src="/illustrations/user-image.svg"
                    alt=""
                  />
                );
              })}
              {mession?.members?.length > 4 && (
                <span className="text-content bg-white rounded-full px-2 flex items-center mx-[-15px]">
                  +{mession?.members?.length - 4}
                </span>
              )}
            </div>
          )}
        </>
      </div>

      <div className="h-[1px] bg-gray-100 w-full mt-2" />

      <div className="grid grid-cols-2 my-2">
        <div className="!p-0 flex !justify-start gap-2 items-center">
          <DisplayIcon>
            <SlCalender color="black" size={20} />
          </DisplayIcon>

          <div className="flex flex-col gap-1">
            <Typography className="text-gray-400">{t("startsAt")}</Typography>
            <Typography>
              {mession?.startDate
                ? formatDate(mession?.startDate, i18n.language)
                : "-"}
            </Typography>
          </div>
        </div>
        <div className="!p-0 flex !justify-start gap-2 items-center mx-4">
          <DisplayIcon>
            <SlCalender color="black" size={20} />
          </DisplayIcon>

          <div className="flex flex-col gap-1">
            <Typography className="text-gray-400">{t("endsAt")}</Typography>
            <Typography>
              {mession?.endDate
                ? formatDate(mession?.endDate, i18n.language)
                : "-"}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
