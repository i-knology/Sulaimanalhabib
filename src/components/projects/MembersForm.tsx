import useErrors from "@/hooks/useError";
import { getMembers } from "@/services/meetings";
import { useQuery } from "@tanstack/react-query";
import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import useSetProjectValues from "./useSetProjectValues";

interface MembersFormProps {
  action: (values: any) => Promise<void>;
  errors: [{ [key: string]: string }] | string | null;
  data?: any;
}

export default function MembersForm({ action, errors, data }: MembersFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [memberName, setMemberName] = useState("");

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
  useErrors(form, errors, "projectMembers");

  const onFinish = async (values) => {
    values.id = data?.id;

    action({
      MemberIds: values?.MemberIds?.map((e) => e.value),
    }).then(() => {
      form.resetFields(["MemberIds"]);
    });
  };

  useEffect(() => {
    form.resetFields(["MemberIds"]);
  }, [data]);

  return (
    <Form
      form={form}
      id="addNewMember"
      className="space-y-4"
      layout="vertical"
      onFinish={onFinish}
    >
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
    </Form>
  );
}
