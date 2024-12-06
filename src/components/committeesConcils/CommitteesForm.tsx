import useErrors from "@/hooks/useError";
import { getCommitteesTypes } from "@/services/committees";
import { getMembers } from "@/services/meetings";
import { mergeUniqueArrays } from "@/utils/mergeArrays";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { FileInput } from "../projects/ProjectForm";
import { renderSelectOptions } from "../ui/RenderSelectOptions";
import { useSetCommitteeFormValues } from "./useSetCommitteeFormValues ";

interface CommitteeFormValues {
  Title: string;
  Description: string;
  CommitteeManagerId: { value: string };
  CommitteeDecisionId: { value: string };
  TypeId: number;
  IsInternal: boolean;
  MemberIds: { value: string }[];
}
interface CommitteeData {
  description: string;
  title: string;
  isInternal: boolean;
  typeId: number;
  members: { typeId: number; userInfo: { id: string; name: string } }[];
}
interface CommitteeFormProps {
  action: (values) => void;
  errors: [{ [key: string]: string }] | string | null;
  data?: CommitteeData;
}

export default function CommitteesForm({
  errors,
  data,
  action,
}: CommitteeFormProps) {
  const { t, i18n } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [form] = Form.useForm();
  const [searchKey, setSearchKey] = useState("");

  const { data: committeeTypesData = [], isFetching } = useQuery({
    queryKey: ["CommitteeTypeLookup"],
    queryFn: async () => {
      const response = await getCommitteesTypes();
      return response?.data?.items?.map((el) => ({
        label: i18n.language === "ar" ? el?.nameAr : el?.nameEn,
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

  const committeeTypes = useMemo(
    () => [
      { label: t("statuses:internal"), value: true },
      { label: t("statuses:external"), value: false },
    ],
    [t]
  );

  useSetCommitteeFormValues(form, data);
  useErrors(form, errors);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFinish = (values: CommitteeFormValues) => {
    const formattedValues = {
      ...values,
      CommitteeManagerId:
        typeof values.CommitteeManagerId == "object"
          ? values.CommitteeManagerId?.value
          : values.CommitteeManagerId,
      CommitteeDecisionId:
        typeof values.CommitteeDecisionId == "object"
          ? values.CommitteeDecisionId?.value
          : values.CommitteeDecisionId,
      MemberIds: values.MemberIds?.map((member) =>
        typeof member == "object" ? member?.value : member
      ),
    };
    action(formattedValues);
  };

  return (
    <Form
      form={form}
      id="committee-form"
      className="space-y-4"
      layout="vertical"
      onFinish={handleFinish}
    >
      <label className="font-semibold" htmlFor="TypeId">
        {t("committeeType")}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          rules={[{ required: true, message: t("validation:requiredField") }]}
          className="my-0"
          name="IsInternal"
        >
          <Select
            variant="filled"
            options={committeeTypes}
            suffixIcon={<IoIosArrowDown size={20} />}
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: t("validation:requiredField") }]}
          className="my-0"
          name="TypeId"
        >
          <Select
            variant="filled"
            options={renderSelectOptions({
              isLoading: isFetching,
              options: committeeTypesData,
            })}
            suffixIcon={<IoIosArrowDown size={20} />}
          />
        </Form.Item>
      </div>

      <Form.Item
        rules={[{ required: true, message: t("validation:requiredField") }]}
        name="Title"
        label={t("committeeName")}
      >
        <Input variant="filled" placeholder={`${t("committeeName")}...`} />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: t("validation:requiredField") }]}
        name="Description"
        label={t("meetingDescription")}
      >
        <Input.TextArea
          variant="filled"
          placeholder={`${t("meetingDescription")}...`}
        />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          rules={[{ required: true, message: t("validation:requiredField") }]}
          className="my-0"
          name="CommitteeManagerId"
          label={t("committeeChair")}
        >
          <Select
            variant="filled"
            placeholder={`${t("committeeChair")}...`}
            suffixIcon={<IoIosArrowDown size={20} />}
            options={renderSelectOptions({
              isLoading: isMembersLoading,
              options:
                typeof data == "object"
                  ? mergeUniqueArrays(
                      members,
                      data?.members
                        ?.filter((el) => el?.typeId == 1)
                        ?.map((el) => {
                          return {
                            label: el?.userInfo?.name,
                            value: el?.userInfo?.id,
                          };
                        })
                    )
                  : members,
            })}
            showSearch
            labelInValue
            filterOption={false}
            onSearch={setSearchKey}
            onChange={() => setSearchKey("")}
            className="w-full"
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: t("validation:requiredField") }]}
          className="my-0"
          name="CommitteeDecisionId"
          label={t("committeeSecretary")}
        >
          <Select
            variant="filled"
            placeholder={`${t("committeeChair")}...`}
            suffixIcon={<IoIosArrowDown size={20} />}
            options={renderSelectOptions({
              isLoading: isMembersLoading,
              options:
                typeof data == "object"
                  ? mergeUniqueArrays(
                      members,
                      data?.members
                        ?.filter((el) => el?.typeId == 2)
                        ?.map((el) => {
                          return {
                            label: el?.userInfo?.name,
                            value: el?.userInfo?.id,
                          };
                        })
                    )
                  : members,
            })}
            showSearch
            labelInValue
            filterOption={false}
            onSearch={setSearchKey}
            onChange={() => setSearchKey("")}
            className="w-full"
          />
        </Form.Item>
      </div>

      <Form.Item className="my-0" name="MemberIds" label={t("committeeMmeber")}>
        <Select
          variant="filled"
          mode="multiple"
          placeholder={`${t("committeeMmeber")}...`}
          suffixIcon={<IoIosArrowDown size={20} />}
          options={renderSelectOptions({
            isLoading: isMembersLoading,
            options:
              typeof data == "object"
                ? mergeUniqueArrays(
                    members,
                    data?.members
                      ?.filter((el) => el?.typeId !== 2)
                      ?.filter((el) => el?.typeId !== 1)
                      ?.map((el) => {
                        return {
                          label: el?.userInfo?.name,
                          value: el?.userInfo?.id,
                        };
                      })
                  )
                : members,
          })}
          showSearch
          labelInValue
          filterOption={false}
          onSearch={setSearchKey}
          onChange={() => setSearchKey("")}
          className="w-full"
        />
      </Form.Item>

      <Form.Item name="Files" className="hidden" label={t("addAttachments")}>
        <FileInput ref={fileInputRef} />
      </Form.Item>

      <Form.Item label={t("addAttachments")}>
        <Button
          className="border-dashed border-secondary border-2 py-7 w-full bg-gray-100 text-black"
          onClick={handleButtonClick}
        >
          <AiOutlineCloudUpload size={28} />
          <span className="text-gray-400">{t("dragAndDropFiles")}</span>
          <span className="text-black">{t("uploadAttachments")}</span>
        </Button>
      </Form.Item>
    </Form>
  );
}
