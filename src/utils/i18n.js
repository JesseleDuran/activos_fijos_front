import i18n from "i18next";
import XHR from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const options = {
  	fallbackLng: "en",
	debug: false,
	// react i18next special options (optional)
	react: {
		wait: true,
		bindI18n: "languageChanged loaded",
		bindStore: "added removed",
		nsMode: "default",
	},
};

i18n.use(XHR).use(LanguageDetector);

export default i18n.init(options);
