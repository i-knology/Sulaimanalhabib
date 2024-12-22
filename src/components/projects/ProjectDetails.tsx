import Edit from "@/assets/icons/edit.svg?react";
import useResultModal from "@/hooks/useModal";
import {
  addDocuments,
  addMembers,
  cancelProject,
  closeProject,
  createProjectTask,
  deleteProject,
  getAllProjects,
  updateProject,
  updateProjectStatus,
} from "@/services/projects";
import errorException from "@/utils/errorException";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Drawer, Dropdown, List, Segmented } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import FormBtn from "../ui/FormBtn";
import AttachmentCard from "./AttachmentCard";
import AttachmentForm from "./AttachmentForm";
import MembersForm from "./MembersForm";
import MissionForm from "./MissionForm";
import ProjectContentCard from "./ProjectContentCard";
import ProjectForm, { ProjectFormValues } from "./ProjectForm";
import ProjectStatistic from "./ProjectStatistic";
import TeamMemberCard from "./TeamMemberCard";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("attachments");

  // const queryClient = useQueryClient();
  const globalModal = useResultModal();

  // State management
  const [errors, setErrors] = useState<[{ [key: string]: string }] | string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isNewAttachment, setIsNewAttachment] = useState(false);
  const [isNewMember, setIsNewMember] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["details", projectId],
    queryFn: () => getAllProjects({ ProjectId: projectId }),
    enabled: !!projectId,
    refetchOnMount: "always",
  });

  const project = data?.data?.items?.[0];

  // Handlers
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const handleSuccess = () => {
    setIsOpen(false);
    setIsNewAttachment(false);
    setIsNewTaskOpen(false);
    setIsNewMember(false);
    setErrors(null);
    refetch();
    globalModal.success({ title: t("createdSuccessfully"), subtitle: "" });
  };

  const handleError = (error: AxiosError) => {
    setErrors(errorException(error));
  };

  // Mutation for updating a project
  const mutation = useMutation({
    mutationFn: (values: any) => updateProject(values),
    onSuccess: handleSuccess,
    onError: handleError,
  });
  // Mutation for updating a project
  const missionMutation = useMutation({
    mutationFn: (values: any) => createProjectTask(values),
    onSuccess: handleSuccess,
    onError: handleError,
  });
  // Mutation for updating a project
  const attachmentMutation = useMutation({
    mutationFn: (values: any) =>
      addDocuments({
        ...values,
        id: projectId,
      }),
    onSuccess: handleSuccess,
    onError: handleError,
  });
  // Mutation for updating a project
  const membersMutation = useMutation({
    mutationFn: (values: any) =>
      addMembers({
        ...values,
        id: projectId,
      }),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  // Mutation for project cancellation
  const cancellationMutation = useMutation({
    mutationFn: () => cancelProject(projectId),
    onSuccess: () => {
      refetch();
    },
    onError: handleError,
  });
  // Mutation for updating a project
  const updateStatusMutation = useMutation({
    mutationFn: (values) => updateProjectStatus(values),
    onSuccess: () => {
      refetch();
    },
    onError: handleError,
  });
  // Mutation for activation a project
  const updateProjectActivation = useMutation({
    mutationFn: (values) => closeProject(values),
    onSuccess: () => {
      refetch();
    },
    onError: handleError,
  });
  // Mutation for activation a project
  const deleteCurrentProject = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      refetch();
    },
    onError: handleError,
  });

  return (
    <div className="p-3 space-y-4">
      <div className="flex items-center p-4 rounded-xl bg-white gap-4">
        <p className="text-sm text-gray-500 inline-flex items-center">
          <Link
            to="/projects"
            className="text-primary"
          >
            {t("projects")}
          </Link>
          <MdOutlineKeyboardArrowLeft size={24} />
          <span>{t("projectDetails")}</span>
        </p>
        <span className="flex-1"></span>
        <div className="inline-flex gap-3">
          <Button
            icon={<Edit />}
            size="small"
            className="!px-3 !rounded-md"
            type="primary"
            onClick={() => setIsOpen(true)}
          >
            {t("edit")}
          </Button>
          <Dropdown
            menu={{
              items: [
                // {
                //   label: t("edit"),
                //   key: 0,
                //   className: "!p-3",
                //   onClick: () => setIsOpen(true),
                // },
                {
                  label: t("addNewMission"),
                  key: 1,
                  className: "!p-3",
                  onClick: () => setIsNewTaskOpen(true),
                },

                {
                  label: t("delete"),
                  key: 2,
                  className: "!p-3",
                  onClick: () => deleteCurrentProject.mutate(),
                },
                {
                  label: project?.isClosed ? t("openProject") : t("closeProject"),
                  key: 4,
                  className: "!p-3",
                  onClick: () =>
                    updateProjectActivation.mutate({
                      id: projectId,
                      isClosed: !project?.isClosed,
                    } as any),
                },
                {
                  label: project?.statusId == 4 ? t("reactivateProject") : t("cancelProject"),
                  key: 5,
                  className: "!p-3",
                  onClick: () => {
                    if (project?.statusId == 4)
                      updateStatusMutation.mutate({ id: projectId, statusId: 2 } as any);
                    else cancellationMutation.mutate();
                  },
                },
                {
                  label: t("addNewMember"),
                  key: 6,
                  className: "!p-3",
                  onClick: () => setIsNewTaskOpen(true),
                },
                {
                  label: t("addNewAttachment"),
                  key: 7,
                  className: "!p-3",
                  onClick: () => setIsNewAttachment(true),
                },
              ],
            }}
          >
            <Button
              icon={<BiDotsHorizontalRounded size={20} />}
              size="small"
              className="!rounded-lg"
            />
          </Dropdown>
        </div>
      </div>

      {/* project details content */}
      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="flex-shrink-0 lg:w-96 space-y-4">
          <ProjectContentCard
            {...project}
            onStatusChange={(status) =>
              updateStatusMutation.mutate({ id: projectId, statusId: status?.value } as any)
            }
          />
          <div className="p-4 rounded-xl bg-white space-y-4">
            <ProjectStatistic
              series={[
                (data?.data?.notStartedCount || 0) +
                  (data?.data?.pendingCount || 0) +
                  (data?.data?.lateCount || 0),
                data?.data?.completedCount ?? 0,
                data?.data?.canceledCount ?? 0,
              ]}
            />
          </div>
        </div>
        <div className="flex-1 w-full space-y-4">
          <div className="p-4 rounded-xl bg-white space-y-4">
            <Segmented
              value={selectedTab}
              onChange={setSelectedTab}
              options={[
                {
                  label: t("projectMembers"),
                  className: "w-full !rounded-lg",
                  value: "members",
                },
                {
                  label: t("projectTasks"),
                  className: "w-full !rounded-lg",
                  value: "tasks",
                },
                {
                  label: t("projectAttachments"),
                  className: "w-full !rounded-lg",
                  value: "attachments",
                },
              ]}
              className="w-full p-2 rounded-xl"
            />

            {/* project members */}

            {(() => {
              switch (selectedTab) {
                case "tasks":
                  break;
                case "attachments":
                  return <ProjectAttachments attachments={project?.documents ?? []} />;

                default:
                  return <ProjectMembers members={project?.members ?? []} />;
              }
            })()}
          </div>
        </div>
      </div>
      {/* project details content */}

      <Drawer
        onClose={toggleDrawer}
        footer={
          <FormBtn
            form="createProject"
            text={t("save")}
            loading={mutation.isPending}
          />
        }
        open={isOpen}
        placement="left"
        title={project?.projectName}
        size="large"
      >
        <ProjectForm
          errors={errors}
          action={(values: ProjectFormValues) => mutation.mutateAsync(values)}
          data={project}
        />
      </Drawer>

      <Drawer
        onClose={() => setIsNewTaskOpen(false)}
        footer={
          <FormBtn
            form="createProjectMission"
            text={t("addNewMission")}
            loading={missionMutation.isPending}
          />
        }
        open={isNewTaskOpen}
        placement="left"
        title={t("addNewMission")}
        size="large"
      >
        <MissionForm
          errors={errors}
          action={(values: any) => missionMutation.mutateAsync(values)}
          // data={project}
        />
      </Drawer>
      <Drawer
        onClose={() => setIsNewAttachment(false)}
        footer={
          <FormBtn
            form="addNewAttachment"
            text={t("addNewAttachment")}
            loading={attachmentMutation.isPending}
          />
        }
        open={isNewAttachment}
        placement="left"
        title={t("addNewAttachment")}
      >
        <AttachmentForm
          errors={errors}
          action={(values: any) => attachmentMutation.mutateAsync(values)}
        />
      </Drawer>
      <Drawer
        onClose={() => setIsNewMember(false)}
        footer={
          <FormBtn
            form="addNewMember"
            text={t("addNewMember")}
            loading={membersMutation.isPending}
          />
        }
        open={isNewMember}
        placement="left"
        title={t("addNewMember")}
      >
        <MembersForm
          errors={errors}
          action={(values: any) => membersMutation.mutateAsync(values)}
        />
      </Drawer>
    </div>
  );
}

function ProjectMembers({ members }) {
  return (
    <List
      dataSource={members}
      renderItem={(item: any) => (
        <TeamMemberCard
          member={item}
          refetch={() => {}}
        />
      )}
    />
  );
}

function ProjectAttachments({ attachments }) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(attachments);
  }, [attachments]);

  return (
    <List
      dataSource={items}
      renderItem={(item: any) => {
        return (
          <AttachmentCard
            document={item}
            refetch={() => setItems((prev) => prev.filter((e) => e.id !== item.id))}
          />
        );
      }}
    />
  );
}
