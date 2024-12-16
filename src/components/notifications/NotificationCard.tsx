import { Avatar, Typography } from "antd";
import dayjs from "dayjs";
import { IoMdTime } from "react-icons/io";
import HrDivider from "../ui/HrDivider";

export default function NotificationCard({ toUserInfo, message, notificationDate }: any) {
  return (
    <>
      <div className="bg-white rounded-lg p-4 space-y-3">
        <div className="flex w-full gap-4 items-center">
          <div className="flex items-center gap-2 w-full col-span-8">
            <Avatar
              size="small"
              src={toUserInfo?.profilePictureUrl}
              alt={toUserInfo?.name}
            />
            <div className="flex flex-col ">
              <Typography className="font-medium">{toUserInfo?.name}</Typography>
              <Typography.Paragraph className="!mb-0">{toUserInfo?.email}</Typography.Paragraph>
            </div>
          </div>
          <span className="flex-1"></span>
          <Typography.Paragraph className="!mb-0 flex-shrink-0 text-sm">
            <div className="inline-flex gap-2">
              <IoMdTime size={20} />
              <span>{dayjs(notificationDate).format("DD MMM YYYY , h:mm A")}</span>
            </div>
          </Typography.Paragraph>
        </div>
        <HrDivider />
        <Typography.Paragraph className="">{message}</Typography.Paragraph>
      </div>
    </>
  );
}
