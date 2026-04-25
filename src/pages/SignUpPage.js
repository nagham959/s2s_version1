import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VideoHelpModal from "../components/VideoHelpModal";
import { useLanguage } from "../contexts/LanguageContext";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://api.s2sai.online";


const SignUpPage = () => {
  const navigate = useNavigate();
  const { t, language, dir } = useLanguage();
  const isRtl = language === "ar";
  const textStart = isRtl ? "text-right" : "text-left";
  const passwordPadding = isRtl ? 'pr-4 pl-12' : 'pl-4 pr-12';
  const passwordTogglePosition = isRtl ? 'left-3' : 'right-3';

  const [form, setForm] = useState({
    displayName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    userType: 1, 
    usesSignLanguage: false,
    signLanguage: 1, 
    password: "",
    confirmPassword: "",
    gender: "", 
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [helpModal, setHelpModal] = useState({ open: false, title: '', videoSrc: '', anchorRect: null });
  const openHelp = (e, title, videoSrc) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHelpModal({ open: true, title, videoSrc, anchorRect: rect });
  };
  const closeHelp = () => setHelpModal(prev => ({ ...prev, open: false, anchorRect: null }));

  // sign-language help button — logo icon, sits on the LEFT of the input (last in flex = left in RTL)
  const HelpBtn = ({ label, videoSrc }) => (
    <button
      type="button"
      onClick={(e) => openHelp(e, label, videoSrc)}
      aria-label={`${t('help.openExample')}: ${label}`}
      className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 hover:bg-primary/10 transition-colors shadow-sm"
    >
      <i className="fa-solid fa-hands-asl-interpreting text-xl text-primary"></i>
    </button>
  );

  const canSubmit = useMemo(() => {
    return (
      form.displayName.trim() &&
      form.email.trim() &&
      form.dateOfBirth &&
      form.phoneNumber.trim() &&
      form.password &&
      form.confirmPassword
    );
  }, [form]);

  const setValue = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (formError) setFormError("");

    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const validate = () => {
    const errs = {};

    if (!form.displayName.trim()) errs.displayName = t("signUp.errors.displayNameRequired");

    if (!form.email.trim()) errs.email = t("signUp.errors.emailRequired");
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = t("signUp.errors.emailInvalid");

    if (!form.dateOfBirth) errs.dateOfBirth = t("signUp.errors.dobRequired");
    else {
      const dob = new Date(form.dateOfBirth);
      const today = new Date();
      if (dob > today) errs.dateOfBirth = t("signUp.errors.dobInvalid");
    }

    // phone validation
    const phone = (form.phoneNumber || "").trim().replace(/\s|-/g, "");
    if (!phone) {
      errs.phoneNumber = t("signUp.errors.phoneRequired");
    } else {
      const okEgyptLocal = /^\d{11}$/.test(phone);
      const okEgyptIntl = /^\+20\d{10}$/.test(phone);
      const okGeneric = /^\+?\d{10,15}$/.test(phone);
      if (!(okEgyptLocal || okEgyptIntl || okGeneric)) {
        errs.phoneNumber = t("signUp.errors.phoneInvalid");
      }
    }

    if (!form.password) {
      errs.password = t("signUp.errors.passwordRequired");
    } else if (form.password.length < 8) {
      errs.password = t("signUp.errors.passwordShort");
    } else if (!/[A-Z]/.test(form.password)) {
      errs.password = t("signUp.errors.passwordUpper");
    } else if (!/[a-z]/.test(form.password)) {
      errs.password = t("signUp.errors.passwordLower");
    } else if (!/[0-9]/.test(form.password)) {
      errs.password = t("signUp.errors.passwordDigit");
    } else if (!/[@$!%*?& #]/.test(form.password)) {
      errs.password = t("signUp.errors.passwordSpecial");
    }

    if (form.confirmPassword !== form.password) {
      errs.confirmPassword = t("signUp.errors.confirmMismatch");
    }

    return errs;
  };

  const RegisterErrorHandler = async (res) => {
    const rawText = await res.text();

    let data = null;
    try { data = rawText ? JSON.parse(rawText) : null; } catch {}

    const rawMsg = (data?.message || data?.title || rawText || "").toString();
    const m = rawMsg.toLowerCase();

    const fieldErrors = {};
    if (data?.errors && typeof data.errors === "object") {
      for (const [key, val] of Object.entries(data.errors)) {
        const first = Array.isArray(val) ? val[0] : String(val ?? "");
        const k = String(key).toLowerCase();

        if (k.includes("email")) fieldErrors.email = first;
        else if (k.includes("phone")) fieldErrors.phoneNumber = first;
        else if (k.includes("password")) fieldErrors.password = first;
        else if (k.includes("date")) fieldErrors.dateOfBirth = first;
        else fieldErrors[key] = first;
      }
    }

    const emailDup =
      (m.includes("email") || m.includes("e-mail")) &&
      (m.includes("exist") || m.includes("already") || m.includes("duplicate") || m.includes("taken") || m.includes("used"));

    const phoneDup =
      (m.includes("phone") || m.includes("phonenumber") || m.includes("mobile")) &&
      (m.includes("exist") || m.includes("already") || m.includes("duplicate") || m.includes("taken") || m.includes("used"));

    let message = t("signUp.errors.unexpected");

    if (res.status === 503) message = t("signUp.errors.serverUnavailable");
    else if (emailDup) message = t("signUp.errors.emailDup");
    else if (phoneDup) message = t("signUp.errors.phoneDup");
    else if (res.status === 400) message = t("signUp.errors.badRequest");
    else if (m.includes("invalid")) message = t("signUp.errors.invalidData");

    if (emailDup && !fieldErrors.email) fieldErrors.email = t("signUp.errors.emailDup");
    if (phoneDup && !fieldErrors.phoneNumber) fieldErrors.phoneNumber = t("signUp.errors.phoneDup");

    return { message, fieldErrors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        email: form.email.trim(),
        displayName: form.displayName.trim(),
        dateOfBirth: form.dateOfBirth,
        userName: (form.userName || "").trim() || form.email.split("@")[0],
        password: form.password,
        phoneNumber: (form.phoneNumber || "").trim(),
        userType: Number(form.userType),
        usesSignLanguage: Boolean(form.usesSignLanguage),
        signLanguage: Number(form.signLanguage),
      };

      const res = await fetch(`${API_BASE_URL}/api/v1/Auth/Register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const { message, fieldErrors: apiFieldErrors } = await RegisterErrorHandler(res);

        if (apiFieldErrors && Object.keys(apiFieldErrors).length > 0) {
          setFieldErrors((prev) => ({ ...prev, ...apiFieldErrors }));
        }

        setFormError(message);
        return;
      }

      // if rigestred successfully navigate to verify page
      navigate("/verifyEmail", { state: { email: form.email.trim() } });
    } catch (err) {
      console.error(err);
      setFormError(t("signUp.errors.serverUnavailable"));
    } finally {
      setSubmitting(false);
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
        <Navbar variant="auth" logo="SignaryAI" />

        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-[#F2593D]/10 rounded-full blur-[100px]"></div>
          </div>

          <div className="relative w-full max-w-[520px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl border border-border-light dark:border-border-dark z-10 overflow-hidden flex flex-col transition-colors">
            <div className="pt-8 px-8 pb-2 text-center">
              <h2 className={`text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 ${textStart}`}>
                {t("signUp.hero.title")}
              </h2>
              <p className={`text-slate-500 dark:text-text-secondary text-sm ${textStart}`}>
                {t("signUp.hero.subtitle")}
              </p>
            </div>

            <div className="px-8 mt-6 w-full">
              <div className="flex w-full bg-slate-100 dark:bg-black/20 p-1 rounded-xl">
                <div className="flex-1 rounded-lg flex items-center justify-center gap-1.5 px-2 py-2">
                  <Link to="/login" className={`text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-sm transition-colors ${textStart}`}>
                    {t("signUp.tabs.login")}
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => openHelp(e, t('signUp.tabs.login'), '/videos/hello.mp4')}
                    aria-label={t('help.openExample')}
                    className="flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
                  >
                    <i className="fa-solid fa-hands-asl-interpreting text-sm"></i>
                  </button>
                </div>
                <div className="flex-1 rounded-lg bg-white dark:bg-[#2a2a2a] shadow-sm transition-all flex items-center justify-center gap-1.5 px-2 py-2">
                  <span className="text-primary font-bold text-sm">{t("signUp.tabs.signup")}</span>
                  <button
                    type="button"
                    onClick={(e) => openHelp(e, t('signUp.tabs.signup'), '/videos/hello.mp4')}
                    aria-label={t('help.openExample')}
                    className="flex items-center justify-center text-primary hover:text-primary-hover transition-colors"
                  >
                    <i className="fa-solid fa-hands-asl-interpreting text-sm"></i>
                  </button>
                </div>
              </div>
            </div>

            <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              {!!formError?.trim() && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-600"
                >
                  {formError}
                </div>
              )}

              {/* الاسم الكامل */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textStart}`} htmlFor="displayName">
                  {t("signUp.fields.displayName")} <span className="text-red-500 text-xs">{t("signUp.required")}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="displayName"
                    className={`flex-1 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${textStart}`}
                    placeholder={t("signUp.placeholders.displayName")}
                    value={form.displayName}
                    onChange={(e) => setValue("displayName", e.target.value)}
                  />
                  <HelpBtn label={t("signUp.fields.displayName")} videoSrc="/videos/hello.mp4" />
                </div>
                {fieldErrors.displayName && (
                  <span className="text-xs text-red-600">{fieldErrors.displayName}</span>
                )}
              </div>

              {/* اسم المستخدم */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textStart}`} htmlFor="userName">
                  {t("signUp.fields.userName")} <span className="text-slate-400 text-xs">{t("signUp.optional")}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="userName"
                    className={`flex-1 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${textStart}`}
                    placeholder={t("signUp.placeholders.userName")}
                    value={form.userName}
                    onChange={(e) => setValue("userName", e.target.value)}
                  />
                  <HelpBtn label={t("signUp.fields.userName")} videoSrc="/videos/hello.mp4" />
                </div>
              </div>

              {/* البريد الإلكتروني */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textStart}`} htmlFor="email">
                  {t("signUp.fields.email")} <span className="text-red-500 text-xs">{t("signUp.required")}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="email"
                    className={`flex-1 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${textStart}`}
                    placeholder={t("signUp.placeholders.email")}
                    type="email"
                    value={form.email}
                    onChange={(e) => setValue("email", e.target.value)}
                  />
                  <HelpBtn label={t("signUp.fields.email")} videoSrc="/videos/hello.mp4" />
                </div>
                {fieldErrors.email && <span className="text-xs text-red-600">{fieldErrors.email}</span>}
              </div>

              {/* رقم الهاتف */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textStart}`} htmlFor="phoneNumber">
                  {t("signUp.fields.phoneNumber")} <span className="text-red-500 text-xs">{t("signUp.required")}</span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="phoneNumber"
                    className={`flex-1 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${textStart}`}
                    placeholder={t("signUp.placeholders.phoneNumber")}
                    value={form.phoneNumber}
                    onChange={(e) => setValue("phoneNumber", e.target.value)}
                    dir="ltr"
                  />
                  <HelpBtn label={t("signUp.fields.phoneNumber")} videoSrc="/videos/hello.mp4" />
                </div>
                {fieldErrors.phoneNumber && (
                  <span className="text-xs text-red-600">{fieldErrors.phoneNumber}</span>
                )}
              </div>

              {/* النوع + تاريخ الميلاد */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textStart}`} htmlFor="gender">
                    {t("signUp.fields.gender")}
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      id="gender"
                      className={`flex-1 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${textStart} appearance-none`}
                      value={form.gender}
                      onChange={(e) => setValue("gender", e.target.value)}
                    >
                      <option value="">{t("signUp.options.choose")}</option>
                      <option value="male">{t("signUp.options.male")}</option>
                      <option value="female">{t("signUp.options.female")}</option>
                    </select>
                    <HelpBtn label={t("signUp.fields.gender")} videoSrc="/videos/hello.mp4" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textStart}`} htmlFor="dateOfBirth">
                    {t("signUp.fields.dateOfBirth")} <span className="text-red-500 text-xs">{t("signUp.required")}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="dateOfBirth"
                      className={`flex-1 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${textStart}`}
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) => setValue("dateOfBirth", e.target.value)}
                    />
                    <HelpBtn label={t("signUp.fields.dateOfBirth")} videoSrc="/videos/hello.mp4" />
                  </div>
                  {fieldErrors.dateOfBirth && (
                    <span className="text-xs text-red-600">{fieldErrors.dateOfBirth}</span>
                  )}
                </div>
              </div>

              {/* نوع المستخدم  */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textStart}`} htmlFor="userType">
                  {t("signUp.fields.userType")}
                </label>
                <div className="flex items-center gap-2">
                  <select
                    id="userType"
                    className={`flex-1 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${textStart} appearance-none`}
                    value={form.userType}
                    onChange={(e) => setValue("userType", Number(e.target.value))}
                  >
                    <option value={1}>{t("signUp.options.userDeaf")}</option>
                    <option value={2}>{t("signUp.options.userHearing")}</option>
                  </select>
                  <HelpBtn label={t("signUp.fields.userType")} videoSrc="/videos/hello.mp4" />
                </div>
              </div>

              {/* لغة الإشارة */}
              <div className="flex items-center gap-3 mt-2">
                <input
                  type="checkbox"
                  id="usesSignLanguage"
                  checked={form.usesSignLanguage}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setValue("usesSignLanguage", checked);
                    if (!checked) setValue("signLanguage", 1);
                  }}
                  className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 text-primary focus:ring-primary cursor-pointer"
                />
                <label
                  htmlFor="usesSignLanguage"
                  className={`text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none ${textStart}`}
                >
                  {t("signUp.fields.usesSignLanguage")}
                </label>
              </div>

              {form.usesSignLanguage && (
                <div className="flex flex-col gap-1.5">
                  <label className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textStart}`} htmlFor="signLanguage">
                    {t("signUp.fields.signLanguage")}
                  </label>
                  <select
                    id="signLanguage"
                    className={`h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${textStart} appearance-none`}
                    value={form.signLanguage}
                    onChange={(e) => setValue("signLanguage", Number(e.target.value))}
                  >
                    <option value={1}>{t("signUp.options.defaultSignLanguage")}</option>
                  </select>
                </div>
              )}

              {/* كلمة المرور */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textStart}`} htmlFor="password">
                  {t("signUp.fields.password")} <span className="text-red-500 text-xs">{t("signUp.required")}</span>
                </label>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      id="password"
                      className={`h-11 w-full rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${textStart} ${passwordPadding}`}
                      placeholder={t("signUp.placeholders.password")}
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setValue("password", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className={`absolute inset-y-0 ${passwordTogglePosition} flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300`}
                      aria-label={t("signUp.accessibility.togglePassword")}
                    >
                      <span className="material-symbols-outlined">
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                  <HelpBtn label={t("signUp.fields.password")} videoSrc="/videos/hello.mp4" />
                </div>

                {fieldErrors.password && <span className="text-xs text-red-600">{fieldErrors.password}</span>}
              </div>

              {/* تأكيد كلمة المرور */}
              <div className="flex flex-col gap-1.5">
                <label className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${textStart}`} htmlFor="confirmPassword">
                  {t("signUp.fields.confirmPassword")} <span className="text-red-500 text-xs">{t("signUp.required")}</span>
                </label>

                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      id="confirmPassword"
                      className={`h-11 w-full rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${textStart} ${passwordPadding}`}
                      placeholder={t("signUp.placeholders.confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) => setValue("confirmPassword", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className={`absolute inset-y-0 ${passwordTogglePosition} flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300`}
                      aria-label={t("signUp.accessibility.toggleConfirm")}
                    >
                      <span className="material-symbols-outlined">
                        {showConfirmPassword ? "visibility" : "visibility_off"}
                      </span>
                    </button>
                  </div>
                  <HelpBtn label={t("signUp.fields.confirmPassword")} videoSrc="/videos/hello.mp4" />
                </div>

                {fieldErrors.confirmPassword && (
                  <span className="text-xs text-red-600">{fieldErrors.confirmPassword}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting || !canSubmit}
                className="mt-4 h-12 w-full bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <span className="animate-spin material-symbols-outlined">refresh</span>
                    {t("signUp.actions.submitting")}
                  </>
                ) : (
                  t("signUp.actions.submit")
                )}
              </button>
            </form>

            <div className="bg-slate-50 dark:bg-slate-900/40 px-8 py-5 border-t border-border-light dark:border-border-dark text-center text-sm text-slate-600 dark:text-slate-400">
              <span className={textStart}>{t("signUp.footer.prompt")}{" "}</span>
              <Link to="/login" className="text-primary font-semibold hover:underline">
                {t("signUp.footer.login")}
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default SignUpPage;
