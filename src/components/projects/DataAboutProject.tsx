import { formatDate } from "@/utils/displayDate";
import { Divider, List, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { PiFileTextDuotone } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import DisplayIcon from "../ui/DisplayIcon";
import ProjectStatus from "./ProjectStatus";

interface OrgInfo {
  title: string;
}
interface StatusInfo {
  id: number;
}

interface Project {
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  orgInfo?: OrgInfo;
  statusInfo: StatusInfo;
}

interface DataAboutProjectProps {
  data: Project[];
}

export default function DataAboutProject({ data }: DataAboutProjectProps) {
  const { t, i18n } = useTranslation();
  return (
    <div className="rounded-lg bg-white p-4 ">
      <div>
        <div className="flex justify-between items-center gap-10">
          <div>
            <label className="flex gap-2 items-center !mb-0 text-base ">
              <DisplayIcon bgColor="#22baed">
                <PiFileTextDuotone size={24} color="#22baed" />
              </DisplayIcon>

              {data?.[0]?.projectName}
            </label>
          </div>
          <div>
            <ProjectStatus id={data?.[0]?.statusInfo?.id} />
          </div>
        </div>
        <Typography.Paragraph className="mt-3 text-content">
          {data?.[0]?.description}
        </Typography.Paragraph>
        <Divider className="my-4 border-semiGray" />

        <List>
          <List.Item className="gap-3 !justify-start !p-0">
            <DisplayIcon>
              <PiFileTextDuotone color="black" size={24} />
            </DisplayIcon>

            <div className="flex flex-col gap-1">
              <Typography className="text-content">
                {t("departmentName")}
              </Typography>
              <Typography> {data?.[0]?.orgInfo?.title}</Typography>
            </div>
          </List.Item>

          <div className="grid grid-cols-2 my-3">
            <div className="!p-0 flex gap-2">
              <DisplayIcon>
                <SlCalender color="black" size={20} />
              </DisplayIcon>
              <div className="flex flex-col gap-1">
                <Typography className="text-content">
                  {t("startsAt")}
                </Typography>
                <Typography>
                  {data?.[0]?.startDate
                    ? formatDate(data?.[0]?.startDate, i18n.language)
                    : "-"}
                </Typography>
              </div>
            </div>
            <div className="!p-0 flex gap-2">
              <DisplayIcon>
                <SlCalender color="black" size={20} />
              </DisplayIcon>
              <div className="flex flex-col gap-1">
                <Typography className="text-content">{t("endsAt")}</Typography>
                <Typography>
                  {data?.[0]?.endDate
                    ? formatDate(data?.[0]?.endDate, i18n.language)
                    : "-"}
                </Typography>
              </div>
            </div>
          </div>
        </List>
      </div>
    </div>
  );
}
