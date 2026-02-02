import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/authContext";

// validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const cleanEmail = email.trim();
    if (!cleanEmail) return setErrorMessage("يرجى إدخال البريد الإلكتروني.");
    if (!isValidEmail(cleanEmail)) return setErrorMessage("يرجى إدخال بريد إلكتروني صالح.");

    setIsLoading(true);
    try {
      await forgotPassword(cleanEmail);

      setSuccessMessage("إذا كان البريد مسجلًا لدينا، سيتم إرسال رابط/كود لإعادة تعيين كلمة المرور خلال دقائق.");
      setTimeout(() => navigate("/login"), 2500);
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
                نسيت كلمة المرور؟
              </h2>
              <p className="text-slate-500 dark:text-text-secondary text-sm">
                اكتب بريدك الإلكتروني وسنرسل لك رابط/كود لإعادة تعيين كلمة المرور.
              </p>
            </div>

            <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2 group">
                <span className="text-sm font-medium text-slate-700 dark:text-white">البريد الإلكتروني</span>

                <div className="relative">
                  <input
                    className="w-full h-12 pr-10 pl-4 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right"
                    placeholder="name@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                      if (successMessage) setSuccessMessage("");
                    }}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
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
                disabled={isLoading}
              >
                <span>{isLoading ? "جاري الإرسال..." : "إرسال رابط/كود"}</span>
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

export default ForgotPasswordPage;
