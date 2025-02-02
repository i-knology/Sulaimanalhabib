import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "../localization/ar/index.json";
import en from "../localization/en/index.json";

i18n.use(initReactI18next).init({
  resources: {
    en,
    ar,
  },
  lng: localStorage.getItem("locale") || "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

