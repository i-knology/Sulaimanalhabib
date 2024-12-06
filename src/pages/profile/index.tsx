import { Button, Form, Input } from "antd";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export default function Profile() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation();
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center justify-center bg-white">
        <Form className="md:w-3/4 w-full px-2 md:px-0 py-4" layout="vertical">
          <div className="flex items-center justify-center mb-2">
            <Form.Item className="hidden" name="image">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  console.log(file);
                }}
              />
            </Form.Item>
            <button
              type="button"
              className="md:w-[15%] w-1/4 rounded-full relative group"
              onClick={handleButtonClick}
            >
              <img
                className="w-full rounded-full"
                src="/illustrations/user-image.svg"
                alt="User"
              />
              <div className="absolute bottom-5 cursor-pointer bg-[#03194B] p-1 rounded-lg">
                <MdOutlineAddPhotoAlternate color="white" size={24} />
              </div>
              <div className="layer absolute top-0 bottom-0 right-0 left-0 cursor-pointer bg-gray-200 opacity-0 group-hover:opacity-25 transition-opacity duration-300 rounded-full"></div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 ">
            <Form.Item
              className="mb-0"
              label={t("username")}
              name="username"
              rules={[
                { required: true, message: t("validation:requiredField") },
              ]}
            >
              <Input variant="filled" placeholder={`${t("username")}...`} />
            </Form.Item>

            <Form.Item
              className="mb-0"
              label={t("phoneNumber")}
              name="phoneNumber"
              rules={[
                { required: true, message: t("validation:requiredField") },
              ]}
            >
              <Input variant="filled" placeholder={`${t("phoneNumber")}...`} />
            </Form.Item>
          </div>

          <Form.Item
            className="mb-0"
            label={t("email")}
            name="email"
            rules={[{ required: true, message: t("validation:requiredField") }]}
          >
            <Input variant="filled" placeholder={`${t("email")}...`} />
          </Form.Item>

          <div className="bg-gray-300 w-full h-[1px] mt-4" />

          <Form.Item
            className="m-0"
            label={t("currentPassword")}
            name="currentPassword"
            rules={[{ required: true, message: t("validation:requiredField") }]}
          >
            <Input.Password variant="filled" placeholder={t("currentPassword")+"..."}/>
          </Form.Item>
          
          <Form.Item
            className="m-0"
            label={t("newPassword")}
            name="password"
            rules={[{ required: true, message: t("validation:requiredField") }]}
          >
            <Input.Password
              variant="filled"
              placeholder={t("newPassword")+"..."}
            />
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
                  return Promise.reject(
                    new Error(t("validation:passwordMismatch"))
                  );
                },
              }),
            ]}
          >
            <Input.Password
              variant="filled"
              placeholder={t("confirmNewPassword")+"..."}
            />
          </Form.Item>
        </Form>
      </div>

      <div className="bg-white flex items-center">
        <Button
          className="md:w-[15%] w-1/4 mt-4 bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
          type="primary"
          htmlType="submit"
        >
          {t("save")}
        </Button>
      </div>
    </div>
  );
}
