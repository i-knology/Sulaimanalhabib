import AuthWrapper from "@/components/auth/AuthWrapper";
import { Button, Form, Input, Typography } from "antd";
import CountDown from "react-countdown";
import { useTranslation } from "react-i18next";
import { LuArrowRight } from "react-icons/lu";
import OTPSuccessResult from "./OTPSuccessResult";

export default function OTP() {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const isSuccess = false;

  return (
    <AuthWrapper>
      {!isSuccess ? (
        <div className="space-y-4 max-w-xl mx-auto w-full">
          <img
            src="/illustrations/forgot-password.svg"
            width={160}
            height={144}
            className="mx-auto block"
            alt={import.meta.env.VITE_APP_NAME}
          />
          <div className="text-center space-y-2">
            <Typography className="text-2xl font-medium">
              {t("forgotPasswordTitle")}
            </Typography>
            <Typography className="text-gray-500">
              {t("otpSubtitle")}{" "}
              <span className="font-medium text-black">
                example@example.com
              </span>
            </Typography>
          </div>

          <Form
            autoComplete="off"
            autoCorrect="off"
            layout="vertical"
            initialValues={{ otp: undefined, email: undefined }}
            form={form}
            onFinish={(values) => {
              console.log(values);
            }}
          >
            <Form.Item
              name="otp"
              rules={[
                {
                  required: true,
                  message: t("validation:requiredField"),
                },
              ]}
            >
              <div className="mx-auto table mt-4">
                <Input.OTP size="middle" />
              </div>
            </Form.Item>

            <Button
              className="w-full mt-4 bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
              type="primary"
              htmlType="submit"
            >
              {t("confirm")}
            </Button>

            <CountDown
              date={Date.now() + 60 * 1000}
              renderer={({ minutes, seconds, completed }) => {
                return (
                  <Button
                    className="w-full mt-4 text-gray-600"
                    htmlType="button"
                    type="text"
                    variant="solid"
                    disabled={!completed}
                  >
                    {t("remainderOtpContent")}{" "}
                    <span className="font-medium text-black">
                      {minutes}:{seconds}
                    </span>
                  </Button>
                );
              }}
            />

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
      ) : (
        <OTPSuccessResult />
      )}
    </AuthWrapper>
  );
}
