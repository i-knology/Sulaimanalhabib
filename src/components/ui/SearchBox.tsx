import { Input, InputProps } from "antd";
import { useTranslation } from "react-i18next";
import SearchIcon from "./SearchIcon";

export default function SearchBox({ placeholder, ...rest }: InputProps) {
  const { t } = useTranslation();
  return (
    <Input
      prefix={<SearchIcon />}
      variant="outlined"
      className="rounded-xl !bg-gray-50"
      placeholder={placeholder || t("searchAbout")}
      {...rest}
    />
  );
}
