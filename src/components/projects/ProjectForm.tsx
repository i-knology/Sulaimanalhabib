import useErrors from "@/hooks/useError";
import { getMembers } from "@/services/meetings";
import { getAllDepartment, getAllManagers } from "@/services/projects";
import { useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { forwardRef, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { renderSelectOptions } from "../ui/RenderSelectOptions";
import useSetProjectValues from "./useSetProjectValues";
import { mergeUniqueArrays } from "@/utils/mergeArrays";

export interface ProjectFormValues {
  projectName?: string;
  name: string;
  description: string;
  orgId?: number | { value: number };
  isInternal: boolean;
  startDate: string;
  endDate: string;
  deptId?: number | { value: number };
  orgInfo?: { id: number; title: string };
  MemberIds?: { label: string; value: string }[] | string[];
  members?: { userInfo?: { id?: string; name: string } }[];
}
interface ProjectFormProps {
  action: (values: ProjectFormValues) => void;
  errors: [{ [key: string]: string }] | string | null;
  data?: ProjectFormValues | boolean | undefined;
}
const normalizeSelectValue = (deptId: number | { value: number } | undefined) =>
  typeof deptId === "object" && deptId !== null ? deptId.value : deptId || 1;

const mapDepartments = (departmentsData: any, language: string) =>
  departmentsData?.map((el) => ({
    label: language === "ar" ? el?.nameAr : el?.nameEn,
    value: el?.id,
  }));

export default function ProjectForm({
  action,
  errors,
  data,
}: ProjectFormProps) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [memberName, setMemberName] = useState("");
  const { data: departments, isFetching } = useQuery({
    queryKey: ["Departments"],
    queryFn: () =>
      getAllDepartment().then((res) =>
        mapDepartments(res?.data?.items || [], i18n.language)
      ),
  });

  const { data: orgs, isFetching: isFetchingManagers } = useQuery({
    queryKey: ["orgs"],
    queryFn: () =>
      getAllManagers().then((data) => {
        return data?.data?.map((el) => {
          return { label: el?.title, value: el?.id };
        });
      }),
  });

  const { data: members, isFetching: isFetchingMembers } = useQuery({
    queryKey: ["Members", memberName],
    queryFn: () =>
      getMembers({ PageIndex: 1, PageSize: 10, Name: memberName }).then(
        (data) => {
          return data?.data?.map((el) => {
            return { label: el?.name, value: el?.id };
          });
        }
      ),
  });

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };
  useSetProjectValues(form, data);
  useErrors(form, errors, "project");

  const onFinish = (values: ProjectFormValues) => {
    values.deptId = normalizeSelectValue(values?.deptId);
    values.startDate = values.startDate
      ? `${dayjs(values.startDate).utc()}`
      : "";
    values.endDate = values.endDate ? `${dayjs(values.endDate).utc()}` : "";
    values.orgId = normalizeSelectValue(values?.orgId);

    if (data !== undefined) {
      const memberIds = values.MemberIds?.map((el) =>
        typeof el === "object" ? el.value : el
      );
      values.MemberIds = memberIds || [];
      delete values.orgId;
      delete values.deptId;
    }

    action(values);
  };

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
        <Input variant="filled" placeholder={t("projectName") + "..."} />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: t("validation:requiredField") }]}
        name="description"
        className="mb-0"
        label={t("projectDescription")}
      >
        <Input.TextArea
          variant="filled"
          placeholder={t("projectDescription") + "..."}
        />
      </Form.Item>

      <div className="grid grid-cols-2 gap-x-4 mb-0 p-0">
        <Form.Item name="startDate" className="mb-0" label={t("startsAt")}>
          <DatePicker
            variant="filled"
            className="w-full"
            placeholder={t("startsAt")}
            suffixIcon={<SlCalender size={20} />}
          />
        </Form.Item>
        <Form.Item name="endDate" className="mb-0" label={t("endsAt")}>
          <DatePicker
            variant="filled"
            className="w-full"
            placeholder={t("endDate")}
            suffixIcon={<SlCalender size={20} />}
          />
        </Form.Item>
      </div>

      {data !== undefined && (
        <Form.Item
          name="MemberIds"
          className="mb-0"
          label={t("projectMembers")}
        >
          <Select
            filterOption={false}
            variant="filled"
            labelInValue
            options={[
              ...renderSelectOptions({
                isLoading: isFetchingMembers,
                options:
                  typeof data == "object"
                    ? mergeUniqueArrays(
                        members || [],
                        (data &&
                          typeof data !== "boolean" &&
                          data.members?.map((el) => {
                            const name = el?.userInfo?.name || t("unknownUser");
                            const id = el?.userInfo?.id || "";
                            return {
                              label: name,
                              value: id,
                            };
                          })) ||
                          []
                      )
                    : members,
              }),
            ]}
            showSearch={true}
            mode="multiple"
            onSearch={(value) => {
              setMemberName(value);
            }}
            placeholder={t("projectMembers") + "..."}
            suffixIcon={<IoIosArrowDown size={20} />}
          />
        </Form.Item>
      )}

      {data == undefined && (
        <>
          <Form.Item name="deptId" className="mb-0" label={t("departmentName")}>
            <Select
              variant="filled"
              labelInValue
              options={renderSelectOptions({
                isLoading: isFetching,
                options: departments,
              })}
              placeholder={t("departmentName") + "..."}
              suffixIcon={<IoIosArrowDown size={20} />}
            />
          </Form.Item>

          <Form.Item name="orgId" className="mb-0" label={t("projectManager")}>
            <Select
              variant="filled"
              labelInValue
              options={renderSelectOptions({
                isLoading: isFetchingManagers,
                options: orgs,
              })}
              placeholder={t("projectManager") + "..."}
              suffixIcon={<IoIosArrowDown size={20} />}
            />
          </Form.Item>
        </>
      )}

      {data !== undefined && (
        <>
          <Form.Item className="hidden" name="Files">
            <FileInput ref={fileInputRef} />
          </Form.Item>

          <Form.Item label={t("addAttachments")}>
            <Button
              className="border-dashed border-secondary border-2 py-10 w-full bg-semiGray text-black"
              onClick={handleAddImage}
            >
              <AiOutlineCloudUpload size={28} />
              <span>{t("dragAndDropFiles")}</span>
              <span>{t("uploadAttachments")}</span>
            </Button>
          </Form.Item>
        </>
      )}
    </Form>
  );
}

export const FileInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input type="file" ref={ref} style={{ display: "none" }} {...props} />
));
