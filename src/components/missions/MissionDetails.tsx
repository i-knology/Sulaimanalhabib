import Calendar from "@/assets/icons/calendar.svg";
import Clipboard from "@/assets/icons/clipboard.svg";
import Folder from "@/assets/icons/folder.svg";
import UserEdit from "@/assets/icons/userEdit.svg";
import Users from "@/assets/icons/users.svg";
import {
  addNewMession,
  deleteTaskMession,
  editTaskMession,
  getMissionComments,
  getMissionStatus,
  getTaskMissions,
  updateMessionStatus,
} from "@/services/missions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Dropdown,
  Form,
  Input,
  List,
  Select,
  Tabs,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiDotsHorizontal, BiSolidCheckCircle } from "react-icons/bi";
import { LuCircle, LuClock, LuFileEdit, LuPenLine, LuPlus, LuTrash } from "react-icons/lu";
import HrDivider from "../ui/HrDivider";
import CancelIcon from "./CancelIcon";
import MissionComment from "./MissionComment";
import MissionCommentForm from "./MissionCommentForm";

export default function MissionDetails({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  return (
    <Drawer
      open={isOpen}
      title={t("missionDetails")}
      size="large"
      placement="left"
      onClose={onClose}
    >
      <div className="space-y-4">
        <AddNewMission id={isOpen.id} />
        <HrDivider />
        <div>
          <Missions missionId={isOpen?.id} />
        </div>
        <HrDivider />
        <List>
          <List.Item>
            <div className="grid grid-cols-3 gap-3 w-full">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <Clipboard />
                <span>{t("MissionPriority")}</span>
              </div>
              <div className="col-span-2 font-medium text-black">
                {isOpen?.priorityInfo?.[i18n.language == "ar" ? "nameAr" : "nameEn"]}
              </div>
            </div>
          </List.Item>
          <List.Item>
            <div className="grid grid-cols-3 gap-3 w-full">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <Folder />
                <span>{t("project")}</span>
              </div>
              <div className="col-span-2 font-medium text-black">{isOpen?.title}</div>
            </div>
          </List.Item>
          <List.Item>
            <div className="grid grid-cols-3 gap-3 w-full">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <Calendar />
                <span>{t("startDate")}</span>
              </div>
              <div className="col-span-2 font-medium text-black">
                {isOpen?.startDate ? dayjs(isOpen?.startDate).format("YYYY-MMM-DD") : "-"}
              </div>
            </div>
          </List.Item>
          <List.Item>
            <div className="grid grid-cols-3 gap-3 w-full">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <Calendar />
                <span>{t("endDate")}</span>
              </div>
              <div className="col-span-2 font-medium text-black">
                {isOpen?.endDate ? dayjs(isOpen?.endDate).format("YYYY-MMM-DD") : "-"}
              </div>
            </div>
          </List.Item>
          <List.Item>
            <div className="grid grid-cols-3 gap-3 w-full">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <Users />
                <span>{t("missionResponsibility")}</span>
              </div>
              <div className="col-span-2 font-medium text-black">
                <Badge className="bg-gray-100 rounded-full border border-gray-300 p-1.5 pe-3 m-0">
                  <div className="inline-flex items-center gap-2">
                    <Avatar
                      size={26}
                      shape="circle"
                      src={isOpen?.userInfo?.profilePictureUrl}
                    />
                    <span>{isOpen?.userInfo?.name}</span>
                  </div>
                </Badge>
              </div>
            </div>
          </List.Item>
          <List.Item>
            <div className="grid grid-cols-3 gap-3 w-full">
              <div className="inline-flex items-center gap-2 text-gray-500">
                <UserEdit />
                <span>{t("missionCreator")}</span>
              </div>
              <div className="col-span-2 font-medium text-black">
                <Badge className="bg-gray-100 rounded-full border border-gray-300 p-1.5 pe-3 m-0">
                  <div className="inline-flex items-center gap-2">
                    <Avatar
                      size={26}
                      shape="circle"
                      src={isOpen?.createdUserInfo?.profilePictureUrl}
                    />
                    <span>{isOpen?.createdUserInfo?.name}</span>
                  </div>
                </Badge>
              </div>
            </div>
          </List.Item>
        </List>
        <Tabs
          items={[
            {
              label: t("details"),
              key: "1",
              children: <MissionDescription description={isOpen?.description} />,
            },
            {
              label: t("missionComments"),
              key: "2",
              children: <MissionComments missionId={isOpen?.id} />,
            },
            {
              label: t("missionHistory"),
              key: "3",
              children: <MissionHistory />,
            },
          ]}
        />
      </div>
    </Drawer>
  );
}

function MissionDescription({ description }) {
  const { t } = useTranslation();

  return (
    <p className="p-3 rounded-lg bg-slate-100 block text-slate-600">{description ?? t("noData")}</p>
  );
}

function MissionComments({ missionId }) {
  const [totalCount, setTotalCount] = useState();
  const [page, setPage] = useState(10);
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["missions-priorities", page, missionId],
    queryFn: () =>
      getMissionComments({
        pageSize: 10,
        page,
        sortField: "createdDate",
        sortType: "desc",
        taskId: missionId,
      }).then((res) => {
        setTotalCount(res.data?.totalCount ?? 0);
        return res;
      }),
  });

  return (
    <div className="space-y-2">
      <MissionCommentForm
        refetch={refetch}
        missionId={missionId}
      />

      <List
        dataSource={data?.data?.items || []}
        loading={isFetching}
        pagination={{
          total: totalCount,
          pageSize: 10,
          onChange: (page) => {
            setPage(page);
          },
        }}
        renderItem={(comment: any) => <MissionComment {...comment} />}
      />
    </div>
  );
}

