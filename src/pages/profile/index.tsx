import { handleLogin, logout, User } from "@/redux/slices/loginSlice";
import instance from "@/utils/instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { GetProp, UploadProps } from "antd";
import { Button, Form, Image, Input, Upload } from "antd";
import { serialize } from "object-to-formdata";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuImagePlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useSelector((state: any) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    form.setFieldsValue({
      Email: user?.email,
      FullName: user?.fullName,
      PhoneNumber: user?.mobileNo,
    });
  }, [user]);

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: () =>
      instance.get("Users/GetTokenInfo").then((res) => {
        console.log(res.data.data);
        dispatch(handleLogin(res.data.data as User));
      }),
  });

  const muatation = useMutation({
    mutationFn: (values: any) => {
      return instance
        .post("Users/UserChangeInfo", serialize(values), {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          if (values?.CurrentPassword && values?.Password) {
            return dispatch(logout());
          }
          refetch();
        });
    },
  });

  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center justify-center bg-white rounded-xl">
        <Form
          className="py-8 px-4 space-y-4 w-full max-w-screen-md"
          layout="vertical"
          form={form}
          id="profile-update-form"
          onFinish={muatation.mutate}
        >
          <div className="flex items-start gap-4 w-full flex-col md:flex-row">
            <div className="flex items-center justify-center flex-shrink-0 w-64 mx-auto">
              <Form.Item
                name="ProfilePicture"
                className="mx-auto w-full space-y-4"
              >
                <Image
                  width={160}
                  height={160}
                  src={imageUrl ?? user?.imageProfile}
                  data-src={imageUrl ?? user?.imageProfile}
                  crossOrigin="anonymous"
                  className="rounded-xl"
                  rootClassName="mx-auto !block rounded-xl overflow-hidden"
                  fallback="/profile.png"
                  preview={false}
                />

                <Upload
                  showUploadList={false}
                  beforeUpload={() => false}
                  accept="image/png,image/jpeg,image/jpg"
                  className="flex items-center justify-center !mt-4"
                  onChange={(info) => {
                    getBase64(info.file as FileType, (url) => {
                      setImageUrl(url);
                      form.setFieldValue("ProfilePicture", info.file);
                    });
                  }}
                >
                  <Button
                    htmlType="button"
                    icon={<LuImagePlus size={20} />}
                    type="dashed"
                    size="small"
                    className="!mx-auto !flex"
                  >
                    {t("uploadProfilePicture")}
                  </Button>
                </Upload>
              </Form.Item>
            </div>
            <div className="space-y-4 flex-1 w-full">
              <Form.Item
                className="mb-0"
                label={t("username")}
                name="FullName"
                rules={[{ required: true, message: t("validation:requiredField") }]}
              >
                <Input placeholder={`${t("username")}...`} />
              </Form.Item>

              <Form.Item
                className="mb-0"
                label={t("phoneNumber")}
                name="PhoneNumber"
                rules={[{ required: true, message: t("validation:requiredField") }]}
              >
                <Input placeholder={`${t("phoneNumber")}...`} />
              </Form.Item>

              <Form.Item
                className="mb-0"
                label={t("email")}
                name="Email"
                rules={[{ required: true, message: t("validation:requiredField") }]}
              >
                <Input placeholder={`${t("email")}...`} />
              </Form.Item>

              <div className="bg-gray-300 w-full h-[1px] mt-4" />

              <Form.Item
                className="m-0"
                label={t("currentPassword")}
                name="CurrentPassword"
                // rules={[{ required: true, message: t("validation:requiredField") }]}
              >
                <Input.Password placeholder={t("currentPassword") + "..."} />
              </Form.Item>

              <Form.Item
                className="m-0"
                label={t("newPassword")}
                name="Password"
                dependencies={["CurrentPassword"]}
                rules={[
                  // { required: true, message: t("validation:requiredField") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (value && getFieldValue("CurrentPassword") === value) {
                        return Promise.reject(
                          new Error(t("validation:passwordShouldNotMatchWithCurrent")),
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.Password placeholder={t("newPassword") + "..."} />
              </Form.Item>

              <Form.Item
                className="m-0"
                label={t("confirmNewPassword")}
                name="ConfirmPassword"
                dependencies={["Password"]}
                rules={[
                  // { required: true, message: t("validation:requiredField") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("Password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t("validation:passwordsDoNotMatch")));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder={t("confirmNewPassword") + "..."} />
              </Form.Item>
              <Button
                className="w-full"
                type="primary"
                htmlType="submit"
                form="profile-update-form"
                loading={muatation.isPending}
                disabled={muatation.isPending}
              >
                {t("save")}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
