import { useTranslation } from "react-i18next";
import Status from "../ui/Status";

export default function CommitteeStatus({ committee }) {
  const { i18n } = useTranslation();
  return (
    <Status
      color={
        committee?.typeInfo?.id == 3
          ? "#E88A0A"
          : committee?.typeInfo?.id == 2
          ? "#4CADCF"
          : "#1A704B"
      }
      text={
        i18n.language == "ar"
          ? (committee?.typeInfo?.nameAr || "-")
          : (committee?.typeInfo?.nameEn || "-")
      }
      className="mx-2"
    />
  );
}
