import { Divider, List, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { PiFileTextDuotone } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import Card from "../ui/Card";
import Status from "../ui/Status";
import { Link } from "react-router-dom";
import { formatDateRange } from "@/utils/displayDate";
import ProjectStatus from "./ProjectStatus";
import OrgInfoIcon from "./orgInfoIcon";
import FileIcon from "./FileIcon";
import CalenderIcon from "./CalenderIcon";

export interface Project {
  projectName: string;
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  isInternal: boolean;
  orgInfo?: {
    title: string;
  };
  statusInfo: {
    id: number;
    nameAr: string;
    nameEn: string;
  };
}

export default function ProjectsCard({ project }: { project: Project }) {
  const { t } = useTranslation();

  return (
    <Card className="cursor-pointer">
      <Link to={`/projects/${project?.id}`}>
        {/* <div className="flex items-center">
          <ProjectStatus id={project?.statusInfo?.id} />
          <Status
            color={project?.isInternal ? "#4CADCF" : "#9B51E0"}
            text={`${
              project?.isInternal
                ? t("statuses:internal")
                : t("statuses:external")
            }`}
            className="mx-2"
          />
        </div> */}

        <div className="w-full items-center gap-3">
          <div className="flex justify-between">
            <div className="flex gap-[8px] items-center">
              <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-secondary bg-lightGray rounded-full">
                <FileIcon />
              </div>
              <Typography.Paragraph
                ellipsis={{
                  rows: 1,
                }}
                className="!mb-0 text-base"
              >
                {project?.projectName || t("notAvailable")}
              </Typography.Paragraph>
              {/* <span className="flex-1"></span> */}

            </div>
            <ProjectStatus id={project?.statusInfo?.id} />
          </div>
        </div>
        <Typography.Paragraph className="mt-3 text-content">
          {project?.description || t("notAvailable")}
        </Typography.Paragraph>
        <Divider className="my-4 border-gray-100" />
        <List>
          <List.Item className="gap-3 !justify-start !p-0">
            <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-content bg-lightGray rounded-full">
              <OrgInfoIcon />
            </div>
            <Typography>{project?.orgInfo?.title || t("notAvailable")}</Typography>
          </List.Item>
          <List.Item className="gap-3 !justify-start !p-0 mt-4">
            <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-content bg-lightGray rounded-full">
              <CalenderIcon />
            </div>
            <Typography>
              {project?.startDate
                ? formatDateRange(project?.startDate, project?.endDate)
                : t("notAvailable")}
            </Typography>
          </List.Item>
        </List>
      </Link>
    </Card>
  );
}
