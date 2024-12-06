import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MenuProps } from "antd";
import { Button, Drawer, Dropdown } from "antd";
import { AxiosError } from "axios";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { Link, useParams } from "react-router-dom";

import useResultModal from "@/hooks/useModal";
import {
  createCommitteeMission,
  getCommitteeDetails,
  getCommitteeMissionDetails,
  updateCommittee,
} from "@/services/committees";
import { createMeeting, getMeetings } from "@/services/meetings";
import errorException from "@/utils/errorException";

import MeetingForm, { Meeting } from "../meetings/MeetingForm";
import MissionForm, { MissionFormValues } from "../projects/MissionForm";
import FormBtn from "../ui/FormBtn";
import NoData from "../ui/NoData";
import CommitteeDataLoader from "./CommitteeDataLoader";
import CommitteeMeetings from "./CommitteeMeetings";
import CommitteesForm from "./CommitteesForm";
import CommitteeTask from "./CommitteeTask";
import DataAboutCommittee from "./DataAboutCommittee";
import MissionDetails from "./MissionDetails";
import TeamMemberCard, { Member } from "./TeamMembersCard";
import TeamMemeberCardLoader from "./TeamMemeberCardLoader";

type ActiveTab = "teamMembers" | "tasks" | "meetings";

type DrawerState =
  | "close"
  | "committee"
  | "meeting"
  | "mission"
  | "mission-details";

