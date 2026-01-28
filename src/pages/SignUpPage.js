import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    navigate('/dashboard');
  };

  return (
    <ThemeProvider>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display antialiased transition-colors duration-300">
        <Navbar variant="auth" logo="SignaryAI" />
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative w-full max-w-[480px] bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl border border-border-light dark:border-border-dark z-10 overflow-hidden flex flex-col transition-colors">
            <div className="pt-8 px-8 pb-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">إنشاء حساب جديد</h2>
              <p className="text-slate-500 dark:text-text-secondary text-sm">املأ البيانات أدناه لبدء رحلتك معنا.</p>
            </div>
            <div className="px-8 mt-6 w-full">
              <div className="flex w-full bg-slate-100 dark:bg-black/20 p-1 rounded-xl">
                <Link to="/login" className="flex-1 py-2 text-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-sm transition-colors focus-visible-ring">
                  تسجيل الدخول
                </Link>
                <button className="flex-1 py-2 text-center rounded-lg bg-white dark:bg-[#2a2a2a] shadow-sm text-primary font-bold text-sm transition-all focus-visible-ring">
                  إنشاء حساب
                </button>
              </div>
            </div>
            <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2 group">
                <span className="text-sm font-medium text-slate-700 dark:text-white">الاسم الكامل</span>
                <div className="relative">
                  <input
                    className="w-full h-12 pr-10 pl-4 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right"
                    placeholder="نغم أحمد"
                    type="text"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                </div>
              </label>
              <label className="flex flex-col gap-2 group">
                <span className="text-sm font-medium text-slate-700 dark:text-white">البريد الإلكتروني</span>
                <div className="relative">
                  <input
                    className="w-full h-12 pr-10 pl-4 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right"
                    placeholder="name@example.com"
                    type="email"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                </div>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2 group">
                  <span className="text-sm font-medium text-slate-700 dark:text-white">النوع</span>
                  <div className="relative">
                    <select className="w-full h-12 pr-10 pl-10 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right appearance-none cursor-pointer">
                      <option disabled defaultValue="">اختر</option>
                      <option value="male">ذكر</option>
                      <option value="female">أنثى</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <span className="material-symbols-outlined text-[20px]">wc</span>
                    </div>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <span className="material-symbols-outlined text-[20px]">expand_more</span>
                    </div>
                  </div>
                </label>
                <label className="flex flex-col gap-2 group">
                  <span className="text-sm font-medium text-slate-700 dark:text-white">تاريخ الميلاد</span>
                  <div className="relative">
                    <input
                      className="w-full h-12 pr-10 pl-4 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right [color-scheme:light] dark:[color-scheme:dark]"
                      type="date"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                    </div>
                  </div>
                </label>
              </div>
              <label className="flex flex-col gap-2 group">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-white">كلمة المرور</span>
                </div>
                <div className="relative flex items-center">
                  <input
                    className="w-full h-12 pr-4 pl-12 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right"
                    placeholder="أدخل كلمة المرور"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    aria-label="Toggle password visibility"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded focus-visible-ring"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-1 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                  <span className="material-symbols-outlined text-[14px] text-text-secondary">info</span>
                  <span className="text-xs text-text-secondary">يجب أن تتكون من 8 خانات على الأقل.</span>
                </div>
              </label>
              <label className="flex flex-col gap-2 group">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-white">تأكيد كلمة المرور</span>
                </div>
                <div className="relative flex items-center">
                  <input
                    className="w-full h-12 pr-4 pl-12 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right"
                    placeholder="أعد إدخال كلمة المرور"
                    type={showConfirmPassword ? 'text' : 'password'}
                  />
                  <button
                    aria-label="Toggle password visibility"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded focus-visible-ring"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showConfirmPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </label>
              <button
                className="w-full h-12 mt-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98] focus-visible-ring flex items-center justify-center gap-2"
                type="submit"
              >
                <span>إنشاء حساب</span>
                <span className="material-symbols-outlined text-[18px]">person_add</span>
              </button>
              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-light dark:border-border-dark"></div>
                </div>
                <div className="relative bg-surface-light dark:bg-surface-dark px-4">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">أو التسجيل باستخدام</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-slate-50 dark:hover:bg-[#2a2a2a] transition-colors focus-visible-ring bg-white dark:bg-transparent"
                  type="button"
                >
                  <img
                    alt="Google Logo"
                    className="w-5 h-5"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtMusNxR7lmNbHXgOdE7mEZzllLE3HweqAZrsd0pE2eMqu4BIyftyTy9GE32YxUfXj5wF6m5D_2K9eirNO19ZyY6PLN6erBfGp4DDp0a9xgn_eWaZrayge1P8Cw_L9cGMH176vOFBWClOGgLWkvjsilA4OYqIJ7vAFbHXI6PDsF6p8vEivL8w_nxByoA2JtQ5kSmCxzxv_poHAHzsoIwFyPlHX4wcHlKe3eV_tnkY3aKI-5UB0rJpgqOUK6Xt7BKCecs1dsmAJ-iI"
                  />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">جوجل</span>
                </button>
                <button
                  className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-slate-50 dark:hover:bg-[#2a2a2a] transition-colors focus-visible-ring bg-white dark:bg-transparent"
                  type="button"
                >
                  <img
                    alt="Facebook Logo"
                    className="w-5 h-5 dark:invert"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQVuzInXd84MP570dPxOyg0a8gw-fvHsGPpXRP3ZEKx8NPaAocDovXxzEUoHYQSdPvZbuuSM94N1doagFk8QSxa6OOqCoipV9m6OxxVWN6SPxER6_lGzRQ3eT73OITN8YT11AF-dYc7SniqbdiG-4zd-cHgFld3z1v7Rm320ruxteQ08RSajmn7DqlDwLQ1zmUq0d_r6HouwG3adAjbnVsjcZjdaGOfupvs2ZEYzlRkruAR234HPVs7zZ8rfv1Oidd9CENsxpbSWU"
                  />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">فيسبوك</span>
                </button>
              </div>
            </form>
            <div className="bg-slate-50 dark:bg-black/40 px-8 py-5 border-t border-border-light dark:border-border-dark text-center">
              <p className="text-sm text-slate-500 dark:text-text-secondary">
                لديك حساب بالفعل؟
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

export default SignUpPage;
