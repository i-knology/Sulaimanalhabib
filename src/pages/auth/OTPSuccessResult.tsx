import { Typography } from "antd";
import CountDown from "react-countdown";
import { useTranslation } from "react-i18next";

export default function OTP() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 max-w-xl mx-auto w-full">
      <img
        src="/illustrations/success-result.svg"
        width={160}
        height={144}
        className="mx-auto block"
        alt={import.meta.env.VITE_APP_NAME}
      />
      <div className="text-center space-y-2">
        <Typography className="text-[20px] font-medium my-2">
          {t("passwordChangedSuccessfully")}
        </Typography>

        <CountDown
          date={Date.now() + 5 * 1000}
          renderer={({ seconds }) => {
            return (
              <>
                <Typography className="text-gray-500">
                  {t("loginRedirecte")}
                </Typography>
                <span className="font-medium text-black">{seconds} </span>
                <span className="text-gray-500">{t("seconds")}</span>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
