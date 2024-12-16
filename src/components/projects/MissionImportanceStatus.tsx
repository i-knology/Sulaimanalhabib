import { useTranslation } from "react-i18next";

export default function MissionImportanceStatus({ id }) {
  const { t } = useTranslation();

  // Determine color and text based on the id
  const getStatusDetails = (id: number) => {
    switch (id) {
      case 1:
        return { color: "#FEF7F7", textColor: "#D10008", text: t("statuses:high") };
      case 2:
        return { color: "#FEFAF7", textColor: "#E88A0A", text: t("statuses:medium") };
      case 3:
        return { color: "#F4F4F4", textColor: "#7B7B7B", text: t("statuses:low") };
      default:
        return { color: "#7B7B7B", textColor: "#7B7B7B", text: t("statuses:ongoing") };
    }
  };

  const { color, text, textColor } = getStatusDetails(id);

  return (
    <p
      className={`bg-[${color}] px-3 py-2  flex justify-center items-center rounded-lg`}
      style={{ color: textColor }}
    >
      {text}
    </p>
  );
}
