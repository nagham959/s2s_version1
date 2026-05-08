import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const PasswordStrengthIndicator = ({ password = "" }) => {
  const { t, language } = useLanguage();
  const isRtl = language === "ar";
  
  const requirements = [
    { regex: /.{8,}/, label: t("passwordStrength.length") || "At least 8 characters" },
    { regex: /[A-Z]/, label: t("passwordStrength.uppercase") || "One uppercase letter" },
    { regex: /[a-z]/, label: t("passwordStrength.lowercase") || "One lowercase letter" },
    { regex: /[0-9]/, label: t("passwordStrength.number") || "One number" },
    { regex: /[^A-Za-z0-9]/, label: t("passwordStrength.special") || "One special character" },
  ];

  if (!password) return null;

  return (
    <div className={`mt-2 flex flex-col gap-1.5 ${isRtl ? "text-right" : "text-left"}`}>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
        {t("passwordStrength.title") || "Password requirements:"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {requirements.map((req, index) => {
          const isValid = req.regex.test(password);
          return (
            <div key={index} className="flex items-center gap-1.5 text-xs">
              {isValid ? (
                <span className="material-symbols-outlined text-[14px] text-green-500">check_circle</span>
              ) : (
                <span className="material-symbols-outlined text-[14px] text-slate-300 dark:text-slate-600">radio_button_unchecked</span>
              )}
              <span className={isValid ? "text-green-600 dark:text-green-400 font-medium" : "text-slate-500 dark:text-slate-400"}>
                {req.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
