import useErrors from "@/hooks/useError";
import { getMembers } from "@/services/meetings";
import { getAllDepartment, getAllManagers } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";
import { DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import AttachmentUploader from "../ui/AttachmentUploader";
import { renderSelectOptions } from "../ui/RenderSelectOptions";
import useSetProjectValues from "./useSetProjectValues";

export interface ProjectFormValues {
  id?: string;
  projectName?: string;
  name: string;
  description: string;
  orgId: { value: number };
  isInternal: boolean;
  startDate: string;
  endDate: string;
  deptId: { value: number };
  orgInfo: { id: number; title: string };
  MemberIds?: { label: string; value: string }[] | string[];
  members?: { userInfo?: { id?: string; name: string } }[];
}
interface ProjectFormProps {
  action: (values: ProjectFormValues) => Promise<void>;
  errors: [{ [key: string]: string }] | string | null;
  data?: any;
}

const mapDepartments = (departmentsData: any, language: string) =>
  departmentsData?.map((el) => ({
    label: language === "ar" ? el?.nameAr : el?.nameEn,
    value: el?.id,
  }));

export default function ProjectForm({ action, errors, data }: ProjectFormProps) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [memberName, setMemberName] = useState("");
  const [files, setFiles] = useState<any>();

  const { data: departments, isFetching } = useQuery({
    queryKey: ["Departments"],
    queryFn: () =>
      getAllDepartment().then((res) => mapDepartments(res?.data?.items || [], i18n.language)),
  });

  const { data: orgs, isFetching: isFetchingManagers } = useQuery({
    queryKey: ["orgs"],
    queryFn: () =>
      getAllManagers().then((data) => {
        return data?.data?.map((el) => {
          return { label: el?.userInfo?.name, value: el?.id };
        });
      }),
  });

  const { data: members, isFetching: isFetchingMembers } = useQuery({
    queryKey: ["Members", memberName],
    queryFn: () =>
      getMembers({ PageIndex: 1, PageSize: 10, Name: memberName }).then((data) => {
        return data?.data?.map((el) => {
          return { label: el?.name, value: el?.id };
        });
      }),
  });

  useSetProjectValues(form, data);
  useErrors(form, errors, "project");

  const startDate = Form.useWatch("startDate", form);

  const onFinish = async (values: ProjectFormValues) => {
    values.deptId = values?.deptId?.value as any;
    values.startDate = values.startDate ? `${dayjs(values.startDate).utc()}` : "";
    values.endDate = values.endDate ? `${dayjs(values.endDate).utc()}` : "";
    values.orgId = values?.orgId?.value as any;
    values.MemberIds = values.MemberIds?.map((el) => el.value);
    values.id = data?.id;

    action({ ...values, Files: files?.map((e) => e.originFileObj) } as any).then(() => {
      if (!data) {
        form.resetFields([
          "deptId",
          "endDate",
          "MemberIds",
          "name",
          "description",
          "startDate",
          "endDate",
          "orgId",
          "Files",
        ]);
      }
      setFiles(undefined);
    });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.projectName,
        description: data?.description,
        MemberId: data?.members?.map((e) => ({
          value: e.userId,
          label: e.userInfo?.name,
        })),
        deptId: data?.deptId && {
          value: data?.department?.id,
          label: data?.department?.[i18n.language == "ar" ? "nameAr" : "nameEn"],
        },
        orgId: data?.orgId && {
          value: data?.orgInfo?.id,
          label: data?.orgInfo?.title,
        },
        startDate: data?.startDate && dayjs(data?.startDate),
        endDate: data?.endDate && dayjs(data?.endDate),
        id: data?.id,
      });
    } else {
      form.resetFields([
        "deptId",
        "endDate",
        "MemberIds",
        "name",
        "description",
        "startDate",
        "endDate",
        "orgId",
        "Files",
      ]);
    }
    setFiles(undefined);
  }, [data]);

  return (
    <Form
      form={form}
      id="createProject"
      className="space-y-4"
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: t("validation:requiredField") }]}
        className="my-0"
        label={t("projectName")}
      >
        <Input placeholder={t("projectName") + "..."} />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: t("validation:requiredField") }]}
        name="description"
        className="mb-0"
        label={t("projectDescription")}
      >
        <Input.TextArea
          placeholder={t("projectDescription") + "..."}
          rows={4}
        />
      </Form.Item>

      <div className="grid grid-cols-2 gap-x-4 mb-0 p-0">
        <Form.Item
          name="startDate"
          className="mb-0"
          label={t("startsAt")}
        >
          <DatePicker
            className="w-full"
            placeholder={t("startsAt")}
            suffixIcon={<SlCalender size={20} />}
            minDate={data?.id ? dayjs(data?.startDate) : dayjs()}
          />
        </Form.Item>
        <Form.Item
          name="endDate"
          className="mb-0"
          label={t("endsAt")}
        >
          <DatePicker
            className="w-full"
            placeholder={t("endDate")}
            suffixIcon={<SlCalender size={20} />}
            minDate={startDate ?? dayjs()}
          />
        </Form.Item>
      </div>

      <Form.Item
        name="MemberIds"
        className="mb-0"
        label={t("projectMembers")}
        rules={[{ required: true, message: t("validation:requiredField") }]}
      >
        <Select
          filterOption={false}
          labelInValue
          options={members}
          showSearch={true}
          mode="multiple"
          onSearch={(value) => {
            setMemberName(value);
          }}
          maxTagCount={4}
          loading={isFetchingMembers}
          placeholder={t("projectMembers") + "..."}
          suffixIcon={<IoIosArrowDown size={20} />}
        />
      </Form.Item>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Form.Item
          name="orgId"
          className="mb-0"
          label={t("projectManager")}
          rules={[{ required: true, message: t("validation:requiredField") }]}
        >
          <Select
            labelInValue
            options={orgs}
            loading={isFetchingManagers}
            showSearch
            placeholder={t("projectManager") + "..."}
            suffixIcon={<IoIosArrowDown size={20} />}
          />
        </Form.Item>

        <Form.Item
          name="deptId"
          className="mb-0"
          label={t("departmentName")}
        >
          <Select
            labelInValue
            options={renderSelectOptions({
              isLoading: isFetching,
              options: departments,
            })}
            placeholder={t("departmentName") + "..."}
            suffixIcon={<IoIosArrowDown size={20} />}
          />
        </Form.Item>
      </div>

      {data && (
        <Form.Item label={t("uploadFile")}>
          <AttachmentUploader
            multiple
            onChange={(file) => {
              setFiles(file.fileList);
            }}
          />
        </Form.Item>
      )}
      {/*  */}
    </Form>
  );
}
