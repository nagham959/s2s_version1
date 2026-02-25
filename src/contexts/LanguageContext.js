import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const LanguageContext = createContext(null);
const translations = { en, ar };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "ar";
    return localStorage.getItem("language") || "ar";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = language === "ar" ? "ar" : "en";
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
  }, [language]);

  const t = useCallback(
    (key, fallback) => {
      const parts = key.split(".");
      let value = translations[language];
      for (const part of parts) {
        value = value?.[part];
      }
      if (value !== undefined && value !== null) return value;
      return fallback || key;
    },
    [language],
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  const value = useMemo(
    () => ({
      language,
      dir: language === "ar" ? "rtl" : "ltr",
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language, t, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
};
