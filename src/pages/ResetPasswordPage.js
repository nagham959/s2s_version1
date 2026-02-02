import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/authContext";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const token = params.get("token") || params.get("Token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    if (!token) return "رابط إعادة التعيين غير صالح أو ناقص (token).";
    if (!newPassword) return "يرجى إدخال كلمة المرور الجديدة.";
    if (newPassword.length < 8) return "يجب أن تتكون كلمة المرور من 8 خانات على الأقل.";
    if (confirmPassword !== newPassword) return "كلمتا المرور غير متطابقتين.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const v = validate();
    if (v) return setErrorMessage(v);

    setIsLoading(true);
    try {
      await resetPassword({ token, newPassword, confirmPassword });
      setSuccessMessage("تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setErrorMessage(err?.message || "حدث خطأ، حاول مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display antialiased transition-colors duration-300">
        <Navbar variant="auth" logo="SignaryAI" />

        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-[#F2593D]/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative w-full max-w-[440px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl border border-border-light dark:border-border-dark z-10 overflow-hidden flex flex-col transition-colors">
            <div className="pt-8 px-8 pb-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                إعادة تعيين كلمة المرور
              </h2>
              <p className="text-slate-500 dark:text-text-secondary text-sm">
                أدخل كلمة مرور جديدة لحسابك.
              </p>
            </div>

            <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              {!token && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-600"
                >
                  رابط إعادة التعيين غير صالح أو ناقص (token).
                </div>
              )}

              <label className="flex flex-col gap-2 group">
                <span className="text-sm font-medium text-slate-700 dark:text-white">كلمة المرور الجديدة</span>

                <div className="relative flex items-center">
                  <input
                    className="w-full h-12 pr-4 pl-12 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right"
                    placeholder="أدخل كلمة المرور الجديدة"
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errorMessage) setErrorMessage("");
                      if (successMessage) setSuccessMessage("");
                    }}
                  />

                  <button
                    aria-label="Toggle password visibility"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded focus-visible-ring"
                    type="button"
                    onClick={() => setShowNew((p) => !p)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showNew ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-1 mt-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                  <span className="material-symbols-outlined text-[14px] text-text-secondary">info</span>
                  <span className="text-xs text-text-secondary">يجب أن تتكون من 8 خانات على الأقل.</span>
                </div>
              </label>

              <label className="flex flex-col gap-2 group">
                <span className="text-sm font-medium text-slate-700 dark:text-white">تأكيد كلمة المرور</span>

                <div className="relative flex items-center">
                  <input
                    className="w-full h-12 pr-4 pl-12 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right"
                    placeholder="أعد إدخال كلمة المرور"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errorMessage) setErrorMessage("");
                      if (successMessage) setSuccessMessage("");
                    }}
                  />

                  <button
                    aria-label="Toggle password visibility"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded focus-visible-ring"
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirm ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </label>

              {!!errorMessage?.trim() && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-600"
                >
                  {errorMessage}
                </div>
              )}

              {!!successMessage?.trim() && (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm text-green-600">
                  {successMessage}
                </div>
              )}

              <button
                className="w-full h-12 mt-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-[#F2593D]/20 hover:shadow-[#F2593D]/40 transition-all active:scale-[0.98] focus-visible-ring flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading || !token}
              >
                <span>{isLoading ? "جاري التغيير..." : "تغيير كلمة المرور"}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              </button>
            </form>

            <div className="bg-slate-50 dark:bg-black/40 px-8 py-5 border-t border-border-light dark:border-border-dark text-center">
              <p className="text-sm text-slate-500 dark:text-text-secondary">
                رجوع إلى{" "}
                <Link to="/login" className="font-bold text-primary hover:text-primary-hover hover:underline focus-visible-ring rounded mr-1">
                  تسجيل الدخول
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

export default ResetPasswordPage;
