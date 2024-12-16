import Calendar from "@/assets/icons/calendar.svg";
import Download from "@/assets/icons/download.svg";
import Edit from "@/assets/icons/edit.svg";
import File from "@/assets/icons/file.svg";
import FileSecure from "@/assets/icons/fileSecure.svg";
import useResultModal from "@/hooks/useModal";
import {
  cancelProject,
  closeProject,
  createProjectTask,
  deleteProject,
  getAllProjects,
  getProjectStatuses,
  updateProject,
  updateProjectStatus,
} from "@/services/projects";
import errorException from "@/utils/errorException";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Drawer, Dropdown, List, Segmented, Select, Typography } from "antd";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import FormBtn from "../ui/FormBtn";
import HrDivider from "../ui/HrDivider";
import MissionForm from "./MissionForm";
import ProjectForm, { ProjectFormValues } from "./ProjectForm";
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
    toggleDrawer();
    setErrors(null);
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
                  key: 4,
                  className: "!p-3",
                  onClick: () => {
                    if (project?.statusId == 4)
                      updateStatusMutation.mutate({ id: projectId, statusId: 2 } as any);
                    else cancellationMutation.mutate();
                  },
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
    </div>
  );
}

function ProjectContentCard({
  projectName,
  startDate,
  endDate,
  orgInfo,
  statusInfo,
  description,
  onStatusChange,
}) {
  const { i18n } = useTranslation();
  const { data } = useQuery({
    queryFn: () => getProjectStatuses(),
    queryKey: ["projects-status-lookup"],
  });

  const [selectedStatus, setSelectedStatus] = useState();

  useEffect(() => {
    setSelectedStatus(
      statusInfo && {
        value: statusInfo?.id,
        label: statusInfo?.[i18n.language == "ar" ? "nameAr" : "nameEn"],
      },
    );
  }, [statusInfo]);

  return (
    <div className="p-4 rounded-xl bg-white space-y-4">
      <div className="flex gap-3 items-center">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
          <File />
        </span>
        <div className="flex-1">
          <Typography.Paragraph className="font-medium text-sm !mb-0 ">
            {projectName}
          </Typography.Paragraph>
        </div>
        {/* <ProjectStatus id={statusId} /> */}
        <Select
          size="small"
          variant="filled"
          className="!w-28 flex-shrink-0"
          defaultValue={selectedStatus}
          labelInValue
          options={data?.data?.items?.map((status) => ({
            label: status?.[i18n.language == "ar" ? "nameAr" : "nameEn"],
            value: status?.id,
          }))}
          onChange={(value) => {
            onStatusChange(value);
            setSelectedStatus(value);
          }}
          placeholder={t("status")}
        />
      </div>
      <Typography.Paragraph className="!mb-0 text-slate-700">{description}</Typography.Paragraph>
      <HrDivider />
      <div className="grid grid-cols-2 gap-4">
        <span className="col-span-2">
          <ProjectItem
            icon={<FileSecure />}
            title={t("departmentName")}
            content={orgInfo?.title}
          />
        </span>
        <ProjectItem
          icon={<Calendar />}
          title={t("startDate")}
          content={startDate ? dayjs(startDate)?.format("DD MMMM YYYY") : t("notAvailable")}
        />
        <ProjectItem
          icon={<Calendar />}
          title={t("endDate")}
          content={endDate ? dayjs(endDate)?.format("DD MMMM YYYY") : t("notAvailable")}
        />
      </div>
    </div>
  );
}

function ProjectItem({ title, content, icon }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-lightGray text-gray-500 flex-shrink-0">
        {icon}
      </span>
      <div className="flex-1">
        <Typography.Paragraph className="text-slate-700 text-sm !mb-1">
          {title}
        </Typography.Paragraph>
        <Typography className="!mb-0 font-medium">{content}</Typography>
      </div>
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
  return (
    <List
      dataSource={attachments}
      renderItem={(item: any) => {
        return (
          <List.Item className="border-t border-t-gray-200 first:border-t-0 first:!pt-0">
            <div className="flex items-center gap-3 w-full">
              <div className="w-10 h-10 flex-shrink-0 inline-flex items-center justify-center bg-lightGray rounded-lg">
                <File />
              </div>
              <div className="flex-1">
                <Typography className="font-medium">{item.title}</Typography>
                <Typography.Paragraph className="text-gray-600 !mb-0">
                  {dayjs(item.modifiedDate).format("DD MMMM YYYY h:mmA")}
                </Typography.Paragraph>
              </div>
              <div className="inline-flex gap-2">
                <Button
                  type="link"
                  href={item.documentUrl}
                  download={item.title}
                  icon={<Download />}
                  className="!rounded-lg !w-10 h-10 !min-w-10"
                />
                {/* delete attachment is missing ENDPOINT */}
                {/* <Button
                  type="primary"
                  icon={<Delete />}
                  className="!rounded-lg !bg-red-500/5 text-red-500 !w-10 h-10 !min-w-10"
                /> */}
              </div>
            </div>
          </List.Item>
        );
      }}
    />
  );
}
