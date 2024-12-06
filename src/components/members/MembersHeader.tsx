import { Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";

export default function MembersHeader() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <Typography className="m-0 font-semibold text-lg">
          {t("allUsers")}
        </Typography>
        <Tag className="text-primary font-semibold bg-white rounded-xl py-1.5 px-3 border-none">
          250
        </Tag>
      </div>
    </div>
  );
}
