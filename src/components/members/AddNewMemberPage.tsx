import { Button, Checkbox, Form, Input } from "antd";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
    MdOutlineAddPhotoAlternate,
    MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { Link } from "react-router-dom";

export default function AddNewMemberPage() {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div>
      <div className="bg- mx-2 ">
        <p className="flex items-center py-4 px-2 rounded-lg ">
          <Link to={"/members"} className="text-primary">
            {t("members")}
          </Link>
          <MdOutlineKeyboardArrowLeft size={24} />
          <span>{t("addNewUser")}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-1 lg:grid-cols-12 lg:gap-8 p-2">
        <div className="rounded-lg bg-white p-4 col-span-8 min-h-full">
          <div className="flex items-center justify-center">
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
              className="w-1/5 rounded-full relative group"
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

          <Form layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 ">
              <Form.Item
                className="mb-3"
                label={t("username")}
                name="username"
                rules={[
                  { required: true, message: t("validation:requiredField") },
                ]}
              >
                <Input variant="filled" placeholder={`${t("username")}...`} />
              </Form.Item>

              <Form.Item
                className="mb-3"
                label={t("phoneNumber")}
                name="phoneNumber"
                rules={[
                  { required: true, message: t("validation:requiredField") },
                ]}
              >
                <Input
                  variant="filled"
                  placeholder={`${t("phoneNumber")}...`}
                />
              </Form.Item>
            </div>
            <Form.Item
              className="mb-3"
              label={t("email")}
              name="email"
              rules={[
                { required: true, message: t("validation:requiredField") },
              ]}
            >
              <Input variant="filled" placeholder={`${t("email")}...`} />
            </Form.Item>

            <Form.Item
              className="mb-3"
              label={t("userDescription")}
              rules={[
                { required: true, message: t("validation:requiredField") },
              ]}
            >
              <Input.TextArea
                variant="filled"
                placeholder={t("userDescription") + "..."}
              />
            </Form.Item>
          </Form>
        </div>
        <div className="rounded-lg bg-white p-4 col-span-4 min-h-full">
          <div className="p-2">
            <div>
              <p className="font-semibold my-2">{t("userPermissions")}</p>
              <div className="w-8 h-[5px] mb-4 bg-secondary" />
            </div>
            <div className="">
              {Array.from({ length: 12 })
                .fill(null)
                .map(() => (
                  <div className="my-2">
                    <Checkbox>{t("permission")}</Checkbox>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Button
            className="md:w-1/5 mx-4 my-2 bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92]"
            type="primary"
            htmlType="submit"
          >
            {t("save")}
          </Button>
    </div>
  );
}
