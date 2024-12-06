import { Button, Checkbox, Form, Input, Select } from "antd";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import useSetValues from "./useSetValues";

export default function UpdateUserDate({ userData, action }) {
  const { t } = useTranslation();
  const [activeBtn, setActiveBtn] = useState("userData");
  const [form] = Form.useForm();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useSetValues(form, userData);
  const onFinish = (values) => {
    action(values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      id="update-user-data"
      className="space-y-4"
      layout="vertical"
    >
      <div className="bg-gray-100 w-full rounded-lg gap-1 flex my-1 p-1">
        <Button
          className={`w-1/2 text-black border-none ${
            activeBtn !== "userData" ? "bg-transparent" : ""
          }`}
          variant="filled"
          onClick={() => setActiveBtn("userData")}
        >
          {t("userData")}
        </Button>

        <Button
          variant="filled"
          className={`w-1/2 text-black border-none ${
            activeBtn !== "userPermissions" ? "bg-transparent" : ""
          }`}
          onClick={() => setActiveBtn("userPermissions")}
        >
          {t("userPermissions")}
        </Button>
      </div>

      {activeBtn == "userData" && (
        <>
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
                src={userData?.profilePicture}
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
              label={t("phoneNumber")}
              name="PhoneNumber"
            >
              <Input variant="filled" placeholder={`${t("phoneNumber")}...`} />
            </Form.Item>

            <Form.Item className="mb-0" label={t("username")} name="name">
              <Input variant="filled" placeholder={`${t("username")}...`} />
            </Form.Item>

            <Form.Item className="mb-0" label={t("email")} name="email">
              <Input variant="filled" placeholder={`${t("email")}...`} />
            </Form.Item>

            <Form.Item
              className="mb-0"
              label={t("userCountry")}
              name="userCountry"
            >
              <Select
                variant="filled"
                suffixIcon={<IoIosArrowDown size={20} />}
                placeholder={`${t("userCountry")}...`}
              />
            </Form.Item>

            <Form.Item
              className="mb-0"
              label={t("userEntity")}
              name="userEntity"
            >
              <Select
                variant="filled"
                suffixIcon={<IoIosArrowDown size={20} />}
                placeholder={`${t("userEntity")}...`}
              />
            </Form.Item>

            <Form.Item className="mb-0" label={t("userNumber")} name="id">
              <Input variant="filled" placeholder={`${t("userNumber")}...`} />
            </Form.Item>
          </div>
          <Form.Item className="mb-0" label={t("userDescription")}>
            <Input.TextArea
              variant="filled"
              placeholder={t("userDescription") + "..."}
            />
          </Form.Item>
        </>
      )}

      {activeBtn == "userPermissions" && (
        <div className="p-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 12 })
              .fill(null)
              .map(() => (
                <Checkbox>{t("permission")}</Checkbox>
              ))}
          </div>
        </div>
      )}
    </Form>
  );
}
