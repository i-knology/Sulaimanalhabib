import useResultModal from "@/hooks/useModal";
import React from 'react';

import {
  createProjectTask,
  getAllProjects,
  updateProject,
} from "@/services/projects";
import errorException from "@/utils/errorException";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Drawer } from "antd";
import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import FormBtn from "../ui/FormBtn";
import NoData from "../ui/NoData";
import AttachmentCard from "./AttachmentCard";
import DataAboutProject from "./DataAboutProject";
import MissionForm, { MissionFormValues } from "./MissionForm";
import ProjectDataLoader from "./ProjectDataLoader";
import ProjectForm, { ProjectFormValues } from "./ProjectForm";
import ProjectTask from "./ProjectTask";
import TeamMemberCard, { Member } from "./TeamMemberCard";
import TeamMemeberCardLoader from "./TeamMemeberCardLoader";
import MissionChart from "./MissionChart";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["details", projectId],
    queryFn: () => getAllProjects({ ProjectId: projectId }),
    enabled: !!projectId,
    refetchOnMount: "always",
  });

  const { t } = useTranslation();
  const [activeBtn, setActiveBtn] = useState("projectTeam");

  const displayTeamMembers = useMemo(() => {
    return activeBtn === "projectTeam"
      ? data?.data?.items?.[0]?.members?.map(
          (member: Member, index: number) => (
            <TeamMemberCard refetch={refetch} member={member} key={index} />
          )
        )
      : null;
  }, [activeBtn, data?.data.items?.[0]?.members, isFetching]);

  const displayTasks = useMemo(() => {
    return activeBtn === "projectTasks"
      ? data?.data?.items?.[0]?.messions?.map((mession, index: number) => (
          <ProjectTask mession={mession} key={index} />
        ))
      : null;
  }, [activeBtn]);

  const displayAttachments = useMemo(() => {
    return activeBtn === "projectAttachments"
      ? data?.data.items?.[0]?.documents?.map((document, index: number) => (
          <AttachmentCard refetch={refetch} document={document} key={index} />
        ))
      : null;
  }, [activeBtn]);

  const globalModal = useResultModal();
  const [isOpen, setIsOpen] = useState<ProjectFormValues | boolean | undefined>(
    false
  );
  const [errors, setErrors] = useState<
    [{ [key: string]: string }] | string | null
  >(null);

  const openDrawer = (project?: ProjectFormValues) => {
    setIsOpen(project ? project : true);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  const success = () => {
    closeDrawer();
    setErrors(null);
    refetch();
    globalModal.success({
      title:
        isOpen === true ? `${t("createdSuccessfully")}` : `${t("editSuccess")}`,
      subtitle: "",
    });
  };

  const error = (error: AxiosError) => {
    const messages: [{ [key: string]: string }] | string | null =
      errorException(error);
    setErrors(messages);
  };

  const mutation = useMutation({
    mutationFn: (values: ProjectFormValues | MissionFormValues) =>
      isOpen === true
        ? createProjectTask(values)
        : updateProject({ ...values, id: projectId }),
    onSuccess: success,
    onError: error,
  });

  const drawerTextAbout =
    isOpen === true ? t("addNewTask") : t("updateProject");

  return (
    <>
      <div className="flex flex-col justify-between md:min-h-[88vh]">
        <div className="">
          <div className="bg-white  my-1">
            <p className="flex items-center py-4 px-2 rounded-lg">
              <Link to={"/projects"} className="text-primary">
                {t("projects")}
              </Link>
              <MdOutlineKeyboardArrowLeft size={24} />
              <span>{t("projectDetails")}</span>
            </p>
          </div>

          <div className="grid mt-3 grid-cols-1 gap-1 lg:grid-cols-12 lg:gap-4 ">
            <div className="lg:mb-0 mb-2 lg:col-span-5">
              {isFetching ? (
                <ProjectDataLoader />
              ) : (
                <DataAboutProject data={data?.data.items} />
              )}
              <div className="bg-white rounded-lg mt-2">
                <MissionChart />
              </div>
            </div>

            <div className=" rounded-lg bg-lightGray lg:col-span-7">
              <div className="bg-white rounded-lg p-1">
                <div className="bg-semiGray rounded-lg gap-1 flex mx-2 my-1 p-1">
                  <Button
                    disabled={isFetching}
                    className={`w-1/3 text-black border-none ${
                      activeBtn !== "projectTeam" ? "bg-transparent" : ""
                    }`}
                    variant="filled"
                    onClick={() => setActiveBtn("projectTeam")}
                  >
                    {isFetching ? <Skeleton width={33} /> : t("projectTeam")}
                  </Button>

                  <Button
                    disabled={isFetching}
                    variant="filled"
                    className={`w-1/3 text-black border-none ${
                      activeBtn !== "projectTasks" ? "bg-transparent" : ""
                    }`}
                    onClick={() => setActiveBtn("projectTasks")}
                  >
                    {isFetching ? <Skeleton width={33} /> : t("projectTasks")}
                  </Button>

                  <Button
                    disabled={isFetching}
                    className={`w-1/3 text-black border-none ${
                      activeBtn !== "projectAttachments" ? "bg-transparent" : ""
                    }`}
                    variant="filled"
                    onClick={() => setActiveBtn("projectAttachments")}
                  >
                    {isFetching ? (
                      <Skeleton width={33} />
                    ) : (
                      t("projectAttachments")
                    )}
                  </Button>
                </div>
              </div>

              <div className="bg-white p-2">
                {activeBtn === "projectTeam" && isFetching ? (
                  Array.from({ length: 2 }).map((_, index) => (
                    <TeamMemeberCardLoader key={index} />
                  ))
                ) : data?.data?.items?.[0]?.members?.length > 0 ? (
                  displayTeamMembers
                ) : (
                  <NoData title={t("noMembers")} />
                )}
              </div>

              <div>
                {activeBtn === "projectTasks" ? (
                  data?.data?.items?.[0]?.messions?.length > 0 ? (
                    displayTasks
                  ) : (
                    <NoData title={t("noMessions")} />
                  )
                ) : null}
              </div>

              <div>
                {activeBtn === "projectAttachments" ? (
                  data?.data?.items?.[0]?.documents?.length > 0 ? (
                    displayAttachments
                  ) : (
                    <NoData title={t("noFiles")} />
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white w-full py-2 rounded-lg flex items-center mt-0 lg:mt-4">
          <div className="flex gap-2 w-full md:w-[40%] bg-white">
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              className=" w-full bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
              type="primary"
              htmlType="submit"
            >
              {t("addNewTask")}
            </Button>
            <Button
              onClick={() => {
                openDrawer(data?.data.items?.[0]);
              }}
              className="w-full bg-semiGray text-black"
              htmlType="submit"
            >
              {t("edit")}
            </Button>
          </div>
        </div>
      </div>

      <Drawer
        onClose={closeDrawer}
        footer={
          <FormBtn
            form="createProject"
            text={drawerTextAbout}
            loading={mutation.isPending}
          />
        }
        open={isOpen !== false}
        placement="left"
        title={drawerTextAbout}
        size="large"
      >
        {isOpen === true ? (
          <MissionForm
            errors={errors}
            action={(values: MissionFormValues) => {
              mutation.mutate(values);
            }}
          />
        ) : (
          <ProjectForm
            errors={errors}
            action={(values: ProjectFormValues) => {
              mutation.mutate(values);
            }}
            data={isOpen}
          />
        )}
      </Drawer>
    </>
  );
}
