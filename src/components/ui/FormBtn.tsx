import { Button } from "antd";
import { ReactNode } from "react";

export default function FormBtn({
  loading,
  text,
  form,
}: {
  loading: boolean;
  text: string | ReactNode;
  form: string;
}) {
  return (
    <Button
      loading={loading}
      disabled={loading}
      form={form}
      className="w-full mt-4 bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
      type="primary"
      htmlType="submit"
    >
      {text}
    </Button>
  );
}
