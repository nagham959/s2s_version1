import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';

const SignToVoicePage = () => {
  return (
    <ThemeProvider>
      <div className="font-display bg-white dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col overflow-x-hidden transition-colors duration-300">
        <Navbar variant="dashboard" logo="SignSpeak" />
        <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 h-full grow">
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">كاميرا الترجمة</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">تأكد من أن يديك ووجهك ظاهران بوضوح داخل الإطار.</p>
              </div>
              <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 group">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-90"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCveAY_GA5lNGzRGPoVE3DMEfwA07o8nviCXHP8JnCCBKnqiFIdn4TMD3ywlWCGuSTtI_kyNMvOi3q4LQ2r8OaoYYEmyJBJ4jPkUAuD63n_nPPoflZhmKOK7Jswv0eDjoi9ngPojI4ywwYYJgtArXg_aJ55Qbmyj9QR8E9fSGccsuJFwjfbQSqPFOvSqU_yCFKuafipOzufmk5YwPCesCfRf1X4HSHSd165r6gDjs0dknceZqMr7Jz-WA8rmM0TosXgpwI6ri2CBnY')", transform: 'scaleX(-1)' }}
                  alt="Live camera feed showing a person using sign language"
                ></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-32 h-32 border-2 border-primary/60 rounded-xl top-1/4 right-1/3 opacity-40 shadow-[0_0_15px_rgba(242,89,61,0.3)]"></div>
                  <div className="absolute w-32 h-32 border-2 border-primary/60 rounded-xl bottom-1/3 left-1/3 opacity-40 shadow-[0_0_15px_rgba(242,89,61,0.3)]"></div>
                </div>
                <div className="absolute top-6 right-6 flex gap-3">
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="material-symbols-outlined text-green-500 text-sm animate-pulse filled">radio_button_checked</span>
                    تتبع نشط
                  </div>
                  <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="material-symbols-outlined text-primary text-sm">front_hand</span>
                    تم رصد اليدين
                  </div>
                </div>
                <div className="absolute top-6 left-6 flex gap-2">
                  <button className="bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md text-slate-700 dark:text-white size-10 rounded-full flex items-center justify-center transition-colors border border-slate-200 dark:border-slate-700 shadow-sm">
                    <span className="material-symbols-outlined text-sm">fullscreen</span>
                  </button>
                </div>
                <div className="absolute bottom-6 w-full flex justify-center pointer-events-none">
                  <div className="bg-black/70 backdrop-blur-md px-6 py-2 rounded-xl border border-white/5 text-white/90 text-lg font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2">
                    أبحث عن محطة القطار...
                  </div>
                </div>
              </div>
              <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex gap-2 w-1/3">
                  <button className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-colors">
                    <span className="material-symbols-outlined">cameraswitch</span>
                    <span className="hidden sm:inline">قلب الكاميرا</span>
                  </button>
                </div>
                <div className="flex justify-center w-1/3">
                  <button
                    aria-label="تسجيل"
                    className="group relative flex flex-col items-center justify-center size-16 bg-primary rounded-full shadow-[0_0_20px_rgba(242,89,61,0.3)] hover:shadow-[0_0_25px_rgba(242,89,61,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-slate-50 dark:border-slate-700"
                  >
                    <span className="material-symbols-outlined text-white text-2xl mb-0.5 group-hover:hidden">mic</span>
                    <span className="text-[10px] text-white font-bold leading-none group-hover:hidden">تسجيل</span>
                    <span className="hidden group-hover:block size-5 bg-white rounded-sm"></span>
                    <span className="absolute -inset-1 rounded-full border border-primary/30 animate-ping opacity-75 pointer-events-none"></span>
                  </button>
                </div>
                <div className="flex gap-2 justify-end w-1/3">
                  <button className="flex items-center gap-2 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium text-sm transition-colors">
                    <span className="material-symbols-outlined">keyboard</span>
                    <span className="hidden sm:inline">كتابة</span>
                  </button>
                  <button className="flex items-center justify-center size-12 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 flex flex-col h-[600px] lg:h-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-700/50">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">translate</span>
                  <h3 className="font-bold text-slate-800 dark:text-white">النص المباشر</h3>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" title="نسخ النص">
                    <span className="material-symbols-outlined text-lg">content_copy</span>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors" title="مسح">
                    <span className="material-symbols-outlined text-lg">delete_sweep</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 p-6 overflow-y-auto space-y-6 font-display scrollbar-hide bg-white dark:bg-slate-800">
                <div className="opacity-60 hover:opacity-100 transition-opacity">
                  <p className="text-lg leading-relaxed text-slate-800 dark:text-white">أهلاً بك! تشرفت بلقائك.</p>
                </div>
                <div className="opacity-60 hover:opacity-100 transition-opacity">
                  <p className="text-lg leading-relaxed text-slate-800 dark:text-white">اسمي سارة، وأنا أقوم بتجربة مترجم لغة الإشارة.</p>
                </div>
                <div className="relative pr-4 border-r-4 border-primary bg-slate-50 dark:bg-slate-700 p-3 rounded-l-lg">
                  <p className="text-xl font-semibold leading-relaxed text-slate-900 dark:text-white">
                    أنا أبحث حالياً عن <span className="bg-primary/10 dark:bg-primary/20 text-primary px-1 rounded">محطة القطار</span> القريبة. هل يمكنك مساعدتي؟
                    <span className="inline-block w-2 h-5 mr-1 bg-primary animate-pulse align-middle rounded-full"></span>
                  </p>
                  <div className="mt-3 flex gap-2 items-center">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce delay-150"></div>
                    </div>
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">جاري الترجمة</span>
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-700/80">
                <button className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-[#d93d20] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
                  <span className="material-symbols-outlined">volume_up</span>
                  تشغيل الصوت
                </button>
                <div className="mt-4 flex items-center justify-between px-2">
                  <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-xs font-medium transition-colors">
                    <span className="material-symbols-outlined text-sm">speed</span>
                    <span>سرعة 1.0x</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-xs font-medium transition-colors">
                    <span>العربية</span>
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default SignToVoicePage;
