import { IoMdTime } from "react-icons/io";
import HrDivider from "../ui/HrDivider";

export default function NotificationCard() {
  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 mx-2 w-full py-4 px-2">
          <div className="flex items-center gap-2 w-full col-span-8">
            <img
              className=""
              src="/illustrations/profile-image.svg"
              alt=""
            />
            <div className="flex flex-col ">
              <p>محمد مصطفي علي</p>
              <p className="text-primary">منصب المستخدم</p>
            </div>
          </div>
          <div className="col-span-4 flex justify-end">
            <p className="flex items-center text-content px-3">
              <IoMdTime
                className="mx-1"
                size={24}
              />
              <span>11 سبتمبر 2023 , 02:30 مساء</span>
            </p>
          </div>
        </div>
        <div>
          <HrDivider />
          <p className="px-2 py-3">تفاصيل الاشعار تفاصيل الاشعار تفاصيل الاشعار </p>
        </div>
      </div>
    </>
  );
}
