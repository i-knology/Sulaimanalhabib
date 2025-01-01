import type { AttendStatusType, StatusAttributes } from "@/types/courses";
import { Tag } from "antd";
import { useTranslation } from "react-i18next";

export default function AttendStatus({ status }: { status: AttendStatusType }) {
  const { t } = useTranslation();
  const statues: Record<AttendStatusType, StatusAttributes> = {
    attend: {
      color: "cyan",
      label: "attend",
    },
    notAttend: {
      color: "red",
      label: "notAttend",
    },
  };

  return (
    <Tag
      color={statues[status]?.color || "gold"}
      className="px-3 rounded-lg py-1.5 text-sm font-medium !m-0"
    >
      {t(statues[status]?.label)}
    </Tag>
  );
}
