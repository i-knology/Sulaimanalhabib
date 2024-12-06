import { useTranslation } from "react-i18next";
import HeaderButton from "./HeaderButton";
import { ReactNode } from "react";
export default function LanguageBtn() {
  const { i18n } = useTranslation();
  const icon :ReactNode=<div className="text-lg">{i18n.language == "ar" ? "En" : "ع"}</div>
  return (
    <HeaderButton
      icon={icon}
      onClick={() => {
        i18n.changeLanguage(i18n.language == "ar" ? "en" : "ar");
        localStorage.setItem("lang", i18n.language);
      }}
    />
  );
}
