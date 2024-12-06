import { useTranslation } from "react-i18next";

export default function TaskRange() {
  const { t } = useTranslation();
  return (
    <>
      <div>
        <p className="flex items-center w-full">
          <span className="text-primary">{t("taskPoints")}</span>
          <span className="p-2 rounded-full mx-[15%] bg-gray-100">30 %</span>
        </p>

        <div className="w-full h-2 my-2 bg-gray-50 rounded-full relative">
          <div className="absolute inset-0 w-[30%] bg-gradient-to-r from-primary/[0.92] to-secondary/[0.92] rounded-full" />
        </div>
      </div>
    </>
  );
}
