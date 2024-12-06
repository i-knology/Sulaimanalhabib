import { Input, InputProps } from "antd";
import { useTranslation } from "react-i18next";
import { LuSearch } from "react-icons/lu";

export default function SearchBox({ placeholder, ...rest }: InputProps) {
  const { t } = useTranslation();
  return (
    <Input
      prefix={
        <LuSearch
          className="text-secondary"
          size={20}
        />
      }
      placeholder={placeholder || t("searchAbout")}
      {...rest}
    />
  );
}
