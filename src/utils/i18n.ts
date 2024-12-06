import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "../localization/ar/index.json";
import en from "../localization/en/index.json";
import cookies from "./cookies";

i18n.use(initReactI18next).init({
  resources: {
    en,
    ar,
  },
  lng: cookies.get("locale") || "ar",
  fallbackLng: "ar",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
