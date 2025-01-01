import type { CourseStatus, StatusAttributes } from "@/types/courses";
import { Tag } from "antd";
import { useTranslation } from "react-i18next";

export default function Status({ status }: { status: CourseStatus }) {
  const { t } = useTranslation();
  const statues: Record<CourseStatus, StatusAttributes> = {
    current: {
      color: "cyan",
      label: "status:current",
    },
    ongoing: {
      color: "gold",
      label: "status:ongoing",
    },
  };

  return (
    <Tag
      color={statues[status]?.color || "gold"}
      className="px-3 rounded-lg py-1.5 text-sm font-medium"
    >
      {t(statues[status]?.label)}
    </Tag>
  );
}
