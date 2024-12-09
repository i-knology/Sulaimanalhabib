import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import "@/assets/styles/auth.css";
import { Outlet } from "react-router-dom";

// import {  } from "react-icons/lu";

export default function AuthWrapper() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-dvh bg-white">
      <div className="p-8 flex items-center justify-center">
        <Outlet />
      </div>

      <div className="bg-[url(/auth-bg.svg)] bg-cover bg-no-repeat hidden md:block">
        <div className="w-full h-full bg-gradient-to-t from-primary/[0.92] to-secondary/[0.92] flex items-end justify-center">
          <div className="space-y-4 w-full max-w-lg mx-auto text-center p-6 pb-20">
            <a
              href={import.meta.env.VITE_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={import.meta.env.VITE_APP_NAME}
              aria-label={import.meta.env.VITE_APP_NAME}
              className="mx-auto table mb-8"
            >
              <img
                src="/logo.png"
                width={180}
                // height={78}
                alt={import.meta.env.VITE_APP_NAME}
              />
            </a>
            <div className="space-y-2">
              <Typography className="text-white text-xl">{t("authTitle")}</Typography>
              <Typography className="text-white/80 font-light">{t("authSubtitle")}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
