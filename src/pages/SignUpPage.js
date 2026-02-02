import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://s2s-1d5c94958ff6.herokuapp.com";



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

  
  let message = "حصل خطأ غير متوقع. حاول مرة أخرى.";

  if (res.status === 503) message = "السيرفر غير متاح حاليًا. حاول بعد قليل.";
  else if (emailDup) message = "البريد الإلكتروني مستخدم بالفعل. جرّب تسجيل الدخول.";
  else if (phoneDup) message = "رقم الهاتف مستخدم بالفعل. جرّب رقمًا آخر.";
  else if (res.status === 400) message = "فيه بيانات ناقصة أو غير صحيحة. راجع الحقول وحاول مرة أخرى.";
  else if (m.includes("invalid")) message = "فيه بيانات غير صحيحة. راجع الحقول وحاول مرة أخرى.";

  if (emailDup && !fieldErrors.email) fieldErrors.email = "البريد الإلكتروني مستخدم بالفعل.";
  if (phoneDup && !fieldErrors.phoneNumber) fieldErrors.phoneNumber = "رقم الهاتف مستخدم بالفعل.";

  return { message, fieldErrors };
};


const SignUpPage = () => {
  const navigate = useNavigate();

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

    if (!form.displayName.trim()) errs.displayName = "الاسم الكامل مطلوب";

    if (!form.email.trim()) errs.email = "البريد الإلكتروني مطلوب";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "البريد الإلكتروني غير صالح";

    if (!form.dateOfBirth) errs.dateOfBirth = "تاريخ الميلاد مطلوب";
    else {
      const dob = new Date(form.dateOfBirth);
      const today = new Date();
      if (dob > today) errs.dateOfBirth = "تاريخ الميلاد غير صالح";
    }

    // phone validation
    const phone = (form.phoneNumber || "").trim().replace(/\s|-/g, "");
    if (!phone) {
      errs.phoneNumber = "رقم الهاتف مطلوب";
    } else {
      const okEgyptLocal = /^\d{11}$/.test(phone);
      const okEgyptIntl = /^\+20\d{10}$/.test(phone);
      const okGeneric = /^\+?\d{10,15}$/.test(phone);
      if (!(okEgyptLocal || okEgyptIntl || okGeneric)) {
        errs.phoneNumber = "رقم الهاتف غير صالح (مثال: 01012345678 )";
      }
    }

    if (!form.password) {
      errs.password = "كلمة المرور مطلوبة";
    } else if (form.password.length < 8) {
      errs.password = "كلمة المرور يجب أن تكون 8 خانات على الأقل";
    } else if (!/[A-Z]/.test(form.password)) {
      errs.password = "يجب أن تحتوي على حرف كبير واحد على الأقل";
    } else if (!/[a-z]/.test(form.password)) {
      errs.password = "يجب أن تحتوي على حرف صغير واحد على الأقل";
    } else if (!/[0-9]/.test(form.password)) {
      errs.password = "يجب أن تحتوي على رقم واحد على الأقل";
    } else if (!/[@$!%*?& #]/.test(form.password)) {
      errs.password = "يجب أن تحتوي على رمز خاص واحد على الأقل (@$!%*?&#)";
    }

    if (form.confirmPassword !== form.password) {
      errs.confirmPassword = "كلمتا المرور غير متطابقتين";
    }

    return errs;
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
      setFormError("تعذر الاتصال بالخادم، تحقق من الإنترنت وحاول مرة أخرى.");
    } finally {
      setSubmitting(false);
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

          <div className="relative w-full max-w-[520px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl border border-border-light dark:border-border-dark z-10 overflow-hidden flex flex-col transition-colors">
            <div className="pt-8 px-8 pb-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                إنشاء حساب
              </h2>
              <p className="text-slate-500 dark:text-text-secondary text-sm">
                أنشئ حساباً جديداً للوصول إلى الأفاتار الخاص بك.
              </p>
            </div>

            <div className="px-8 mt-6 w-full">
              <div className="flex w-full bg-slate-100 dark:bg-black/20 p-1 rounded-xl">
                <Link
                  to="/login"
                  className="flex-1 py-2 text-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-sm transition-colors focus-visible-ring"
                >
                  تسجيل الدخول
                </Link>

                <button
                  className="flex-1 py-2 text-center rounded-lg bg-white dark:bg-[#2a2a2a] shadow-sm text-primary font-bold text-sm transition-all focus-visible-ring"
                  type="button"
                >
                  إنشاء حساب
                </button>
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
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="displayName">
                  الاسم الكامل <span className="text-red-500 text-xs">(مطلوب)</span>
                </label>
                <input
                  id="displayName"
                  className="h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right"
                  placeholder="محمد أحمد"
                  value={form.displayName}
                  onChange={(e) => setValue("displayName", e.target.value)}
                />
                {fieldErrors.displayName && (
                  <span className="text-xs text-red-600">{fieldErrors.displayName}</span>
                )}
              </div>

              {/* اسم المستخدم */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="userName">
                  اسم المستخدم <span className="text-slate-400 text-xs">(اختياري)</span>
                </label>
                <input
                  id="userName"
                  className="h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right"
                  placeholder="yousef.masoud"
                  value={form.userName}
                  onChange={(e) => setValue("userName", e.target.value)}
                />
              </div>

              {/* البريد الإلكتروني */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="email">
                  البريد الإلكتروني <span className="text-red-500 text-xs">(مطلوب)</span>
                </label>
                <input
                  id="email"
                  className="h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right"
                  placeholder="name@example.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => setValue("email", e.target.value)}
                />
                {fieldErrors.email && <span className="text-xs text-red-600">{fieldErrors.email}</span>}
              </div>

              {/* رقم الهاتف */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="phoneNumber">
                  رقم الهاتف <span className="text-red-500 text-xs">(مطلوب)</span>
                </label>
                <input
                  id="phoneNumber"
                  className="h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right"
                  placeholder="01012345678"
                  value={form.phoneNumber}
                  onChange={(e) => setValue("phoneNumber", e.target.value)}
                  dir="ltr"
                />
                {fieldErrors.phoneNumber && (
                  <span className="text-xs text-red-600">{fieldErrors.phoneNumber}</span>
                )}
              </div>

              {/* النوع + تاريخ الميلاد */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="gender">
                    النوع
                  </label>
                  <select
                    id="gender"
                    className="h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right appearance-none"
                    value={form.gender}
                    onChange={(e) => setValue("gender", e.target.value)}
                  >
                    <option value="">اختر</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="dateOfBirth">
                    تاريخ الميلاد <span className="text-red-500 text-xs">(مطلوب)</span>
                  </label>
                  <input
                    id="dateOfBirth"
                    className="h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => setValue("dateOfBirth", e.target.value)}
                  />
                  {fieldErrors.dateOfBirth && (
                    <span className="text-xs text-red-600">{fieldErrors.dateOfBirth}</span>
                  )}
                </div>
              </div>

              {/* نوع المستخدم  */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="userType">
                  نوع المستخدم
                </label>
                <select
                  id="userType"
                  className="h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right appearance-none"
                  value={form.userType}
                  onChange={(e) => setValue("userType", Number(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </select>
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
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none"
                >
                  أنا أستخدم لغة الإشارة
                </label>
              </div>

              {form.usesSignLanguage && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="signLanguage">
                    لغة الإشارة
                  </label>
                  <select
                    id="signLanguage"
                    className="h-11 px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right appearance-none"
                    value={form.signLanguage}
                    onChange={(e) => setValue("signLanguage", Number(e.target.value))}
                  >
                    <option value={1}>افتراضي (1)</option>
                  </select>
                </div>
              )}

              {/* كلمة المرور */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="password">
                  كلمة المرور <span className="text-red-500 text-xs">(مطلوب)</span>
                </label>

                <div className="relative">
                  <input
                    id="password"
                    className="h-11 w-full px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right"
                    placeholder="كلمة المرور"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setValue("password", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute inset-y-0 left-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    aria-label="إظهار/إخفاء كلمة المرور"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>

                {fieldErrors.password && <span className="text-xs text-red-600">{fieldErrors.password}</span>}
              </div>

              {/* تأكيد كلمة المرور */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-200" htmlFor="confirmPassword">
                  تأكيد كلمة المرور <span className="text-red-500 text-xs">(مطلوب)</span>
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    className="h-11 w-full px-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-right"
                    placeholder="تأكيد كلمة المرور"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => setValue("confirmPassword", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="absolute inset-y-0 left-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    aria-label="إظهار/إخفاء تأكيد كلمة المرور"
                  >
                    <span className="material-symbols-outlined">
                      {showConfirmPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
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
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  "إنشاء حساب"
                )}
              </button>
            </form>

            <div className="bg-slate-50 dark:bg-slate-900/40 px-8 py-5 border-t border-border-light dark:border-border-dark text-center text-sm text-slate-600 dark:text-slate-400">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                تسجيل الدخول
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
