import Color from "color";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export default function StatusCard({
  color,
  text,
  icon,
  isActive,
  onClick,
}: {
  color: string;
  text: string;
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  console.log(isActive);

  return (
    <button
      onClick={onClick}
      className={
        "bg-white p-4 rounded-lg " +
        (isActive ? "border-solid border-[2px] border-gray-300" : "border-none")
      }
    >
      <div className="flex items-center flex-col">
        {icon}
        <p className="mt-3 text-gray-500 flex items-center">
          {t(text)}
          <span
            className="px-2 py-1 rounded-full mx-1"
            style={{
              color: color,
              backgroundColor: Color(color).alpha(0.1).string(),
            }}
          >
            77
          </span>
        </p>
      </div>
    </button>
  );
}
