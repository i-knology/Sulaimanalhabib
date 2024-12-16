import { ConfigProvider } from "antd";
import ar_eg from "antd/locale/ar_EG";
import en_us from "antd/locale/en_US";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Routes from "./routes";
import lightTheme from "./theme/light";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import dayjsAr from "dayjs/locale/ar";
import dayjsEn from "dayjs/locale/en";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Provider } from "react-redux";
import { ResultContextProvider } from "./contexts/ModalContext";
import store from "./redux/store";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Riyadh");
dayjs.extend(customParseFormat);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});
export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    changeLanguage();
    changeDayJsLocale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  function changeLanguage() {
    const lang = i18n.language;
    const dir = lang == "ar" ? "rtl" : "ltr";

    document.querySelector("html")?.setAttribute("dir", dir);
    document.querySelector("html")?.setAttribute("lang", lang);
  }

  function changeDayJsLocale() {
    dayjs.locale(
      i18n.language == "ar"
        ? ({
            ...dayjsAr,

            meridiem: (h) => (h >= 12 ? "م" : "ص"),
          } as any)
        : dayjsEn,
    );
  }

  return (
    <Provider store={store}>
      <ResultContextProvider>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={lightTheme}
            direction={i18n.language == "ar" ? "rtl" : "ltr"}
            locale={i18n.language == "ar" ? ar_eg : en_us}
            input={{
              autoComplete: "off",
              allowClear: false,
              className: "rounded-xl",
            }}
            button={{
              className: "rounded-xl",
            }}
          >
            <Routes />
          </ConfigProvider>
        </QueryClientProvider>
      </ResultContextProvider>
    </Provider>
  );
}
