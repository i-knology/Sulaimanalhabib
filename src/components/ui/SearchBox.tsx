import { Input, InputProps } from "antd";
import { useTranslation } from "react-i18next";
import { LuSearch } from "react-icons/lu";
import SearchIcon from "./SearchIcon";

export default function SearchBox({ placeholder, ...rest }: InputProps) {
  const { t } = useTranslation();
  return (
    <Input
      
      prefix={
        <SearchIcon />
      }
      placeholder={placeholder || t("searchAbout")}
      {...rest}
    />
  );
}
