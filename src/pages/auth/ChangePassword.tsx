import AuthWrapper from "@/components/auth/AuthWrapper";
import { Button, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { LuArrowRight, LuLock } from "react-icons/lu";

export default function ChangePassword() {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();

  return (
    <AuthWrapper>
      <div className="space-y-4 max-w-xl mx-auto w-full">
        <div>
          <img
            src="/illustrations/forgot-password.svg"
            width={160}
            height={144}
            className="mx-auto block"
            alt={import.meta.env.VITE_APP_NAME}
          />
          <div className="text-center space-y-2">
            <Typography className="text-2xl font-medium">
              {t("createNewPassword")}
            </Typography>
          </div>
        </div>
        
        <Form
          autoComplete="off"
          autoCorrect="off"
          layout="vertical"
          initialValues={{
            email: undefined,
            password: undefined,
            rememberMe: false,
          }}
          form={form}
          onFinish={(values) => {
            console.log(values);
          }}
        >
          <Form.Item
            label={t("newPassword")}
            name="newPassword"
            rules={[
              {
                required: true,
                message: t("validation:requiredField"),
              },
            ]}
          >
            <Input.Password
              placeholder="••••••••"
              prefix={<LuLock size={18} className="text-primary" />}
            />
          </Form.Item>

          <Form.Item
            label={t("confirmNewPassword")}
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: t("validation:requiredField"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("validation:passwordsDoNotMatch"))
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="••••••••"
              prefix={<LuLock size={18} className="text-primary" />}
            />
          </Form.Item>

          <Button
            className="w-full mt-2 bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
            type="primary"
            htmlType="submit"
          >
            {t("confirm")}
          </Button>

          <Button
            className="w-full mt-4"
            htmlType="button"
            icon={<LuArrowRight size={20} />}
            iconPosition={i18n.language == "ar" ? "start" : "end"}
          >
            {t("back")}
          </Button>
        </Form>
      </div>
    </AuthWrapper>
  );
}
