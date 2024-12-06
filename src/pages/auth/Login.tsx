import useResultModal from "@/hooks/useModal";
import { handleLogin } from "@/redux/slices/loginSlice";
import { login, loginParameter } from "@/services/auth";
import errorException from "@/utils/errorException";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { LuLock, LuMail } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const globalModal = useResultModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successLogin = (res: AxiosResponse) => {
    dispatch(handleLogin(res?.data));
    navigate("/");
    globalModal.success({
      title: t("successLogin"),
      subtitle: "",
    });
  };

  const errorLogin = (error: AxiosError) => {
    const message = errorException(error);
    if (message) {
      globalModal.error(t("someThingWentWrong"), message);
    }
  };

  const mutation: UseMutationResult<AxiosResponse, AxiosError, loginParameter> = useMutation({
    mutationFn: (values: loginParameter) => login(values),
    onSuccess: successLogin,
    onError: errorLogin,
  });

  return (
    <div className="space-y-4 max-w-lg mx-auto w-full">
      <div className="space-y-2">
        <Typography className="text-2xl font-medium">{t("authWelcome")}</Typography>
        <Typography className="text-gray-500">{t("authSubTitle")}</Typography>
      </div>

      <Form
        id="login"
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
          mutation.mutate(values);
        }}
      >
        <Form.Item
          label={t("email")}
          name="loginName"
          rules={[
            {
              required: true,
              message: t("validation:requiredField"),
            },
            // {
            //   type: "email",
            //   message: t("validation:invalidEmail"),
            // },
          ]}
        >
          <Input
            placeholder="example@example.com"
            prefix={
              <LuMail
                size={18}
                className="text-primary"
              />
            }
          />
        </Form.Item>

        <Form.Item
          label={t("password")}
          name="password"
          rules={[
            {
              required: true,
              message: t("validation:requiredField"),
            },
          ]}
        >
          <Input.Password
            placeholder="••••••••"
            prefix={
              <LuLock
                size={18}
                className="text-primary"
              />
            }
          />
        </Form.Item>

        <div className="flex flex-wrap gap-3 items-center">
          <Form.Item
            name="rememberMe"
            className="m-0"
            valuePropName="checked"
          >
            <Checkbox>{t("rememberMe")}</Checkbox>
          </Form.Item>
          <div className="flex-1"></div>
        </div>
      </Form>

      <Button
        disabled={mutation.isPending}
        loading={mutation.isPending}
        form="login"
        className="w-full mt-4 bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
        type="primary"
        htmlType="submit"
      >
        {t("login")}
      </Button>
    </div>
  );
}