function MissionHistory() {
  return (
    <List>
      {Array.from({ length: 1 })
        .fill(0)
        .map((_, index) => (
          <MissionHistoryItem key={index} />
        ))}
    </List>
  );
}

function MissionHistoryItem() {
  return (
    <List.Item>
      <div className="flex items-center w-full gap-3">
        <span className="w-8 h-8 rounded-md text-orange-500 bg-orange-100 flex items-center justify-center flex-shrink-0">
          <LuFileEdit size={20} />
        </span>
        <div className="flex-1">
          <Typography className="font-medium">Edit</Typography>
          <Typography.Paragraph className="text-gray-600 text-xs">
            قام <span className="text-black font-medium">Ahmed Mohammed</span> بتعديل المهمة
          </Typography.Paragraph>
        </div>
        <p className="inline-flex items-center gap-2 text-gray-600 text-xs">
          <LuClock size={18} />
          <span>{dayjs().format("DD MMM YYYY , h:mm A")}</span>
        </p>
      </div>
    </List.Item>
  );
}

function Missions({ missionId }) {
  const { data } = useQuery({
    queryKey: ["task-messions", missionId],
    queryFn: () =>
      getTaskMissions({
        sortField: "createdDate",
        sortType: "desc",
        taskId: missionId,
      }).then((res) => {
        return res;
      }),
  });
  const { data: status } = useQuery({
    queryKey: ["task-messions-status", missionId],
    queryFn: () =>
      getMissionStatus({
        sortField: "createdDate",
        sortType: "desc",
      }).then((res) => {
        return res;
      }),
  });

  return (
    <List
      dataSource={data?.data?.items ?? []}
      renderItem={(item: any) => (
        <MissionItem
          {...item}
          statuses={status}
        />
      )}
    />
  );
}

