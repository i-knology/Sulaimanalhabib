import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();
  return (
    <Card
      className="border-none bg-center bg-cover"
      style={{
        backgroundImage: "url(/banner.png)",
      }}
    >
      <Typography.Title level={4}>
        {t(new Date().getHours() >= 12 ? "goodevening" : "goodmorning")} Mohammed 👋
      </Typography.Title>
      <Typography.Paragraph className="text-base !mb-0">{t("hopeSubtitle")}</Typography.Paragraph>
    </Card>
  );
}
