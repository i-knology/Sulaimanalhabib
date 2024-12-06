import { Divider, List, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { BiTrip } from "react-icons/bi";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Status from "../ui/Status";

export default function TripCard() {
  const { t } = useTranslation();
  return (
    <Card className="cursor-pointer">
      <Link to={`/trips/${123}`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-secondary bg-lightGray rounded-full">
            <BiTrip size={20} />
          </div>
          <Typography.Paragraph
            ellipsis={{
              rows: 1,
            }}
            className="!mb-0 text-base"
          >
            عنوان الرحلة ...
          </Typography.Paragraph>
          <span className="flex-1"></span>
          <Status color="#9B51E0" text={t("statuses:new")} className="mx-2" />
        </div>
        <Typography.Paragraph className="mt-3 text-content">
          لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي تستخدم
          بشكل شائع لتوضيح الشكل المرئي للمستند
        </Typography.Paragraph>
        <Divider className="my-4 border-gray-100" />
        <List>
          <List.Item className="gap-3 !justify-start !p-0">
            <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-content bg-lightGray rounded-full">
              <MdOutlineLocationOn size={22} />
            </div>
            <Typography>اسم الادارة التابع لها</Typography>
          </List.Item>
          <List.Item className="gap-3 !justify-start !p-0 mt-4">
            <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-content bg-lightGray rounded-full">
              <LuCalendarClock size={22} />
            </div>
            <Typography> 12 نوفمبر 2023 - 12 نوفمبر 2024</Typography>
          </List.Item>
        </List>
      </Link>
    </Card>
  );
}
