import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const ErrorMessage = ({ messageKey, message, fallback, className = "" }) => {
  const { t, dir } = useLanguage();
  const text = messageKey ? t(messageKey, fallback || message) : message || fallback || "";

  if (!text || !String(text).trim()) return null;

  return (
    <div
      dir={dir}
      role="alert"
      aria-live="polite"
      className={`rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-300 ${className}`}
    >
      <div className="flex items-start gap-2">
        <span className="material-symbols-outlined text-base leading-5" aria-hidden="true">
          error
        </span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
