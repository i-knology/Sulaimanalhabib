import { useTranslation } from "react-i18next";
import Status from "../ui/Status";

export default function MissionStatus({ id }) {
  const { t } = useTranslation();

  // Determine color and text based on the id
  const getStatusDetails = (id: number) => {
    switch (id) {
      case 3:
        return { color: "#2BB900", text: t("statuses:completed") };
      case 1:
        return { color: "#D10008", text: t("statuses:notStarted") };
      case 5:
        return { color: "#D10008", text: t("statuses:incomplete") };
      default:
        return { color: "#E88A0A", text: t("statuses:ongoing") };
    }
  };

  const { color, text } = getStatusDetails(id);

  return <Status color={color} text={text} />;
}
