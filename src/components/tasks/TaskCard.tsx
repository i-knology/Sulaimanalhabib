import { Divider, List, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { PiFileTextDuotone } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import Card from "../ui/Card";
import Status from "../ui/Status";

export default function TaskCard({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation();
  return (
    <Card>
      <button onClick={onClick}>
        <div className="flex items-center">
          <Status color="#D10008" text={t("statuses:incomplete")} />
          <Status
            color="#4CADCF"
            text={t("statuses:external")}
            className="mx-2"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-secondary bg-lightGray rounded-full">
            <PiFileTextDuotone size={20} />
          </div>
          <Typography.Paragraph
            ellipsis={{
              rows: 1,
            }}
            className="!mb-0 text-base"
          >
            المهمة ...
          </Typography.Paragraph>
          <span className="flex-1"></span>
        </div>

        <Typography.Paragraph className="mt-3 text-content">
          لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي تستخدم
          بشكل شائع لتوضيح الشكل المرئي للمستند
        </Typography.Paragraph>

        <Divider className="my-4 border-gray-100" />
        <List className="bg-gray-50 rounded-lg py-4">
          <div className="flex items-center justify-between px-2">
            <List.Item className="!justify-start !p-0">
              <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-content bg-lightGray rounded-full">
                <SlCalender size={20} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-primary">{t("taskStart")}</span>
                <span>12 نوفمبر 2023</span>
              </div>
            </List.Item>
            <List.Item className="!justify-start !p-0">
              <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-content bg-lightGray rounded-full">
                <SlCalender size={20} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-primary">{t("taskEnd")}</span>
                <span>12 نوفمبر 2023</span>
              </div>
            </List.Item>
          </div>
        </List>

        <div className="flex items-center gap-2 my-1">
          <img src="/illustrations/profile-image.svg" alt="" />
          <span>محمد مصطفي علي</span>
        </div>
      </button>
    </Card>
  );
}
