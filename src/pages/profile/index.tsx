import HrDivider from "@/components/ui/HrDivider";
import type { GetProp, UploadProps } from "antd";
import { Button, Form, Image, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuImagePlus } from "react-icons/lu";
import { useSelector } from "react-redux";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useSelector((state: any) => state.auth);
  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    form.setFieldsValue({
      email: user?.email,
      username: user.username,
      fullName: user.fullName,
      phoneNumber: user.mobileNo,
    });
  }, []);

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    console.log(img);
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center justify-center bg-white rounded-xl">
        <Form
          className="py-8 px-4 space-y-4 w-full max-w-screen-md"
          layout="vertical"
          form={form}
        >
          <div className="flex items-start gap-4 w-full flex-col md:flex-row">
            <div className="flex items-center justify-center flex-shrink-0 w-64 mx-auto">
              <Form.Item
                name="profilePicture"
                className="mx-auto w-full space-y-4"
              >
                <Image
                  width={160}
                  height={160}
                  src={imageUrl}
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
                name="fullName"
                rules={[{ required: true, message: t("validation:requiredField") }]}
              >
                <Input placeholder={`${t("username")}...`} />
              </Form.Item>

              <Form.Item
                className="mb-0"
                label={t("phoneNumber")}
                name="phoneNumber"
                rules={[{ required: true, message: t("validation:requiredField") }]}
              >
                <Input placeholder={`${t("phoneNumber")}...`} />
              </Form.Item>

              <Form.Item
                className="mb-0"
                label={t("email")}
                name="email"
                rules={[{ required: true, message: t("validation:requiredField") }]}
              >
                <Input placeholder={`${t("email")}...`} />
              </Form.Item>

              <div className="bg-gray-300 w-full h-[1px] mt-4" />

              <Form.Item
                className="m-0"
                label={t("currentPassword")}
                name="currentPassword"
                rules={[{ required: true, message: t("validation:requiredField") }]}
              >
                <Input.Password placeholder={t("currentPassword") + "..."} />
              </Form.Item>

              <Form.Item
                className="m-0"
                label={t("newPassword")}
                name="password"
                dependencies={["currentPassword"]}
                rules={[
                  { required: true, message: t("validation:requiredField") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("currentPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(t("validation:passwordShouldNotMatchWithCurrent")),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder={t("newPassword") + "..."} />
              </Form.Item>

              <Form.Item
                className="m-0"
                label={t("confirmNewPassword")}
                name="confirmNewPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: t("validation:requiredField") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t("validation:passwordMismatch")));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder={t("confirmNewPassword") + "..."} />
              </Form.Item>
              <HrDivider />
              <Button
                className="bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92] w-full"
                type="primary"
                htmlType="submit"
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
