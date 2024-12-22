import { addComment } from "@/services/missions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { LuMessagesSquare } from "react-icons/lu";

export default function MissionCommentForm({ refetch, missionId }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => addComment({ ...values, taskId: missionId }),
    onError: console.log,
    onSuccess: () => {
      form.resetFields(["comments"]);
      queryClient.refetchQueries({
        queryKey: ["missions-history", missionId],
      });
      refetch();
    },
  });

  return (
    <Form
      form={form}
      id="mission-comment-form"
      onFinish={(values) => {
        mutation.mutate(values);
      }}
    >
      <Form.Item
        name="comments"
        rules={[
          {
            required: true,
            message: t("validation:requiredField"),
          },
        ]}
      >
        <Input
          placeholder={`${t("addComment")}...`}
          prefix={<LuMessagesSquare size={20} />}
          className="border border-gray-300"
          disabled={mutation.isPending}
        />
      </Form.Item>
    </Form>
  );
}
