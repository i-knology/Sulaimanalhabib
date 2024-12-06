import { Divider, List, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { LuCalendarCheck, LuCalendarClock, LuMapPin } from "react-icons/lu";
import Card from "../ui/Card";
import MeetingStatus from "./MeetingStatus";
import { formatDateRange } from "@/utils/displayDate";

interface MeetingPriorityTypeLookup {
  nameAr: string;
  nameEn: string;
  id: number;
}

export interface Meeting {
  title: string;
  description: string;
  meet_Place: string;
  startDate: string;
  endDate: string;
  meetingPriorityTypeLookup: MeetingPriorityTypeLookup;
}

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  const { i18n } = useTranslation();

  const {
    title,
    description,
    meet_Place,
    endDate,
    meetingPriorityTypeLookup,
    startDate,
  } = meeting;

  return (
    <Card>
      <div className="flex items-center gap-3">
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
        <div className="flex-1"></div>
        <div className="">
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
      <Typography.Paragraph className="mt-3 text-content">
        {description || "-"}
      </Typography.Paragraph>
      <Divider className="my-4 border-gray-100" />
      <List>
        <List.Item className="gap-3 !justify-start !p-0">
          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-content bg-lightGray rounded-full">
            <LuMapPin size={20} />
          </div>
          <Typography>{meet_Place || "-"}</Typography>
        </List.Item>
        <List.Item className="gap-3 !justify-start !p-0 mt-4">
          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-content bg-lightGray rounded-full">
            <LuCalendarClock size={20} />
          </div>
          <Typography>{formatDateRange(startDate, endDate) || "-"}</Typography>
        </List.Item>
      </List>
    </Card>
  );
}
