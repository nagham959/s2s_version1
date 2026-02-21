import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/authContext';



// validation functions
function isValidEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}


const LoginPage = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage , setErrorMessage] = useState('');
  const {login} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  



  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();

    // input validations 
    if (!cleanEmail) return setErrorMessage('يرجى إدخال البريد الإلكتروني.');
    if (!isValidEmail(cleanEmail )) return setErrorMessage('يرجى إدخال بريد إلكتروني صالح.');
    if (!password) return setErrorMessage('يرجى إدخال كلمة المرور.');
    if (password.length < 8) return setErrorMessage('يجب أن تتكون كلمة المرور من 8 خانات على الأقل.');
    
    // login
    setIsLoading(true);
    try {
      await login(cleanEmail,password);
      navigate('/dashboard');
    } catch (error) {
      const status = error?.response?.status;
      let message = 'حدث خطأ في الاتصال بالخادم. حاول مرة أخرى.';

      switch (status) {
        case 400:
          message = 'البريد أو كلمة المرور غير صحيحة';
          break;
        case 401:
          message = 'غير مصرح لك بالدخول يرجى التحقق من البريد الالكتروني.';
          break;
        case 503:
           message =  "السيرفر غير متاح حاليًا (503). حاول بعد قليل.";
            break;
        case 500:
          message = 'خطأ في الخادم , حاول لاحقا.';
          break;

      
        default:
          if(error.message) {
            message = error.message;
          }
          if (/<!doctype|<html|<body|<pre/i.test(message)) {
            message = 'حدث خطأ في الاتصال بالخادم. حاول مرة أخرى.';
          }
         }
         setIsLoading(false);
         setErrorMessage(message);
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
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">مرحباً بعودتك</h2>
              <p className="text-slate-500 dark:text-text-secondary text-sm">سجل الدخول للوصول إلى الأفاتار الخاص بك.</p>
            </div>

            <div className="px-8 mt-6 w-full">
              <div className="flex w-full bg-slate-100 dark:bg-black/20 p-1 rounded-xl">
                <button className="flex-1 py-2 text-center rounded-lg bg-white dark:bg-[#2a2a2a] shadow-sm text-primary font-bold text-sm transition-all focus-visible-ring">
                  تسجيل الدخول
                </button>
                <Link to="/signup" className="flex-1 py-2 text-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium text-sm transition-colors focus-visible-ring">
                  إنشاء حساب
                </Link>
              </div>
            </div>

            <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-2 group">
                <span className="text-sm font-medium text-slate-700 dark:text-white">البريد الإلكتروني</span>
                <div className="relative">
                  <input
                    className="w-full h-12 pr-10 pl-4 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right"
                    placeholder="name@example.com"
                    type = "email"
                    value={email}
                    onChange={(e)=> {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                      } }
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                </div>
              </label>

              <label className="flex flex-col gap-2 group">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-white">كلمة المرور</span>
                  <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:text-primary-hover hover:underline focus-visible-ring rounded">
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <div className="relative flex items-center">
                  <input
                    className="w-full h-12 pr-4 pl-12 rounded-xl border border-border-light dark:border-border-dark bg-background-light dark:bg-input-bg-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base text-right"
                    placeholder="أدخل كلمة المرور"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e)=> {
                      setPassword(e.target.value);
                      if(errorMessage) setErrorMessage('');
                    } }
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
               
               {/* handel errors */}
              { !!errorMessage?.trim() && (
                  <div
                      role="alert"
                      aria-live="polite"
                      className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-600"
                  > 
                  {errorMessage}
                  </div>
              )}

              <button
                className="w-full h-12 mt-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-[#F2593D]/20 hover:shadow-[#F2593D]/40 transition-all active:scale-[0.98] focus-visible-ring flex items-center justify-center gap-2"
                type="submit"
                disabled= {isLoading}  
              >
                <span>{isLoading ? 'جاري الدخول...' : 'دخول'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              </button>

              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border-light dark:border-border-dark"></div>
                </div>
                <div className="relative bg-surface-light dark:bg-surface-dark px-4">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-wider">أو المتابعة باستخدام</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-slate-50 dark:hover:bg-[#2a2a2a] transition-colors focus-visible-ring bg-white dark:bg-transparent"
                  type="button"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">جوجل</span>
                </button>
                <button
                  className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-border-light dark:border-border-dark hover:bg-slate-50 dark:hover:bg-[#2a2a2a] transition-colors focus-visible-ring bg-white dark:bg-transparent"
                  type="button"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#1877F2"/>
                  </svg>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">فيسبوك</span>
                </button>
              </div>
            </form>
            <div className="bg-slate-50 dark:bg-black/40 px-8 py-5 border-t border-border-light dark:border-border-dark text-center">
              <p className="text-sm text-slate-500 dark:text-text-secondary">
                ليس لديك حساب؟
                <Link to="/signup" className="font-bold text-primary hover:text-primary-hover hover:underline focus-visible-ring rounded mr-1">
                  سجل مجاناً
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
