import { useTranslation } from "react-i18next";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import HrDivider from "../ui/HrDivider";
import Status from "../ui/Status";

export default function MemberCard({ userData }) {
  const { t } = useTranslation();
  console.log(userData);
  
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="flex items-center justify-between mx-2 w-full">
          <div className="flex items-center gap-2">
            <img src="/illustrations/profile-image.svg" alt="" />
            <div className="flex flex-col">
              <p className="text-base">{userData?.name}</p>
              <p className="text-content">{userData?.roles?.[0]}</p>
            </div>
          </div>
          <Status
            color="#4CADCF"
            text={t("statuses:external")}
            className="mx-2"
          />
        </div>
      </div>
      <HrDivider />
      <p className="text-content mt-2">
        لوريم إيبسوم طريقة لكتابة النصوص في النشر والتصميم الجرافيكي تستخدم بشكل
        شائع لتوضيح الشكل المرئي للمستند أو الخط دون الاعتماد على محتوى ذي معنى.
        يمكن استخدام
      </p>
      <div className="my-2">
        <HrDivider />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <p className="bg-gray-50 rounded-full inline-block outline-secondary p-2">
            <IoCallOutline color="gray" size={24} />
          </p>
          <span>{userData?.mobileNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="bg-gray-50 rounded-full inline-block outline-secondary p-2">
            <MdOutlineMailOutline color="gray" size={24} />
          </p>
          <span>{userData?.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="bg-gray-50 rounded-full inline-block outline-secondary p-2">
            <IoLocationOutline color="gray" size={24} />
          </p>
          <span>+9665456765678</span>
        </div>
      </div>
    </div>
  );
}
