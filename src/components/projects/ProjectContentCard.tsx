import Calendar from "@/assets/icons/calendar.svg?react";
import File from "@/assets/icons/file.svg?react";
import FileSecure from "@/assets/icons/fileSecure.svg?react";
import { getProjectStatuses } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";
import { Select, Typography } from "antd";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import HrDivider from "../ui/HrDivider";

export default function ProjectContentCard({
  projectName,
  startDate,
  endDate,
  orgInfo,
  statusInfo,
  description,
  onStatusChange,
}) {
  const { i18n } = useTranslation();
  const { data } = useQuery({
    queryFn: () => getProjectStatuses(),
    queryKey: ["projects-status-lookup"],
  });

  const [selectedStatus, setSelectedStatus] = useState();

  useEffect(() => {
    setSelectedStatus(
      statusInfo && {
        value: statusInfo?.id,
        label: statusInfo?.[i18n.language == "ar" ? "nameAr" : "nameEn"],
      },
    );
  }, [statusInfo]);

  return (
    <div className="p-4 rounded-xl bg-white space-y-4">
      <div className="flex gap-3 items-center">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
          <File />
        </span>
        <div className="flex-1">
          <Typography.Paragraph className="font-medium text-sm !mb-0 ">
            {projectName}
          </Typography.Paragraph>
        </div>
        {/* <ProjectStatus id={statusId} /> */}
        <Select
          size="small"
          variant="filled"
          className="!w-28 flex-shrink-0"
          defaultValue={selectedStatus}
          labelInValue
          options={data?.data?.items?.map((status) => ({
            label: status?.[i18n.language == "ar" ? "nameAr" : "nameEn"],
            value: status?.id,
          }))}
          onChange={(value) => {
            onStatusChange(value);
            setSelectedStatus(value);
          }}
          placeholder={t("status")}
        />
      </div>
      <Typography.Paragraph className="!mb-0 text-slate-700">{description}</Typography.Paragraph>
      <HrDivider />
      <div className="grid grid-cols-2 gap-4">
        <span className="col-span-2">
          <ProjectItem
            icon={<FileSecure />}
            title={t("departmentName")}
            content={orgInfo?.title}
          />
        </span>
        <ProjectItem
          icon={<Calendar />}
          title={t("startDate")}
          content={startDate ? dayjs(startDate)?.format("DD MMMM YYYY") : t("notAvailable")}
        />
        <ProjectItem
          icon={<Calendar />}
          title={t("endDate")}
          content={endDate ? dayjs(endDate)?.format("DD MMMM YYYY") : t("notAvailable")}
        />
      </div>
    </div>
  );
}

function ProjectItem({ title, content, icon }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-lightGray text-gray-500 flex-shrink-0">
        {icon}
      </span>
      <div className="flex-1">
        <Typography.Paragraph className="text-slate-700 text-sm !mb-1">
          {title}
        </Typography.Paragraph>
        <Typography className="!mb-0 font-medium">{content}</Typography>
      </div>
    </div>
  );
}
