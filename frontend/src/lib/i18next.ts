import en_US from "../locales/en_US.json";
import hu_HU from "../locales/hu_HU.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en_US";
    resources: {
      en_US: typeof en_US;
      hu_HU: typeof hu_HU;
    };
  }
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en_US",
    supportedLngs: ["en_US", "hu_HU"],
    resources: {
      en_US: { translation: en_US },
      hu_HU: { translation: hu_HU },
    },
  });
