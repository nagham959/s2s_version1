import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const ProfileSettingsContent = () => {
  const { isDark, toggleTheme } = useTheme();

  // State for user profile and settings
  const [profile, setProfile] = useState({
    name: 'Nagham Ahmed',
    email: 'naghamelsorady@gmail.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1VSvtH1AlkzXbOETNqCK2bOSBX9zehvxrYtg-eU2kf9VmtHAZjwj4vb58SSSx7KEwA4O8dgYp9msr07NT3_4xhpmUb-HH-xn1iF9HZkOjr71J-TqS9cR9vFyvNj9LsoeVAPv4-zgWsZ4MqmTFskzH9cmweAq0KpOYbzv4vwlGjHHqKuo_zxU4zQBLSmlnPCqD-27GLkXf9mzkePEXzgr6UMDnYfI13Rtb0Jl-ns96YAhfq1eWAeHsf3cZ3UG1777wh1L3oXLuCQQ',

    signLanguage: 'asl',
    spokenLanguage: 'en-us'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const fileInputRef = React.useRef(null);

  // Load from localStorage on mount
  React.useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('avatar', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userProfile', JSON.stringify(profile));
      setIsSaving(false);
      setNotification({ type: 'success', message: 'تم حفظ التغييرات بنجاح!' });

      // Hide notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }, 1000);
  };

  return (
    <div className="bg-background-subtle dark:bg-background-dark font-display text-text-main dark:text-white antialiased min-h-screen flex flex-col relative">
      <Navbar variant="dashboard" logo="SignVoice" />

      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-300 animate-fade-in-down ${notification.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
          <span className="material-symbols-outlined">{notification.type === 'success' ? 'check_circle' : 'error'}</span>
          <span className="font-bold">{notification.message}</span>
        </div>
      )}

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-main dark:text-white tracking-tight mb-3">الملف الشخصي والإعدادات</h1>
            <p className="text-text-muted dark:text-slate-400 text-lg max-w-2xl leading-relaxed">قم بإدارة هويتك وتفضيلاتك وخيارات إمكانية الوصول لتخصيص تجربتك في SignaryAI</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-light dark:bg-slate-800 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-black/50 border border-border-light dark:border-slate-700 p-8 flex flex-col items-center text-center">
              <div className="relative group mb-6">
                <div
                  className="h-36 w-36 rounded-full bg-cover bg-center shadow-lg ring-4 ring-background-subtle dark:ring-slate-700 transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${profile.avatar}')` }}
                ></div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  aria-label="تعديل الصورة الرمزية"
                  className="absolute bottom-1 right-1 bg-primary text-white p-2.5 rounded-full shadow-lg hover:bg-[#d6452b] transition-all hover:scale-110 focus:ring-4 focus:ring-primary/30 border-2 border-surface-light dark:border-slate-800"
                >
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
              </div>

              {/* Editable Name */}
              <div className="w-full mb-1">
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="text-2xl font-bold text-text-main dark:text-white text-center bg-transparent border-b-2 border-transparent hover:border-gray-200 focus:border-primary focus:outline-none w-full transition-colors pb-1"
                />
              </div>

              {/* Editable Email */}
              <div className="w-full mb-8">
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="text-text-muted dark:text-slate-400 font-medium text-center bg-transparent border-b-2 border-transparent hover:border-gray-200 focus:border-primary focus:outline-none w-full transition-colors pb-1 dir-ltr"
                />
              </div>

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
                      value={profile.signLanguage}
                      onChange={(e) => handleChange('signLanguage', e.target.value)}
                    >
                      <option value="asl">لغة الإشارة الانجليزية (ASL)</option>
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
                      value={profile.spokenLanguage}
                      onChange={(e) => handleChange('spokenLanguage', e.target.value)}
                    >
                      <option value="en-us">الإنجليزية (الولايات المتحدة)</option>
                      <option value="ar">العربية (فصحى) - رسمي</option>
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

              </div>
            </section>
            <section className="bg-surface-light dark:bg-slate-800 rounded-2xl shadow-sm border border-border-light dark:border-slate-700 overflow-hidden">
              <div className="px-8 py-5 border-b border-border-light dark:border-slate-700 flex items-center gap-3 bg-gray-50 dark:bg-slate-700">
                <span className="material-symbols-outlined text-primary text-[24px]">manage_accounts</span>
                <h2 className="text-lg font-bold text-text-main dark:text-white">أمان الحساب</h2>
              </div>
              <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-bold text-text-main dark:text-white text-base">كلمة المرور</p>
                  <div className="flex items-center gap-2 text-sm text-text-muted dark:text-slate-400">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>تم التغيير آخر مرة منذ 3 أشهر</span>
                  </div>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Link to="/change-password" className="flex-1 sm:flex-none whitespace-nowrap px-5 py-2.5 bg-transparent border border-border-light dark:border-slate-600 rounded-xl text-sm font-bold text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-400 dark:hover:border-slate-500 transition-all shadow-sm">
                    تغيير كلمة المرور
                  </Link>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 px-8 py-6 border-t border-red-100 dark:border-red-800 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm font-bold text-red-600 dark:text-red-400">تسجيل الخروج</p>
                  <p className="text-xs text-red-500 dark:text-red-400 mt-1">تسجيل الخروج بشكل آمن من حسابك على هذا الجهاز.</p>
                </div>
                <button
                  onClick={() => alert("سيتم تسجيل الخروج...")}
                  className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-700 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px] transform scale-x-[-1]">logout</span>
                  خروج
                </button>
              </div>
            </section>
            <div className="flex justify-end gap-4 pt-6 pb-12">
              <button
                className="px-6 py-3 rounded-xl text-text-muted dark:text-slate-400 font-bold hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-text-main dark:hover:text-white transition-colors"
                onClick={() => window.location.reload()}
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-8 py-3 rounded-xl bg-primary hover:bg-[#d6452b] text-white font-bold shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSaving ? (
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
                ) : (
                  <span className="material-symbols-outlined text-[20px]">save</span>
                )}
                {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </button>
            </div>
          </div>
        </div>
      </main>
      <Sidebar variant="mobile" activeItem="settings" />
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
