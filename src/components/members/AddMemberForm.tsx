import { Checkbox, Form, Input, Radio, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import HrDivider from "../ui/HrDivider";

export default function AddMemberForm() {
  const { t } = useTranslation();
  const [handleSearch, setHandleSearch] = useState(false);
  const [selectedValue, setSelectedValue] = useState<null | string>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleSelectClick = () => {
    setHandleSearch((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setHandleSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRadioSelect = (value: string) => {
    setSelectedValue(value);
    setInputValue(value);
    setHandleSearch(false);
  };

  return (
    <Form className="space-y-4" layout="vertical">

      <Form.Item
        className="mb-0"
        label={t("username")}
        rules={[{ required: true, message: t("validation:requiredField") }]}
      >
        <Select
          open={false}
          onClick={handleSelectClick}
          placeholder={`${t("username")}...`}
          variant="filled"
          style={{ width: "100%" }}
          suffixIcon={<IoIosArrowDown size={20} />}
          value={inputValue}
          onInputKeyDown={(e) => e.preventDefault()}
        />

        {handleSearch && (
          <div
            ref={dropdownRef}
            className="p-2 rounded-lg border-gray-100 border-solid border-[1px]"
          >
            <Input
              className="mb-2"
              placeholder={`${t("search")}...`}
              variant="filled"
              style={{ width: "100%" }}
              suffix={<CiSearch size={20} />}
            />
            <Radio.Group
              value={selectedValue}
              className="flex flex-col gap-2"
              onChange={(e) => handleRadioSelect(e.target.value)}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <Radio value={`Member ${index + 1}`}>
                    <div className="flex items-center gap-2">
                      <img
                        width={40}
                        src="/illustrations/user-image.svg"
                        alt=""
                      />
                      <p>Member {index + 1}</p>
                    </div>{" "}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        )}
      </Form.Item>

      <Form.Item
        label={t("permissionType")}
        rules={[{ required: true, message: t("validation:requiredField") }]}
      >
        <Select
          placeholder={t("permissionType") + "..."}
          variant="filled"
          mode="tags"
          style={{ width: "100%" }}
          suffixIcon={<IoIosArrowDown size={20} />}
        />
      </Form.Item>

      <div className="border-[1px] border-gray-200 border-solid rounded-lg p-2">
        <Checkbox className="my-4">{t("committeesCouncils")}</Checkbox>
        <HrDivider />
        <div className="flex items-center justify-between my-2">
          <Checkbox className="mt-2">{t("view")}</Checkbox>
          <Checkbox className="mt-2">{t("add")}</Checkbox>
          <Checkbox className="mt-2">{t("edit")}</Checkbox>
          <Checkbox className="mt-2">{t("delete")}</Checkbox>
        </div>
      </div>
      
    </Form>
  );
}
