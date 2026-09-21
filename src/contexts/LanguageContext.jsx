import { createContext, useContext, useState, useEffect, useCallback } from "react";
import ar from "../locales/ar";
import en from "../locales/en";

const translations = { ar, en };

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  // Read from URL param first, then localStorage, then default "ar"
  const getInitialLang = () => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "en" || urlLang === "ar") return urlLang;
    const stored = localStorage.getItem("site_lang");
    if (stored === "en" || stored === "ar") return stored;
    return "ar";
  };

  const [lang, setLang] = useState(getInitialLang);

  // Apply document-level direction/lang and persist
  useEffect(() => {
    const isRTL = lang === "ar";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    document.body.setAttribute("dir", isRTL ? "rtl" : "ltr");
    localStorage.setItem("site_lang", lang);
  }, [lang]);

  // Also sync URL param when language changes
  const switchLang = useCallback((newLang) => {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);
    window.history.replaceState({}, "", url.toString());
    setLang(newLang);
  }, []);

  // Listen to URL changes (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "en" || urlLang === "ar") {
        setLang(urlLang);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang: switchLang, t, isRTL: lang === "ar" }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
};

export default LanguageContext;
