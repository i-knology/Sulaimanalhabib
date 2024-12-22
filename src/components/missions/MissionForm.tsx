import useErrors from "@/hooks/useError";
import { getMembers } from "@/services/meetings";
import { getTaskPriority } from "@/services/missions";
import { getAllProjects } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";
import { DatePicker, Form, Input, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import AttachmentUploader from "../ui/AttachmentUploader";
import CancelIcon from "./CancelIcon";
import PlusIcon from "./PlusIcon";

interface CommitteeFormValues {
  Title: string;
  Description: string;
  userId: { value: string };
  projectId: { value: string };
  priorityId: { value: string };
  StartDate: Dayjs;
  EndDate: Dayjs;

  Messions: { title: string }[];
}

interface CommitteeFormProps {
  action: (values) => Promise<void>;
  errors: [{ [key: string]: string }] | string | null;
  data?: any;
}

export default function MissionForm({ errors, action, data }: CommitteeFormProps) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [searchKey, setSearchKey] = useState("");
  const [projectsSearchKey, setProjectSearchKey] = useState("");
  const [prioritySearch, setPrioritySearch] = useState("");
  const startDate = Form.useWatch("StartDate", form);
  const [files, setFiles] = useState<any>();

  const { data: projects = [], isFetching: isProjectsFetching } = useQuery({
    queryKey: ["projects", searchKey],
    queryFn: async () => {
      const response = await getAllProjects({
        pageIndex: 1,
        pageSize: 8,
        Name: projectsSearchKey,
      });
      return response?.data?.items?.map((el) => ({
        label: el?.projectName,
        value: el?.id,
      }));
    },
  });

  const { data: members = [], isFetching: isMembersLoading } = useQuery({
    queryKey: ["members", searchKey],
    queryFn: async () => {
      const response = await getMembers({
        PageIndex: 1,
        PageSize: 8,
        Name: searchKey,
      });
      return response?.data?.map((el) => ({
        label: el?.name,
        value: el?.id,
      }));
    },
  });
  const { data: priorities = [], isFetching: isPrioritiesLoading } = useQuery({
    queryKey: ["missions-priorities", searchKey],
    queryFn: async () => {
      const response = await getTaskPriority({
        PageIndex: 1,
        PageSize: 8,
        Name: prioritySearch,
      });
      return response?.data?.items?.map((el) => ({
        label: i18n.language == "ar" ? el?.nameAr : el?.nameEn,
        value: el?.id,
      }));
    },
  });

  useErrors(form, errors);

  const handleFinish = (values: CommitteeFormValues) => {
    const formattedValues = {
      ...values,
      userId: typeof values.userId == "object" ? values.userId?.value : values.userId,
      projectId: typeof values.projectId == "object" ? values.projectId?.value : values.projectId,
      priorityId:
        typeof values.priorityId == "object" ? values.priorityId?.value : values.priorityId,
      id: data?.id,
      StartDate: values.StartDate ? values.StartDate?.format("YYYY-MM-DD") : undefined,
      EndDate: values.EndDate ? values.EndDate?.format("YYYY-MM-DD") : undefined,
    };

    action({ ...formattedValues, Files: files?.map((e) => e.originFileObj) }).then(() => {
      form.resetFields([
        "userId",
        "Title",
        "Description",
        "Messions",
        "priorityId",
        "projectId",
        "StartDate",
        "EndDate",
        "Files",
      ]);
      setFiles(undefined);
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        Title: data?.title,
        Description: data?.title,
        userId: data?.userInfo && {
          value: data?.userInfo?.id,
          label: data?.userInfo?.name,
        },
        projectId: data?.projectInfo && {
          value: data?.projectInfo?.id,
          label: data?.projectInfo?.projectName,
        },
        priorityId: data?.priorityInfo && {
          label: i18n.language == "ar" ? data?.priorityInfo?.nameAr : data?.priorityInfo?.nameEn,
          value: data?.priorityInfo?.id,
        },
        StartDate: dayjs(data?.startDate),
        EndDate: dayjs(data?.endDate),
        Messions: data?.messions?.map((mession) => ({
          title: mession.title,
          id: mession.id,
        })),
        id: data?.id,
      });
    } else {
      form.resetFields([
        "userId",
        "Title",
        "Description",
        "Messions",
        "priorityId",
        "StartDate",
        "EndDate",
        "projectId",
        "Files",
      ]);
      form.setFieldValue("Messions", [{ title: undefined }]);
    }

    console.log(data);
  }, [data]);

  return (
    <Form
      form={form}
      id={data ? "editMission" : "createdMission"}
      className="space-y-4"
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        Messions: [
          {
            title: undefined,
          },
        ],
      }}
    >
      <Form.List name="Messions">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <div
                  key={field.key}
                  className="relative"
                >
                  <Form.Item
                    {...field}
                    label={t("missionTitle")}
                    name={[field.name, "title"]}
                    rules={[{ required: true, message: t("validation:requiredField") }]}
                  >
                    <Input
                      placeholder={t("missionTitle")}
                      suffix={
                        fields.length > 1 && (
                          <button
                            onClick={() => remove(field.name)}
                            className="text-gray-400 hover:text-gray-600"
                            type="button"
                          >
                            <CancelIcon />
                          </button>
                        )
                      }
                      className="!pe-2"
                    />
                  </Form.Item>
                </div>
              ))}
              <div className="flex justify-end items-center space-x-2">
                <button
                  onClick={() => {
                    add({
                      title: undefined,
                    });
                  }}
                  className="flex gap-[8px] items-center"
                  type="button"
                >
                  <PlusIcon />
                  <p className="underline hover:no-underline font-medium text-labelColor">
                    {t("addNewMission")}
                  </p>
                </button>
              </div>
            </>
          );
        }}
      </Form.List>
      <hr className="hr border-8 border-[#F8FAFB]" />
      <Form.Item
        // rules={[{ required: true, message: t("validation:requiredField") }]}
        className="my-0"
        name="projectId"
        label={t("projectName")}
      >
        <Select
          placeholder={`${t("projectName")}...`}
          suffixIcon={<IoIosArrowDown size={20} />}
          options={projects}
          showSearch
          labelInValue
          loading={isProjectsFetching}
          filterOption={false}
          onSearch={setProjectSearchKey}
          onChange={() => setProjectSearchKey("")}
          className="w-full"
        />
      </Form.Item>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Form.Item
          rules={[{ required: true, message: t("validation:requiredField") }]}
          className="my-0"
          name="userId"
          label={t("missionResponsibility")}
        >
          <Select
            placeholder={`${t("missionResponsibility")}...`}
            suffixIcon={<IoIosArrowDown size={20} />}
            options={members}
            showSearch
            labelInValue
            loading={isMembersLoading}
            filterOption={false}
            onSearch={setSearchKey}
            onChange={() => setSearchKey("")}
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: t("validation:requiredField") }]}
          className="my-0"
          name="priorityId"
          label={t("MissionPriority")}
        >
          <Select
            placeholder={`${t("MissionPriority")}...`}
            suffixIcon={<IoIosArrowDown size={20} />}
            options={priorities}
            showSearch
            labelInValue
            loading={isPrioritiesLoading}
            filterOption={false}
            onSearch={setPrioritySearch}
            onChange={() => setPrioritySearch("")}
            className="w-full"
          />
        </Form.Item>
      </div>

      <hr className="hr border-8 border-[#F8FAFB]" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Form.Item
          name="StartDate"
          label={t("startDate")}
        >
          <DatePicker
            className="w-full"
            suffixIcon={<SlCalender size={20} />}
            disabledDate={(date) => date.isBefore(dayjs().clone().add(-1, "days"))}
          />
        </Form.Item>
        <Form.Item
          name="EndDate"
          label={t("endDate")}
        >
          <DatePicker
            className="w-full"
            suffixIcon={<SlCalender size={20} />}
            disabledDate={(date) => date.isBefore(startDate ?? dayjs().clone().add(-1, "days"))}
          />
        </Form.Item>
      </div>

      {/* <FrequencySelector
        onChange={(value) => console.log("FrequencySelector", value)}
        defaultValue="daily"
      /> */}
      <hr className="hr border-8 border-[#F8FAFB]" />

      <Form.Item
        name="Description"
        label={t("enterNotesHere")}
      >
        <Input.TextArea placeholder={`${t("enterNotesHere")}...`} />
      </Form.Item>

      <Form.Item label={t("uploadFile")}>
        <AttachmentUploader
          multiple
          onChange={(file) => {
            setFiles(file.fileList);
          }}
        />
      </Form.Item>
    </Form>
  );
}
