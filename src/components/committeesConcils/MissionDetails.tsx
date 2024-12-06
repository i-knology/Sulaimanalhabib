import { formatDateAndTime } from "@/utils/displayDate";
import { QueryClient } from "@tanstack/react-query";
import { Button, Divider, Image, Input, Typography } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiTask } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import DisplayIcon from "../ui/DisplayIcon";
import FormBtn from "../ui/FormBtn";
import AttachmentCard from "./AttachmentCard";
import TeamMemberCard from "./TeamMembersCard";
import { LuSend } from "react-icons/lu";
import CommitteeMissionLoader from "./CommitteeMissionLoader";

type MissionActiveTab = "taskAttachments" | "comments";

const EMPTY_TEXT = "-";

const Tabs = {
  ATTACHMENTS: "taskAttachments",
  COMMENTS: "comments",
} as const;

export default function MissionDetails({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) {
  const { t, i18n } = useTranslation();
  const [missionActiveTab, setMissionActiveTab] = useState<MissionActiveTab>(
    Tabs.ATTACHMENTS
  );
  const client = new QueryClient();

  const displayAttachments = useMemo(() => {
    if (missionActiveTab !== Tabs.ATTACHMENTS) return null;
    return data?.documents?.map((document: any, index: number) => (
      <AttachmentCard
        refetch={() => client.invalidateQueries({ queryKey: ["missionData"] })}
        document={document}
        key={index}
      />
    ));
  }, [missionActiveTab, data?.documents]);

  const displayComments = useMemo(() => {
    if (missionActiveTab !== Tabs.COMMENTS) return null;
    return data?.comments?.map((comment: any, index: number) => (
      <div key={index} className="flex items-center w-full px-2 py-1">
        <Image
          width={50}
          src="/illustrations/profile-image.svg"
          alt="User profile"
        />
        <div className="mx-2 w-full flex flex-col">
          <span className="font-medium">
            {comment?.userInfo?.name || EMPTY_TEXT}
          </span>
          <span>{comment?.comments || EMPTY_TEXT}</span>
        </div>
        <span className="flex gap-1 text-content">
          <CgCalendarDates size={28} />
          {formatDateAndTime(comment?.createdDate, i18n.language)}
        </span>
      </div>
    ));
  }, [missionActiveTab, data?.comments, i18n.language]);

  if (isLoading) return <CommitteeMissionLoader />;

  return (
    <div className="min-h-full">
      <MissionHeader data={data} />

      <TeamSection data={data} />

      <TabSelector
        activeTab={missionActiveTab}
        setActiveTab={setMissionActiveTab}
        tabs={Tabs}
      />

      <div>{displayAttachments || displayComments}</div>

      {missionActiveTab === Tabs.ATTACHMENTS && (
        <FormBtn
          form="committee-form"
          text={t("addAttachments")}
          loading={false}
        />
      )}

      {missionActiveTab === Tabs.COMMENTS && (
        <CommentInput placeholder={t("writeYourCommentHere") + " ..."} />
      )}
    </div>
  );
}

function MissionHeader({ data }: { data: any }) {
  return (
    <div className="border rounded-lg mb-4 p-2">
      <div className="p-0 border-none rounded-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 text-secondary bg-lightGray rounded-full">
            <BiTask size={24} />
          </div>
          <Typography.Paragraph
            ellipsis={{ rows: 1 }}
            className="!mb-0 text-base"
          >
            {data?.title || EMPTY_TEXT}
          </Typography.Paragraph>
        </div>
        <Typography.Text className="text-content mx-2 p-0">
          {data?.description || EMPTY_TEXT}
        </Typography.Text>

        <Divider className="my-2 border-semiGray" />

        <div className="grid grid-cols-2">
          {[{ date: "12 نوفمبر 2023" }, { date: "30 نوفمبر 2023" }].map(
            (item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <DisplayIcon>
                  <CgCalendarDates size={24} />
                </DisplayIcon>
                <Typography>{item.date}</Typography>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function TeamSection({ data }: { data: any }) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex flex-col gap-2">
        <Typography.Text className="text-base">{t("taskTeam")}</Typography.Text>{" "}
        {/* Corrected */}
        <div className="h-1 w-[10%] bg-primary bg-gradient-to-b from-primary/[0.92] to-secondary/[0.92] rounded-xl" />
      </div>

      <div className="my-2">
        {data?.members?.map((member: any) => (
          <TeamMemberCard member={member?.memberInfo} key={member.id} />
        ))}
      </div>
    </div>
  );
}

function TabSelector({
  activeTab,
  setActiveTab,
  tabs,
}: {
  activeTab: MissionActiveTab;
  setActiveTab: (tab: MissionActiveTab) => void;
  tabs: typeof Tabs;
}) {
  const { t } = useTranslation();
  return (
    <div className="bg-white my-4">
      <div className="flex gap-2 bg-semiGray p-1 rounded-lg">
        {Object.values(tabs).map((tab) => (
          <Button
            key={tab}
            className={`w-1/2 border-none ${
              activeTab === tab ? "text-black" : "bg-transparent"
            }`}
            onClick={() => setActiveTab(tab as MissionActiveTab)}
          >
            {t(tab)}
          </Button>
        ))}
      </div>
    </div>
  );
}

function CommentInput({ placeholder }: { placeholder: string }) {
  return (
    <Input
      variant="filled"
      className="w-[100%] rounded-lg mt-2"
      placeholder={placeholder}
      prefix={
        <Image
          width={40}
          src="/illustrations/profile-image.svg"
          alt="Profile"
        />
      }
      suffix={
        <button className="bg-gradient-to-r p-2 rounded-full hover:bg-primary transition-all duration-300 border-primary from-primary/[0.92] to-secondary/[0.92]">
          <LuSend color="white" size={20} />
        </button>
      }
    />
  );
}
