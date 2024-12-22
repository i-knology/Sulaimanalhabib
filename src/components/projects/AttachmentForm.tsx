import useErrors from "@/hooks/useError";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import AttachmentUploader from "../ui/AttachmentUploader";
import useSetProjectValues from "./useSetProjectValues";

interface AttachmentFormProps {
  action: (values: any) => Promise<void>;
  errors: [{ [key: string]: string }] | string | null;
  data?: any;
}

export default function AttachmentForm({ action, errors, data }: AttachmentFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useSetProjectValues(form, data);
  useErrors(form, errors, "attachment");

  const onFinish = async (values) => {
    action({ ...values, files: values.files?.fileList?.map((e) => e.originFileObj) } as any).then(
      () => {
        form.resetFields(["files"]);
      },
    );
  };

  return (
    <Form
      form={form}
      id="addNewAttachment"
      className="space-y-4"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        files: [],
      }}
    >
      <Form.Item
        label={t("uploadFile")}
        name="files"
        rules={[
          {
            required: true,
            message: t("validation:requiredField"),
          },
        ]}
      >
        <AttachmentUploader multiple />
      </Form.Item>
    </Form>
  );
}
