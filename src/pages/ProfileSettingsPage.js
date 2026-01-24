import React, { useState } from 'react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';

const ProfileSettingsContent = () => {
  const { isDark, toggleTheme } = useTheme();
  const [avatarSpeed, setAvatarSpeed] = useState(1.2);
  const [voiceControl, setVoiceControl] = useState(true);

  return (
    <div className="bg-background-subtle dark:bg-background-dark font-display text-text-main dark:text-white antialiased min-h-screen flex flex-col">
      <Navbar variant="dashboard" logo="SignVoice" />
      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white tracking-tight mb-3">الملف الشخصي والإعدادات</h1>
            <p className="text-text-muted dark:text-slate-400 text-lg max-w-2xl leading-relaxed">قم بإدارة هويتك وتفضيلاتك وخيارات إمكانية الوصول لتخصيص تجربتك في SignVoice.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-light dark:bg-slate-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/50 border border-border-light dark:border-slate-700 p-8 flex flex-col items-center text-center">
              <div className="relative group mb-6">
                <div
                  className="h-36 w-36 rounded-full bg-cover bg-center shadow-lg ring-4 ring-background-subtle dark:ring-slate-700"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA1VSvtH1AlkzXbOETNqCK2bOSBX9zehvxrYtg-eU2kf9VmtHAZjwj4vb58SSSx7KEwA4O8dgYp9msr07NT3_4xhpmUb-HH-xn1iF9HZkOjr71J-TqS9cR9vFyvNj9LsoeVAPv4-zgWsZ4MqmTFskzH9cmweAq0KpOYbzv4vwlGjHHqKuo_zxU4zQBLSmlnPCqD-27GLkXf9mzkePEXzgr6UMDnYfI13Rtb0Jl-ns96YAhfq1eWAeHsf3cZ3UG1777wh1L3oXLuCQQ')" }}
                ></div>
                <button
                  aria-label="تعديل الصورة الرمزية"
                  className="absolute bottom-1 right-1 bg-primary text-white p-2.5 rounded-full shadow-lg hover:bg-[#d6452b] transition-all hover:scale-110 focus:ring-4 focus:ring-primary/30 border-2 border-surface-light dark:border-slate-800"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
              </div>
              <h2 className="text-2xl font-bold text-text-main dark:text-white mb-1">أليكس مورغان</h2>
              <p className="text-text-muted dark:text-slate-400 font-medium mb-8 dir-ltr">alex.morgan@example.com</p>
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between px-5 py-4 bg-gray-50 dark:bg-slate-700 rounded-xl border border-gray-100 dark:border-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-lg">
                      <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-text-main dark:text-white">الخطة الاحترافية</p>
                      <p className="text-xs text-text-muted dark:text-slate-400">تجديد سنوي</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 rounded-full">نشط</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-light dark:bg-slate-800 rounded-2xl p-6 border border-border-light dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-text-main dark:text-white mb-6 flex items-center gap-2 text-lg">
                <span className="material-symbols-outlined text-primary">insights</span>
                الاستخدام هذا الشهر
              </h3>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-muted dark:text-slate-400 font-medium">دقائق الترجمة</span>
                    <span className="font-bold text-text-main dark:text-white">240 <span className="text-text-muted dark:text-slate-400 font-normal">/ 500</span></span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '48%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-muted dark:text-slate-400 font-medium">إنشاء أفاتار</span>
                    <span className="font-bold text-text-main dark:text-white">12 <span className="text-text-muted dark:text-slate-400 font-normal">/ 20</span></span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-surface-light dark:bg-slate-800 rounded-2xl shadow-sm border border-border-light dark:border-slate-700 overflow-hidden">
              <div className="px-8 py-5 border-b border-border-light dark:border-slate-700 flex items-center gap-3 bg-gray-50 dark:bg-slate-700">
                <span className="material-symbols-outlined text-primary text-[24px]">settings</span>
                <h2 className="text-lg font-bold text-text-main dark:text-white">التفضيلات العامة</h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main dark:text-white mb-1" htmlFor="sign-lang">لغة الإشارة الأساسية</label>
                  <div className="relative">
                    <select
                      className="appearance-none w-full bg-input-bg dark:bg-slate-700 border border-border-light dark:border-slate-600 text-text-main dark:text-white rounded-xl h-12 px-4 pl-10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none font-medium cursor-pointer"
                      id="sign-lang"
                    >
                      <option defaultValue="asl">لغة الإشارة الأمريكية (ASL)</option>
                      <option value="bsl">لغة الإشارة البريطانية (BSL)</option>
                      <option value="jsl">لغة الإشارة اليابانية (JSL)</option>
                      <option value="arsl">لغة الإشارة العربية الموحدة</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-text-muted dark:text-slate-400">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-text-main dark:text-white mb-1" htmlFor="spoken-lang">لغة الإخراج الصوتي</label>
                  <div className="relative">
                    <select
                      className="appearance-none w-full bg-input-bg dark:bg-slate-700 border border-border-light dark:border-slate-600 text-text-main dark:text-white rounded-xl h-12 px-4 pl-10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all outline-none font-medium cursor-pointer"
                      id="spoken-lang"
                    >
                      <option value="en-us">الإنجليزية (الولايات المتحدة)</option>
                      <option defaultValue="ar">العربية (فصحى) - رسمي</option>
                      <option value="es">الإسبانية - قياسي</option>
                      <option value="fr">الفرنسية - باريس</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-text-muted dark:text-slate-400">
                      <span className="material-symbols-outlined">expand_more</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="bg-surface-light dark:bg-slate-800 rounded-2xl shadow-sm border border-border-light dark:border-slate-700 overflow-hidden">
              <div className="px-8 py-5 border-b border-border-light dark:border-slate-700 flex items-center gap-3 bg-gray-50 dark:bg-slate-700">
                <span className="material-symbols-outlined text-primary text-[24px]">accessibility_new</span>
                <h2 className="text-lg font-bold text-text-main dark:text-white">إمكانية الوصول والواجهة</h2>
              </div>
              <div className="p-8 space-y-8">
                <div className="flex items-center justify-between group">
                  <div className="flex gap-4">
                    <div className="mt-1 p-2 bg-gray-100 dark:bg-slate-700 rounded-lg group-hover:bg-gray-200 dark:group-hover:bg-slate-600 transition-colors">
                      <span className="material-symbols-outlined text-gray-500 dark:text-slate-400">dark_mode</span>
                    </div>
                    <div>
                      <p className="font-bold text-text-main dark:text-white text-base">الوضع الداكن</p>
                      <p className="text-sm text-text-muted dark:text-slate-400 mt-0.5">تبديل واجهة المستخدم إلى ألوان داكنة لتقليل إجهاد العين.</p>
                    </div>
                  </div>
                  <button
                    aria-checked={isDark}
                    onClick={toggleTheme}
                    className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 ${isDark ? 'bg-primary' : 'bg-gray-200 hover:bg-gray-300'}`}
                    role="switch"
                  >
                    <span className="sr-only">تفعيل الوضع الداكن</span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isDark ? '-translate-x-6' : 'translate-x-0'}`}
                    ></span>
                  </button>
                </div>
                <div className="h-px bg-border-light dark:bg-slate-700 w-full"></div>
                <div className="flex items-center justify-between group">
                  <div className="flex gap-4">
                    <div className="mt-1 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                      <span className="material-symbols-outlined text-primary">mic</span>
                    </div>
                    <div>
                      <p className="font-bold text-text-main dark:text-white text-base">التنقل بالتحكم الصوتي</p>
                      <p className="text-sm text-text-muted dark:text-slate-400 mt-0.5">تصفح لوحة التحكم واستخدم الميزات باستخدام الأوامر الصوتية.</p>
                    </div>
                  </div>
                  <button
                    aria-checked={voiceControl}
                    onClick={() => setVoiceControl(!voiceControl)}
                    className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 ${voiceControl ? 'bg-primary' : 'bg-gray-200 hover:bg-gray-300'}`}
                    role="switch"
                  >
                    <span className="sr-only">تفعيل التحكم الصوتي</span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${voiceControl ? '-translate-x-6' : 'translate-x-0'}`}
                    ></span>
                  </button>
                </div>
                <div className="h-px bg-border-light dark:bg-slate-700 w-full"></div>
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <label className="font-bold text-text-main dark:text-white flex items-center gap-2 text-base" htmlFor="avatar-speed">
                      <span className="material-symbols-outlined text-gray-500 dark:text-slate-400">speed</span>
                      سرعة إشارة الأفاتار
                    </label>
                    <span className="text-sm font-bold text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-md">{avatarSpeed}x</span>
                  </div>
                  <div className="px-2">
                    <input
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0"
                      id="avatar-speed"
                      max="2"
                      min="0.5"
                      step="0.1"
                      type="range"
                      value={avatarSpeed}
                      onChange={(e) => setAvatarSpeed(parseFloat(e.target.value))}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-muted dark:text-slate-400 font-bold px-1">
                    <span>بطيء وواضح</span>
                    <span>محادثة طبيعية</span>
                    <span>سريع</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-slate-700 px-8 py-4 flex items-center justify-between border-t border-border-light dark:border-slate-600">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">face</span>
                  <span className="text-sm font-medium text-text-muted dark:text-slate-400">معاينة التغييرات على الأفاتار مباشرة</span>
                </div>
                <button className="text-sm font-bold text-primary hover:text-[#d6452b] underline decoration-2 underline-offset-4 transition-colors">تجربة الأفاتار</button>
              </div>
            </section>
            <section className="bg-surface-light dark:bg-slate-800 rounded-2xl shadow-sm border border-border-light dark:border-slate-700 overflow-hidden">
              <div className="px-8 py-5 border-b border-border-light dark:border-slate-700 flex items-center gap-3 bg-gray-50 dark:bg-slate-700">
                <span className="material-symbols-outlined text-primary text-[24px]">manage_accounts</span>
                <h2 className="text-lg font-bold text-text-main dark:text-white">أمان الحساب</h2>
              </div>
              <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-bold text-text-main dark:text-white text-base">كلمة المرور والمصادقة</p>
                  <div className="flex items-center gap-2 text-sm text-text-muted dark:text-slate-400">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>تم التغيير آخر مرة منذ 3 أشهر</span>
                  </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none whitespace-nowrap px-5 py-2.5 bg-transparent border border-border-light dark:border-slate-600 rounded-xl text-sm font-bold text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-slate-500 transition-all shadow-sm">
                    تغيير كلمة المرور
                  </button>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 px-8 py-6 border-t border-red-100 dark:border-red-800 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm font-bold text-red-600 dark:text-red-400">تسجيل الخروج</p>
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">تسجيل الخروج بشكل آمن من حسابك على هذا الجهاز.</p>
                </div>
                <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-700 transition-all flex items-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-[18px] transform scale-x-[-1]">logout</span>
                  خروج
                </button>
              </div>
            </section>
            <div className="flex justify-end gap-4 pt-6 pb-12">
              <button className="px-6 py-3 rounded-xl text-text-muted dark:text-slate-400 font-bold hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-text-main dark:hover:text-white transition-colors">إلغاء</button>
              <button className="px-8 py-3 rounded-xl bg-primary hover:bg-[#d6452b] text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">save</span>
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const ProfileSettingsPage = () => {
  return (
    <ThemeProvider>
      <ProfileSettingsContent />
    </ThemeProvider>
  );
};

export default ProfileSettingsPage;
