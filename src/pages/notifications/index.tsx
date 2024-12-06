import NotificationCard from "@/components/notifications/NotificationCard";
import TopBar from "@/components/ui/TopBar";
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const { t } = useTranslation();
  return (
    <div className="p-2 space-y-2">
      <TopBar text={t("notifications")} />

      {Array.from({length:4}).fill(null).map(()=><NotificationCard />)}
    </div>
  );
}
