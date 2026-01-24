import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';

const VoiceToAvatarPage = () => {
  return (
    <ThemeProvider>
      <div className="bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white font-display transition-colors duration-200 min-h-screen">
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          <Navbar variant="dashboard" logo="صوتي-أفاتار" />
          <main className="flex-1 layout-container flex flex-col items-center py-8 lg:py-12 px-4 lg:px-8">
            <div className="w-full max-w-[1200px] flex flex-col gap-8">
              <div className="flex flex-col gap-2 text-center md:text-right">
                <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">من الصوت إلى الأفاتار</h1>
                <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-2xl">تحدث بشكل طبيعي لتحريك الأفاتار الرقمي الخاص بك في الوقت الفعلي. يلتقط ذكاؤنا الاصطناعي نبرة صوتك وتعبيراتك على الفور.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg flex flex-col items-center gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-primary to-primary-light"></div>
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="flex flex-col items-center gap-4 mt-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">جاهز للتسجيل</span>
                      <div className="relative group cursor-pointer">
                        <button className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_30px_rgba(242,89,61,0.3)] hover:bg-primary-light hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-white dark:border-slate-800">
                          <span className="material-symbols-outlined text-5xl">mic</span>
                        </button>
                        <div className="absolute top-0 left-0 h-full w-full rounded-full bg-primary/30 animate-[ping_2s_ease-in-out_infinite] opacity-75"></div>
                        <div className="absolute top-0 left-0 h-full w-full rounded-full bg-primary/20 animate-[ping_2s_ease-in-out_infinite] opacity-50 delay-75"></div>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">اضغط للبدء في التحدث</p>
                    </div>
                    <div className="flex items-end justify-center gap-1.5 h-16 w-full px-8 opacity-60">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-primary/80 rounded-full animate-[pulse_1s_ease-in-out_infinite]"
                          style={{ height: `${Math.random() * 10 + 3}rem`, animationDelay: `${i * 75}ms` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center px-1">
                      <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">النص المباشر</h3>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                        نشط
                      </span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm min-h-[220px] relative bg-slate-50/50 dark:bg-slate-700/50">
                      <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed font-light text-right">
                        "مرحباً، أنا أقوم باختبار ميزة الترجمة الصوتية. أود أن أرى كيف يستجيب الأفاتار لنبرة صوتي وسرعتي."
                        <span className="inline-block w-1 h-5 mr-1 align-middle bg-primary animate-pulse"></span>
                      </p>
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <button className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-1.5 rounded-lg transition-all shadow-sm">
                          <span className="material-symbols-outlined text-sm">restart_alt</span> إعادة تعيين
                        </button>
                        <button className="text-xs font-medium text-primary hover:text-primary-dark flex items-center gap-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 px-3 py-1.5 rounded-lg transition-all shadow-sm">
                          <span className="material-symbols-outlined text-sm">content_copy</span> نسخ
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">face</span>
                        <span className="font-bold text-slate-900 dark:text-white">معاينة الأفاتار</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600" title="ملء الشاشة">
                          <span className="material-symbols-outlined">fullscreen</span>
                        </button>
                      </div>
                    </div>
                    <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-700 group overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply dark:mix-blend-normal"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD4LUVr1snRfxJz_VuBODhdrn6FEtaOsajNvOommZgpmQxaJcDEdyX1pvfU8FN2pO_jSlT2jEow_ETBX6Dsm9ZFHGDuITFon-NAwl7yzDPtL2BS_npngEaSmChDT68K-U0nUEDLFsQH8-sIZWl_xkPEhNo2h__-mBPUYzV57Of7Te34P5T63yXHM4p8hwXxDjPJ1pxaTyIECccwxoFnLbNAvRL-UWPKU9QAoel7GwxTzPrebhvxApXfYhyKL8GICXyvhADNZwXd6bQ')" }}
                        alt="Background gradient"
                      ></div>
                      <div className="absolute inset-0 flex items-end justify-center z-10">
                        <div
                          className="h-[95%] w-auto aspect-[3/4] bg-contain bg-bottom bg-no-repeat drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-transform duration-500"
                          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzxzL9Xm4G71Z5QYK21bhY7iWJ772VkrpxzNlXPa-0ZcXAVPOvAODyIuv5WRrJpBwHGeA1JptyPf_kQIxvp0CwjqK07_pQinAOEG8mxG8GFHI7OS2L0mwIPflseYMkx7fVCxymxSkXbRsf0wjI5IxfS3MEXgcTPN0g-blyysZMewIb2DaEA2JWtNxzSP93aaFd5hBU7y6LbV-ce-wPbrNNRdKqnaD-3LJbimcN-AAAKbdgpH5x_tMTuHY2MuScYybp1Lh0_dr8CnU')" }}
                          alt="3D animated avatar"
                        ></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full p-5 shadow-2xl border border-white/50 dark:border-slate-700 transform rotate-180">
                          <span className="material-symbols-outlined text-5xl text-primary">play_arrow</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-700 p-1.5 rounded-lg border border-slate-200 dark:border-slate-600">
                        {['face_6', 'checkroom', 'wallpaper', 'tune'].map((icon, i) => (
                          <button
                            key={i}
                            className="p-2 rounded-md hover:bg-white dark:hover:bg-slate-600 hover:shadow-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-all group relative"
                            title={['الوجه', 'الزي', 'الخلفية', 'الإعدادات'][i]}
                          >
                            <span className="material-symbols-outlined">{icon}</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-2.5 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all active:translate-y-0.5 border border-primary">
                          <span className="material-symbols-outlined transform rotate-180">play_circle</span>
                          <span>تشغيل الرسوم</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-colors shadow-sm">
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-2.5 rounded-lg text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
                        <span className="material-symbols-outlined">speed</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">زمن الانتقال</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">24ملي ثانية</p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-colors shadow-sm">
                      <div className="bg-orange-100 dark:bg-orange-900/20 p-2.5 rounded-lg text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                        <span className="material-symbols-outlined">sentiment_satisfied</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">المشاعر</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">سعيد</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default VoiceToAvatarPage;
