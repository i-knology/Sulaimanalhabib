import { Avatar, Skeleton, Typography } from "antd";
import dayjs from "dayjs";
import { LuClock } from "react-icons/lu";

export default function MissionComment({ userInfo, comments, createdDate }) {
  // const { t } = useTranslation();
  return (
    <div className="space-y-3 mt-2 pt-2 border-t border-t-gray-200 first:mt-0 first:pt-0 first:border-t-0">
      <div className="flex items-center w-full gap-3">
        <Avatar
          size={32}
          shape="circle"
          src={userInfo?.profilePictureUrl}
        />
        <div className="flex-1">
          <Typography className="font-medium">{userInfo?.name}</Typography>
        </div>
        <p className="inline-flex items-center gap-2 text-gray-600 text-xs">
          <LuClock size={18} />
          <span>{dayjs(createdDate).format("DD MMM YYYY , h:mm A")}</span>
        </p>
      </div>
      <Typography.Paragraph>{comments}</Typography.Paragraph>
      {/* <Button
        type="text"
        icon={<LuMessageCircle size={24} />}
        className="hover:!bg-transparent !p-0"
      >
        {t("reply")}
      </Button> */}
    </div>
  );
}

export function MissionCommentSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center w-full gap-3">
        <Skeleton.Avatar
          shape="circle"
          size="small"
        />
        <div className="flex-1">
          <Skeleton.Input className="w-full !h-4 block" />
        </div>
      </div>
      <Skeleton.Input className="w-full !h-4 !block" />
      <Skeleton.Input
        size="small"
        className="w-full !h-4 !block"
      />
    </div>
  );
}
