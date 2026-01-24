import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-white">
        <Navbar
          variant="dashboard"
          logo="مترجم الإشارة"
          userProfile="https://lh3.googleusercontent.com/aida-public/AB6AXuDGZQ2Lpmsf2wWPOWbV1NwlSV8apne6XJ1_XsdsDMPhMvbqdiB66HO7PwhmU_DZTGa6XlUQi5NVf0ujJTsRg4xtUU-6Wpwu1Szn_yfiAymfFaKdYMd8GtdBtqSVa2dEtUo31mAq1yjcN548LRNthF2qQ3SvvYs8XgIPbGqY_6lqeleuYwzMPOEvLLIY7inFcwQ0YfJMkt5hTPtZRHcnrLG52YPO27f3HamgyAdtmNaRMhqerd6BtQXWBQd7qpEIe_cy5RZwIEhYib8"
        />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <section className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">مرحباً بعودتك، أليكس</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg">ماذا تود أن تترجم اليوم؟</p>
            </div>
            <button
              onClick={() => navigate('/sign-to-voice')}
              className="group flex items-center gap-3 bg-primary hover:bg-primary-hover text-white pl-8 pr-2 py-2 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1 focus:ring-4 focus:ring-primary/30 focus:outline-none relative"
            >
              <div className="relative flex items-center justify-center w-12 h-12 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                <span className="material-symbols-outlined text-2xl">interpreter_mode</span>
                <span className="absolute top-0 right-0 -mt-0.5 -mr-0.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500 border-2 border-primary"></span>
                </span>
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-lg font-bold">بدء الترجمة لمكالمة الآن</span>
              </div>
            </button>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="group card-hover-effect bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1 flex flex-col h-full">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-slate-100 dark:bg-slate-700">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuJ3OPNdgiyfhSMVVqkOI_Q4TFN-MonXbte24Cszj0wqZeIMyqY0LDYQlwVRn5emcgAQUb2zfN6aKEwuAdlKhYFc0u30YazAPKXGVThgOGhPfeqysKD9iFaUvRtkb-tNuROBnIKsvGi2VGJZXtf4gxuwTf12Ban0Rb0htl0yh73_ddLZrFozhZb1uLBXBdXAOh1a-z5OVfNYKPVokH5E5ar18RZNGX31yOqbW9GadLNGQbW4x5BMcK8rK9mjlQwBZMnR2eS-E9Ul0')" }}
                  alt="Hands performing sign language gestures"
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-3 right-3 flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-xl">camera_alt</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">وضع الكاميرا</span>
                </div>
              </div>
              <div className="px-4 pb-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  لغة الإشارة <span className="material-symbols-outlined text-primary text-sm transform rotate-180">arrow_right_alt</span> صوت
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  استخدم الكاميرا لترجمة إيماءات اليد إلى صوت منطوق في الوقت الفعلي. مثالي للمحادثات المباشرة.
                </p>
                <button
                  onClick={() => navigate('/sign-to-voice')}
                  className="w-full mt-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-4 focus:ring-primary/30 shadow-sm"
                >
                  <span>بدء الترجمة</span>
                  <span className="material-symbols-outlined text-lg transform rotate-180">arrow_right_alt</span>
                </button>
              </div>
            </div>
            <div className="group card-hover-effect bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-1 flex flex-col h-full">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-slate-100 dark:bg-slate-700">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBCAtL_FnNDBegkrcj_Ylfj48O9tlyJgPdJyOIXCLBZ2NYv6yp_OhMczodYBFxFRlLOMqM_YJyGGJYodOb-t7kcgv4RuDaYi21nccw7EYvs4I7gv7sXG1hGxFAcquM29bYqUQISSqrmGs1ibPLi6J03RGjyO3pg9imtfSHHgPiNJkbdbl2oDDSq_SHjW5ttuQ9n6tyR37x5teZVhKm_IVzi7QqhGcfOBqWFVdBIWcsfN5SCWPKoAWHeluBtcFlCFKIQz0VeqymRP-4')" }}
                  alt="3D digital avatar model"
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-3 right-3 flex items-center gap-2 text-white">
                  <span className="material-symbols-outlined text-xl">mic</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">وضع الميكروفون</span>
                </div>
              </div>
              <div className="px-4 pb-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  صوت <span className="material-symbols-outlined text-primary text-sm transform rotate-180">arrow_right_alt</span> أفاتار
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  حول الكلمات المنطوقة إلى أفاتار ثلاثي الأبعاد بلغة الإشارة في الوقت الفعلي. مثالي لإمكانية الوصول الرقمي والتواصل عن بعد.
                </p>
                <button
                  onClick={() => navigate('/voice-to-avatar')}
                  className="w-full mt-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-medium py-2.5 px-4 rounded-lg transition-colors focus:ring-4 focus:ring-primary/30 shadow-sm"
                >
                  <span>بدء الترجمة</span>
                  <span className="material-symbols-outlined text-lg">face_3</span>
                </button>
              </div>
            </div>
          </div>
          <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">النشاط الأخير</h3>
              <Link to="/history" className="text-sm font-medium text-primary hover:text-primary-hover flex items-center gap-1">
                عرض السجل الكامل <span className="material-symbols-outlined text-sm">chevron_left</span>
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">النوع</th>
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">المدة/الحجم</th>
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">التاريخ</th>
                    <th className="py-3 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 text-left">الحالة</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="group hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg border border-green-100 dark:border-green-800">
                          <span className="material-symbols-outlined text-lg">mic</span>
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">صوت إلى أفاتار</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-slate-500 dark:text-slate-400">02:14 دقيقة</td>
                    <td className="py-4 px-2 text-slate-500 dark:text-slate-400">الآن</td>
                    <td className="py-4 px-2 text-left">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800">
                        مكتمل
                      </span>
                    </td>
                  </tr>
                  <tr className="group hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-t border-slate-100 dark:border-slate-700">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg border border-primary/20">
                          <span className="material-symbols-outlined text-lg">camera_alt</span>
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">إشارة إلى صوت</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-slate-500 dark:text-slate-400">05:45 دقيقة</td>
                    <td className="py-4 px-2 text-slate-500 dark:text-slate-400">أمس، 4:30 م</td>
                    <td className="py-4 px-2 text-left">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                        مؤرشف
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
        <Sidebar variant="mobile" activeItem="dashboard" />
      </div>
    </ThemeProvider>
  );
};

export default DashboardPage;
