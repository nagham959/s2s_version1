import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/auth/loginSchema";
import { ThemeProvider } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/authContext";
import VideoHelpModal from "../components/VideoHelpModal";
import { useLanguage } from "../contexts/LanguageContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "" },
  });
  const { login, loginWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [helpModal, setHelpModal] = useState({
    open: false,
    title: "",
    videoSrc: "",
    anchorRect: null,
  });
  const { t, language, dir } = useLanguage();
  const textAlignClass = language === "ar" ? "text-right" : "text-left";
  const emailPaddingClass = language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4";
  const emailIconPosition = language === "ar" ? "right-3" : "left-3";
  const passwordPaddingClass = language === "ar" ? "pr-4 pl-12" : "pl-4 pr-12";
  const passwordTogglePosition = language === "ar" ? "left-3" : "right-3";
  const arrowIcon = language === "ar" ? "arrow_back" : "arrow_forward";

  const openHelp = (e, title, videoSrc) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHelpModal({ open: true, title, videoSrc, anchorRect: rect });
  };

  const closeHelp = () =>
    setHelpModal((prev) => ({ ...prev, open: false, anchorRect: null }));

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message || t("login.errorGoogle"));
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setErrorMessage("");
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error) {
      const status = error?.response?.status;
      const errorStr = error?.message?.toLowerCase() || "";
      let message = t("login.errorServer");

      if (status === 401 || errorStr.includes("invalid credential") || errorStr.includes("unauthorized")) {
        message = t("auth.errors.invalidCredentials");
      } else if (errorStr.includes("locked")) {
        message = t("auth.errors.accountLocked");
      } else if (errorStr.includes("verify") || errorStr.includes("verification")) {
        message = t("auth.errors.unverified");
      } else if (status === 503) {
        message = t("login.errorUnavailable");
      } else if (status === 500) {
        message = t("login.errorInternal");
      } else {
        message = t("common.error");
      }
      setIsLoading(false);
      setErrorMessage(message);
    }
  };

  return (
    <ThemeProvider>
      <div
        dir={dir}
        className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display antialiased transition-colors duration-300"
      >
        <VideoHelpModal
          open={helpModal.open}
          onClose={closeHelp}
          title={helpModal.title}
          videoSrc={helpModal.videoSrc}
          anchorRect={helpModal.anchorRect}
        />
        <Navbar variant="auth" logo="S2S" />

        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-[#F2593D]/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative w-full max-w-[440px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl border border-border-light dark:border-border-dark z-10 overflow-hidden flex flex-col transition-colors">
            <div className="pt-8 px-8 pb-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                {t("login.welcome")}
              </h2>
              <p className="text-slate-500 dark:text-text-secondary text-sm">
                {t("login.subtitle")}
              </p>
            </div>

            <div className="px-8 mt-6 w-full">
              <div className="flex w-full bg-slate-100 dark:bg-black/20 p-1 rounded-xl">
                <div className="flex-1 rounded-lg bg-white dark:bg-[#2a2a2a] shadow-sm transition-all flex items-center justify-center gap-1.5 px-2 py-2">
                  <span className="text-primary font-bold text-sm">
                    {t("login.loginTab")}
                  </span>
                  <button
                    type="button"
                    onClick={(e) =>
                      openHelp(e, t("login.helpLogin"), "/videos/hello.mp4")
                    }
                    aria-label={t("help.openExample")}
                    className="flex items-center justify-center text-primary hover:text-primary-hover transition-colors"
                  >
                    <i className="fa-solid fa-hands-asl-interpreting text-sm"></i>
                  </button>
                </div>
                <div className="flex-1 rounded-lg flex items-center justify-center gap-1.5 px-2 py-2">
                  <Link
                    to="/signup"
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-sm transition-colors"
                  >
                    {t("login.signupTab")}
                  </Link>
                  <button
                    type="button"
                    onClick={(e) =>
                      openHelp(e, t("login.helpSignup"), "/videos/hello.mp4")
                    }
                    aria-label={t("help.openExample")}
                    className="flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                  >
                    <i className="fa-solid fa-hands-asl-interpreting text-sm"></i>
                  </button>
                </div>
              </div>
            </div>

            <form
              className="p-8 flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="flex flex-col gap-2 group">
                <span className="text-sm font-medium text-slate-700 dark:text-white">
                  {t("login.email")}
                </span>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      className={`w-full h-12 rounded-xl border ${errors.email ? "border-red-500" : "border-border-light dark:border-border-dark"} bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base ${emailPaddingClass} ${textAlignClass}`}
                      placeholder={t("login.emailPlaceholder")}
                      type="email"
                      {...register("email")}
                    />
                    <div
                      className={`absolute ${emailIconPosition} top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        mail
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) =>
                      openHelp(e, t("login.helpEmail"), "/videos/hello.mp4")
                    }
                    aria-label={t("help.openExample")}
                    className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 hover:bg-primary/10 transition-colors shadow-sm"
                  >
                    <i className="fa-solid fa-hands-asl-interpreting text-xl text-primary"></i>
                  </button>
                </div>
              </label>

              <label className="flex flex-col gap-2 group">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-white">
                    {t("login.password")}
                  </span>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-primary hover:text-primary-hover hover:underline"
                  >
                    {t("login.forgot")}
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex items-center flex-1">
                    <input
                      className={`w-full h-12 rounded-xl border ${errors.password ? "border-red-500" : "border-border-light dark:border-border-dark"} bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base ${passwordPaddingClass} ${textAlignClass}`}
                      placeholder={t("login.passwordPlaceholder")}
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />

                    <button
                      className={`absolute ${passwordTogglePosition} top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded`}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={(e) =>
                      openHelp(e, t("login.helpPassword"), "/videos/hello.mp4")
                    }
                    className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 hover:bg-primary/10 transition-colors shadow-sm"
                  >
                    <i className="fa-solid fa-hands-asl-interpreting text-xl text-primary"></i>
                  </button>
                </div>
              </label>

              {errors.email?.message && (
                <div className="text-sm text-red-600 mt-1">
                  {t(errors.email.message)}
                </div>
              )}
              {errors.password?.message && (
                <div className="text-sm text-red-600 mt-1">
                  {t(errors.password.message)}
                </div>
              )}
              {!!errorMessage?.trim() && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-600">
                  {errorMessage}
                </div>
              )}

              <button
                className="w-full h-12 mt-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                type="submit"
                disabled={isLoading}
              >
                <span>
                  {isLoading ? t("login.submitting") : t("login.submit")}
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  {arrowIcon}
                </span>
              </button>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-light dark:border-border-dark"></div>
                </div>
                <div className="relative bg-surface-light dark:bg-surface-dark px-4">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {t("login.or")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-[#2a2a2a] transition-all font-semibold text-slate-700 dark:text-slate-200"
                  type="button"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>{t("login.google")}</span>
                </button>

                <button
                  className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-[#2a2a2a] transition-all font-semibold text-slate-700 dark:text-slate-200"
                  type="button"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#1877F2" />
                  </svg>
                  <span>{t('login.facebook')}</span>
                </button>
              </div>
            </form>
            <div className="bg-slate-50 dark:bg-black/40 px-8 py-5 border-t border-border-light dark:border-border-dark text-center">
              <p className="text-sm text-slate-500">
                {t("login.noAccount")}
                <Link
                  to="/signup"
                  className="font-bold text-primary hover:underline ml-1"
                >
                  {t("login.signupLink")}
                </Link>
              </p>
            </div>
          </div>
        </main>
        <Footer variant="auth" />
      </div>
    </ThemeProvider>
  );
};

export default LoginPage;