export default function CommitteeDetails() {
  const { t } = useTranslation();
  const { committeeId } = useParams<{ committeeId: string }>();
  const queryClient = useQueryClient();
  const globalModal = useResultModal();

  const [activeTab, setActiveTab] = useState<ActiveTab>("teamMembers");
  const [drawerState, setDrawerState] = useState<DrawerState>("close");
  const [missionId, setMissionId] = useState<string>("");
  const [errors, setErrors] = useState<
    string | [{ [key: string]: string }] | string | null
  >(null);

  // Fetch Committee Details
  const {
    data: committeeData,
    isFetching: isCommitteeFetching,
    refetch,
  } = useQuery({
    queryKey: ["CommitteeDetails", committeeId],
    queryFn: async () =>
      getCommitteeDetails(committeeId!).then((res) => res?.data?.items?.[0]),
    enabled: !!committeeId,
  });

  // Fetch Meetings
  const { data: committeeMeetings } = useQuery({
    queryKey: ["committeeMeetings", committeeId],
    queryFn: async () =>
      getMeetings({ CommitteeId: committeeId! }).then((res) => res?.data?.data),
    enabled: !!committeeId,
  });

  const { data: missionData, isFetching: isMissionFetching } = useQuery({
    queryKey: ["missionData", missionId],
    queryFn: async () =>
      getCommitteeMissionDetails(missionId).then(
        (res) => res?.data?.data?.items?.[0]
      ),
    enabled: !!missionId && missionId !== "",
  });

  // Handle Mutations
  const handleSuccess = useCallback(() => {
    setDrawerState("close");
    setErrors(null);
    refetch();
    globalModal.success({ title: t("editSuccess"), subtitle: "" });
  }, [globalModal, refetch, t]);

  const handleError = useCallback((error: AxiosError) => {
    setErrors(errorException(error));
  }, []);

  const updateCommitteeMutation = useMutation({
    mutationFn: (values: Record<string, unknown>) => updateCommittee(values),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const createMeetingMutation = useMutation<unknown, AxiosError, Meeting>({
    mutationFn: (meeting) =>
      createMeeting({ ...meeting, CommitteeId: committeeId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["committeeMeetings"] });
      setDrawerState("close");
      globalModal.success({ title: t("createdSuccessfully"), subtitle: "" });
    },
    onError: handleError,
  });

  const createMission = useMutation<unknown, AxiosError, MissionFormValues>({
    mutationFn: (mission) =>
      createCommitteeMission({ ...mission, CommitteeId: committeeId! }),
    onSuccess: () => {
      setDrawerState("close");
      globalModal.success({ title: t("createdSuccessfully"), subtitle: "" });
    },
    onError: handleError,
  });

  const renderTeamMembers = useMemo(() => {
    if (activeTab !== "teamMembers") return null;
    if (isCommitteeFetching) {
      return Array.from({ length: 2 }).map((_, idx) => (
        <TeamMemeberCardLoader key={idx} />
      ));
    }
    if (!committeeData?.members?.length) {
      return <NoData title={t("noMembers")} />;
    }
    return committeeData.members.map((member: Member) => (
      <TeamMemberCard member={member} key={member.id} />
    ));
  }, [activeTab, committeeData?.members, isCommitteeFetching, t]);

  const handleOpenMissionDetails = (id) => {
    setDrawerState("mission-details");
    setMissionId(id);
  };
  const renderTasks = useMemo(() => {
    if (activeTab !== "tasks") return null;
    if (!committeeData?.messions?.length) {
      return <NoData title={t("noMissions")} />;
    }
    return committeeData.messions.map((task, idx) => (
      <CommitteeTask
        mession={task}
        openDetails={(id) => handleOpenMissionDetails(id)}
        key={idx}
      />
    ));
  }, [activeTab, committeeData?.messions, t]);

  const renderMeetings = useMemo(() => {
    if (activeTab !== "meetings") return null;
    if (!committeeMeetings?.items?.length) {
      return <NoData title={t("noMeetings")} />;
    }
    return committeeMeetings.items.map((meeting, idx) => (
      <CommitteeMeetings meeting={meeting} key={idx} />
    ));
  }, [activeTab, committeeMeetings?.items, t]);

  const drawerTitle = useMemo(() => {
    switch (drawerState) {
      case "meeting":
        return t("addNewMeeting");
      case "mission":
        return t("addTask");
      case "mission-details":
        return t("taskDetails");
      case "committee":
      default:
        return t("updateCommittee");
    }
  }, [drawerState, t]);

  const dropdownItems: MenuProps["items"] = useMemo(
    () => [
      {
        label: t("addNewMeeting"),
        onClick: () => setDrawerState("meeting"),
        key: "1",
      },
      {
        label: t("addTask"),
        onClick: () => setDrawerState("mission"),
        key: "2",
      },
    ],
    [t]
  );

  return (
    <div className="flex flex-col justify-between min-h-[88vh]">
      <div>
        <div className="bg-white my-1">
          <p className="flex items-center py-4 px-2">
            <Link to="/committees-councils" className="text-primary">
              {t("committeesCouncils")}
            </Link>
            <MdOutlineKeyboardArrowLeft size={24} />
            <span>{t("committeeDetails")}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-3">
          <div className="lg:col-span-5">
            {isCommitteeFetching ? (
              <CommitteeDataLoader />
            ) : (
              <DataAboutCommittee data={committeeData} />
            )}
          </div>

          <div className="lg:col-span-7 bg-lightGray rounded-lg">
            <div className="bg-white p-2">
              <div className="flex gap-1 mx-2 my-1 bg-semiGray p-1 rounded-lg">
                {["teamMembers", "tasks", "meetings"].map((tab) => (
                  <Button
                    key={tab}
                    disabled={isCommitteeFetching}
                    className={`w-1/3 border-none ${
                      activeTab === tab ? "text-black" : "bg-transparent"
                    }`}
                    onClick={() => setActiveTab(tab as ActiveTab)}
                  >
                    {t(tab)}
                  </Button>
                ))}
              </div>
            </div>

            <div>{renderTasks || renderMeetings}</div>
            <div
              className={`bg-white ${
                activeTab === "teamMembers" && "px-3 py-2"
              }`}
            >
              {renderTeamMembers}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-2 rounded-lg flex items-center mt-4 gap-2">
        <Dropdown menu={{ items: dropdownItems }} trigger={["click"]}>
          <Button
            disabled={isCommitteeFetching}
            loading={isCommitteeFetching}
            type="primary"
            className="bg-gradient-to-r from-primary to-secondary min-w-[20%]"
          >
            {t("add")}
            <MdOutlineKeyboardArrowUp size={24} />
          </Button>
        </Dropdown>
        <Button
          disabled={isCommitteeFetching}
          loading={isCommitteeFetching}
          className="bg-semiGray text-black min-w-[20%]"
          onClick={() => setDrawerState("committee")}
        >
          {t("edit")}
        </Button>
      </div>

      <Drawer
        placement="left"
        size="large"
        onClose={() => setDrawerState("close")}
        footer={
          drawerState === "committee" ? (
            <FormBtn
              form="committee-form"
              text={t("save")}
              loading={updateCommitteeMutation.isPending}
            />
          ) : drawerState === "mission" ? (
            <FormBtn
              form="createProject"
              text={t("save")}
              loading={createMission.isPending}
            />
          ) : (
            <></>
          )
        }
        title={drawerTitle}
        open={drawerState !== "close"}
      >
        <div className="overflow-hidden">
          {drawerState === "committee" && (
            <CommitteesForm
              data={committeeData}
              errors={errors}
              action={(values) =>
                updateCommitteeMutation.mutate({ ...values, id: committeeId })
              }
            />
          )}
          {drawerState === "mission" && (
            <MissionForm
              errors={errors}
              members={committeeData?.members}
              action={(value) => createMission.mutate(value)}
            />
          )}
          {drawerState === "meeting" && (
            <MeetingForm mutation={createMeetingMutation} />
          )}

          {drawerState === "mission-details" && (
            <MissionDetails isLoading={isMissionFetching} data={missionData} />
          )}
        </div>
      </Drawer>
    </div>
  );
}
