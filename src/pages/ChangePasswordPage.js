import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../validations/auth/changePasswordSchema.js";
import { ThemeProvider } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PasswordStrengthIndicator from "../components/PasswordStrengthIndicator";
import { useAuth } from "../contexts/authContext.js";
import { useLanguage } from "../contexts/LanguageContext";
import ErrorMessage from "../components/ErrorMessage";
import LoadingButton from "../components/LoadingButton";
import { getErrorMessageKey } from "../utils/normalizeApiError";

const ChangePasswordPage = () => {
  const { changePassword } = useAuth();
  const { t, language, dir } = useLanguage();
  const isRtl = language === "ar";
  const textStart = isRtl ? "text-right" : "text-left";
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (data) => {
    setApiError("");
    setSuccess("");

    try {
      await changePassword(
        data.currentPassword,
        data.newPassword,
        data.confirmPassword,
      );

      setSuccess(t("changePassword.success"));
      reset();
    } catch (err) {
      setApiError(getErrorMessageKey(err, { defaultMessageKey: "errors.unknown" }));
    }
  };

    return (
        <ThemeProvider>
            <div
                dir={dir}
                className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-white"
            >
                <Navbar
                    variant="dashboard"
                    logo="SignaryAI"
                    userProfile="https://lh3.googleusercontent.com/aida-public/AB6AXuDGZQ2Lpmsf2wWPOWbV1NwlSV8apne6XJ1_XsdsDMPhMvbqdiB66HO7PwhmU_DZTGa6XlUQi5NVf0ujJTsRg4xtUU-6Wpwu1Szn_yfiAymfFaKdYMd8GtdBtqSVa2dEtUo31mAq1yjcN548LRNthF2qQ3SvvYs8XgIPbGqY_6lqeleuYwzMPOEvLLIY7inFcwQ0YfJMkt5hTPtZRHcnrLG52YPO27f3HamgyAdtmNaRMhqerd6BtQXWBQd7qpEIe_cy5RZwIEhYib8"
                />
                <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                    <div className="max-w-xl mx-auto">
                        <h1 className={`text-2xl font-bold mb-6 text-slate-900 dark:text-white text-center ${textStart}`}>
                            {t('changePassword.title')}
                        </h1>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
              <ErrorMessage messageKey={apiError} className="mb-6" />
              {success && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl text-sm font-medium flex items-center gap-2 border border-green-100 dark:border-green-800">
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                  {success}
                </div>
              )}

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
              >
                <div>
                  <label
                    className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 ${textStart}`}
                  >
                    {t("changePassword.fields.current")}
                  </label>
                  <input
                    type="password"
                    {...register("currentPassword")}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.currentPassword ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none disabled:opacity-50 ${textStart}`}
                    placeholder={t("changePassword.placeholders.current")}
                  />
                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {t(errors.currentPassword.message)}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 ${textStart}`}
                  >
                    {t("changePassword.fields.new")}
                  </label>
                  <input
                    type="password"
                    {...register("newPassword")}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.newPassword ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none disabled:opacity-50 ${textStart}`}
                    placeholder={t("changePassword.placeholders.new")}
                  />
                  <PasswordStrengthIndicator password={watch("newPassword")} />
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {t(errors.newPassword.message)}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 ${textStart}`}
                  >
                    {t("changePassword.fields.confirm")}
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword")}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none disabled:opacity-50 ${textStart}`}
                    placeholder={t("changePassword.placeholders.confirm")}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {t(errors.confirmPassword.message)}
                    </p>
                  )}
                </div>

                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  loadingText={t("loading.changingPassword")}
                  className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:translate-y-0.5 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {t("changePassword.submit")}
                </LoadingButton>
              </form>
            </div>
          </div>
        </main>
        <Sidebar variant="mobile" activeItem="settings" />
      </div>
    </ThemeProvider>
  );
};

export default ChangePasswordPage;