function MissionItem({ title, id, statusId, statuses, taskId }) {
  const { i18n, t } = useTranslation();
  const queryClient = useQueryClient();
  const [isEditAble, setIsEditAble] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: (values) => updateMessionStatus(values),
    onError: console.log,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["task-messions"] });
      queryClient.refetchQueries({ queryKey: ["missions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTaskMession(id),
    onError: console.log,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["task-messions"] });
      queryClient.refetchQueries({ queryKey: ["missions"] });
    },
  });

  return (
    <List.Item
      key={id}
      className="w-full !p-0 mb-3 last:mb-0"
    >
      {isEditAble ? (
        <UpdateSelectedMission
          title={title}
          missionId={id}
          id={taskId}
          onClose={() => setIsEditAble(false)}
        />
      ) : (
        <div
          className="flex items-center gap-3 w-full"
          key={id}
        >
          {statusId == 3 ? (
            <BiSolidCheckCircle
              size={24}
              className="text-teal-600"
            />
          ) : (
            <LuCircle
              size={24}
              className="text-gray-300"
            />
          )}
          <span
            className={
              statusId == 3 ? "line-through" : statusId == 4 ? "line-through text-red-500" : ""
            }
          >
            {title}
          </span>
          <span className="flex-1"></span>

          <Select
            size="small"
            options={statuses?.data?.items}
            className="w-28 !rounded-full"
            // rootClassName="!rounded-full"

            placeholder={t("missionStatus")}
            defaultValue={statusId}
            variant="filled"
            onChange={(value) => {
              mutation.mutate({
                id,
                status: value,
              });
            }}
            disabled={mutation.isPending}
            loading={mutation.isPending}
            fieldNames={{
              label: i18n.language == "ar" ? "nameAr" : "nameEn",
              value: "id",
            }}
          />
          <Dropdown
            menu={{
              items: [
                {
                  label: t("edit"),
                  icon: <LuPenLine size={18} />,
                  onClick: () => setIsEditAble(true),
                  key: 0,
                  className: "!px-3 !py-2",
                },
                {
                  label: t("delete"),
                  icon: <LuTrash size={18} />,
                  className: "!text-red-500 !px-3 !py-2",
                  onClick: () => deleteMutation.mutate(id),
                  key: 1,
                },
              ],
            }}
            trigger={["click"]}
          >
            <Button
              size="small"
              className="!rounded-lg"
            >
              <BiDotsHorizontal size={20} />
            </Button>
          </Dropdown>
        </div>
      )}
    </List.Item>
  );
}

function UpdateSelectedMission({ id, title, missionId, onClose }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    form.setFieldValue("title", title);
  }, [title]);

  const mutation = useMutation({
    mutationFn: (values: any) => editTaskMession({ taskId: id, id: missionId, ...values }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["task-messions", id],
      });
      queryClient.refetchQueries({
        queryKey: ["missions"],
      });
      form.resetFields(["title"]);
    },
  });

  return (
    <div className="w-full">
      <Form
        form={form}
        id="update-selected-mission"
        layout="inline"
        onFinish={(values) => {
          mutation.mutate(values);
        }}
      >
        <TaskMissionField
          loading={mutation.isPending}
          closeAble
          onClose={onClose}
        />
      </Form>
    </div>
  );
}

function AddNewMission({ id }) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: any) => addNewMession({ taskId: id, ...values }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["task-messions", id],
      });
      queryClient.refetchQueries({
        queryKey: ["missions"],
      });
      form.resetFields(["title"]);
    },
  });

  return (
    <div>
      <Form
        form={form}
        id="create-new-mission"
        layout="inline"
        onFinish={(values) => {
          mutation.mutate(values);
        }}
      >
        <TaskMissionField loading={mutation.isPending} />
      </Form>
    </div>
  );
}

function TaskMissionField({
  loading,
  closeAble,
  onClose,
}: {
  loading: boolean;
  closeAble?: boolean;
  onClose?: () => void;
}) {
  const { t } = useTranslation();
  return (
    <>
      {/* <Form.Item label={t("missionTitle")} /> */}
      <Form.Item
        rules={[{ required: true, message: t("validation:requiredField") }]}
        layout="vertical"
        className="!flex-1"
        name="title"
      >
        <Input
          placeholder={t("missionTitle")}
          prefix={
            closeAble && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
                type="button"
              >
                <CancelIcon />
              </button>
            )
          }
          maxLength={50}
          count={{
            show: true,
            max: 50,
          }}
        />
      </Form.Item>
      <Form.Item className="!m-0">
        <Button
          icon={<LuPlus size={20} />}
          type="primary"
          htmlType="submit"
          className="bg-gradient-to-r from-secondary to-primary flex-shrink-0"
          disabled={loading}
          loading={loading}
        />
      </Form.Item>
    </>
  );
}
