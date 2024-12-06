import useErrors from "@/hooks/useError";
import { getProjectMembers } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { useParams } from "react-router-dom";
import { renderSelectOptions } from "../ui/RenderSelectOptions";
import { FileInput } from "./ProjectForm";

export interface MissionFormValues {
  Name: string;
  Description: string;
  StartDate?: string;
  EndDate?: string;
  ProjectId?: string;
  MemberIds: Array<{ label: string; value: string }>;
  Files?: string | string[];
}

interface MissionFormProps {
  action: (values) => void;
  errors: [{ [key: string]: string }] | string | null;
  members?: { typeId: number; userInfo: { name: string; id: string } }[];
}

export default function MissionForm({
  action,
  errors,
  members,
}: MissionFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm<MissionFormValues>();
  const { projectId } = useParams<{ projectId: string }>();

  const { data: projectMembers = [], isFetching } = useQuery({
    queryKey: ["ProjectMembers", projectId],
    queryFn: async () => {
      const response = await getProjectMembers(projectId);
      return response?.data?.items?.[0]?.members?.map((el) => ({
        label: el?.userInfo?.name,
        value: el?.userInfo?.id,
      }));
    },
    enabled: !!projectId,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  useErrors(form, errors, "project");

  const onSubmit = (values: MissionFormValues) => {
    const formattedValues: MissionFormValues = {
      ...values,
      StartDate: values.StartDate ? dayjs(values.StartDate).toISOString() : "",
      EndDate: values.EndDate ? dayjs(values.EndDate).toISOString() : "",
      ProjectId: projectId,
      MemberIds: values.MemberIds.map((member) => ({
        label: member.label,
        value: member.value,
      })),
    };
    const dummyData = {
      ...formattedValues,
      MemberIds: formattedValues.MemberIds.map((el) => el.value),
    };

    if (typeof members?.[0] == "object") {
      delete dummyData?.StartDate;
      delete dummyData?.EndDate;
      delete dummyData?.ProjectId;
    }
    action(dummyData);
  };

  return (
    <Form
      form={form}
      id="createProject"
      className="space-y-4"
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        name="Title"
        label={t("name")}
        className="my-0"
        rules={[{ required: true, message: t("validation:requiredField") }]}
      >
        <Input variant="filled" placeholder={`${t("name")}...`} />
      </Form.Item>

      <Form.Item
        name="Description"
        label={t("description")}
        className="mb-0"
        rules={[{ required: true, message: t("validation:requiredField") }]}
      >
        <Input.TextArea
          variant="filled"
          placeholder={`${t("description")}...`}
        />
      </Form.Item>

      {typeof members?.[0] !== "object" && (
        <div className="grid grid-cols-2 gap-x-4 mb-0 p-0">
          <Form.Item
            name="StartDate"
            label={t("startDate")}
            className="mb-0"
            rules={[{ required: true, message: t("validation:requiredField") }]}
          >
            <DatePicker
              variant="filled"
              className="w-full"
              placeholder={t("startsAt")}
              suffixIcon={<SlCalender size={20} />}
            />
          </Form.Item>
          <Form.Item
            name="EndDate"
            label={t("endDate")}
            className="mb-0"
            rules={[{ required: true, message: t("validation:requiredField") }]}
          >
            <DatePicker
              variant="filled"
              className="w-full"
              placeholder={t("endDate")}
              suffixIcon={<SlCalender size={20} />}
            />
          </Form.Item>
        </div>
      )}

      <Form.Item
        name="MemberIds"
        label={t("taskTeam")}
        className="mb-0"
        rules={[{ required: true, message: t("validation:requiredField") }]}
      >
        <Select
          variant="filled"
          options={renderSelectOptions({
            isLoading: isFetching,
            options:
              typeof members?.[0] == "object"
                ? members?.map((el) => {
                    return {
                      label: el?.userInfo?.name,
                      value: el?.userInfo?.id,
                    };
                  })
                : projectMembers,
          })}
          mode="multiple"
          labelInValue
          filterOption={false}
          placeholder={`${t("selectTaskTeam")}...`}
          suffixIcon={<IoIosArrowDown size={20} />}
        />
      </Form.Item>

      <Form.Item name="Files" className="hidden">
        <FileInput ref={fileInputRef} />
      </Form.Item>

      <Form.Item className="mb-0" label={t("addAttachments")}>
        <Button
          className="border-dashed border-secondary border-2 py-10 w-full bg-semiGray text-black"
          onClick={handleAddImage}
        >
          <AiOutlineCloudUpload size={28} />
          <span>{t("dragAndDropFiles")}</span>
          <span>{t("uploadAttachments")}</span>
        </Button>
      </Form.Item>
    </Form>
  );
}
