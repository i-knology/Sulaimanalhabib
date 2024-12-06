import { Typography } from "antd";
import { useTranslation } from "react-i18next";
import { LuCalendarCheck } from "react-icons/lu";
import MeetingStatus from "../meetings/MeetingStatus";

export default function CommitteeMeetings({ meeting }) {
  const { i18n } = useTranslation();
  const { title, meetingPriorityTypeLookup } = meeting;
  return (
    <div className="flex items-center justify-between gap-3 px-2 py-1 bg-white my-1 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-secondary bg-lightGray rounded-full">
          <LuCalendarCheck size={20} />
        </div>
        <Typography.Paragraph
          ellipsis={{
            rows: 1,
          }}
          className="!mb-0 text-base"
        >
          {title || "-"}
        </Typography.Paragraph>
      </div>

      <div className="mt-3">
        <MeetingStatus
          id={meetingPriorityTypeLookup?.id}
          status={
            i18n.language == "ar"
              ? meetingPriorityTypeLookup?.nameAr || "-"
              : meetingPriorityTypeLookup?.nameEn || "-"
          }
        />
      </div>
    </div>
  );
}
