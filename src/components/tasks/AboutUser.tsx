import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { RiFileEditLine } from "react-icons/ri";
import Status from "../ui/Status";

export default function AboutUser() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-between mb-2">
        <div className="flex items-center justify-between mx-2 w-full">
          <div className="flex items-center gap-2">
            <img src="/illustrations/profile-image.svg" alt="" />
            <div className="flex flex-col">
              <p>محمد مصطفي علي</p>
              <p className="text-primary">منصب المستخدم</p>
            </div>
          </div>
          <div>
            <Status
              color="#D10008"
              text={t("statuses:external")}
              className="mx-2"
            />
            <Status
              color="#4CADCF"
              text={t("statuses:external")}
              className="mx-2"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-2 rounded-lg">
        <p className="flex items-center gap-2">
          <span>
            <RiFileEditLine color="gray" size={24} />
          </span>
          <span className="text-primary">{t("taskAddedBy")}</span>
        </p>
        <p className="flex items-center gap-2 mx-8">
          <span>احمد محمد السعيد</span>-<span>11 سبتمبر 2023 , 02:30 مساء</span>
        </p>
      </div>

      <div>
        <div className="flex items-center gap-3 mt-2 mb-1">
          <p className="m-0 p-0 text-base">لوريم إيبسوم طريقة لكتابة النصوص</p>
        </div>

        <Typography.Paragraph className="text-content">
          لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي تستخدم
          بشكل شائع لتوضيح الشكل المرئي للمستند لوريم إيبسوم طريقة لكتابة النصوص
          في النشر والتصميم الجرافيكي تستخدم بشكل شائع لتوضيح الشكل المرئي
          للمستند
        </Typography.Paragraph>
      </div>
    </>
  );
}
