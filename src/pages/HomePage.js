import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200 font-display rtl" dir="rtl">
        <Navbar variant="default" />
        <main className="flex flex-col flex-1">
          <section className="flex flex-col justify-center py-10 lg:py-24 px-4 md:px-10 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto flex max-w-[1280px] flex-col w-full">
              <div className="flex flex-col-reverse gap-12 lg:flex-row items-center">
                {/* Content Area - Right Aligned */}
                <div className="flex flex-col gap-8 lg:w-1/2 text-right">
                  <div className="flex flex-col gap-6">
                    <h1 className="text-text-main dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl">
                      جسر التواصل: من الإشارة إلى الصوت ومن الصوت إلى الأفاتار.
                    </h1>
                    <h2 className="text-text-sub dark:text-slate-400 text-lg font-normal leading-relaxed max-w-xl ml-auto lg:ml-0">
                      ترجمة فورية بالذكاء الاصطناعي تمكن من إجراء محادثات سلسة بين مستخدمي لغة الإشارة والعالم السامع باستخدام تقنيات تتبع الحركة والمحاكاة المتقدمة.
                    </h2>
                  </div>

                  {/* Buttons Group - Right Aligned */}
                  <div className="flex flex-wrap gap-4 justify-start">
                    <button
                      onClick={() => navigate('/login')}
                      className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-primary text-white text-lg font-bold hover:bg-primary-dark transition-all active:scale-95 shadow-xl shadow-primary/20"
                    >
                      <span className="truncate">ابدأ الترجمة الآن</span>
                    </button>
                  </div>
                </div>

                {/* Visual Area (Image) */}
                <div className="w-full lg:w-1/2">
                  <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-gradient-to-br from-orange-50 to-red-100 border border-white dark:border-slate-700">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-95 transition-transform duration-700 hover:scale-110"
                      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1617791160536-598cf32026fb?q=80&w=1000&auto=format&fit=crop')" }}>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
          <section className="border-y border-gray-100 dark:border-slate-700 bg-background-alt dark:bg-slate-800 py-10">
            <div className="mx-auto max-w-[1280px] px-6 lg:px-40 text-center">
              <p className="text-sm font-semibold text-text-sub dark:text-slate-400 uppercase tracking-widest mb-8">موثوق به من قبل قادة إمكانية الوصول</p>
              <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                <span className="text-xl font-black text-gray-400 dark:text-slate-500">HealthPlus</span>
                <span className="text-xl font-black text-gray-400 dark:text-slate-500">EduTech</span>
                <span className="text-xl font-black text-gray-400 dark:text-slate-500">AccessAI</span>
                <span className="text-xl font-black text-gray-400 dark:text-slate-500">GlobalSign</span>
              </div>
            </div>
          </section>
          <section className="pt-20 pb-10 px-6 lg:px-40 flex justify-center bg-white dark:bg-surface-dark">
            <div className="max-w-[960px] w-full text-center">
              <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">المميزات</h2>
              <h3 className="text-text-main dark:text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em]">القدرات الأساسية</h3>
              <p className="mt-4 text-text-sub dark:text-slate-400 max-w-2xl mx-auto text-lg">تسد منصتنا الفجوة بأدوات ترجمة متقدمة تعتمد على الذكاء الاصطناعي ومصممة للتفاعلات الواقعية.</p>
            </div>
          </section>
          <section className="pb-20 px-6 lg:px-40 flex justify-center bg-white dark:bg-surface-dark">
            <div className="max-w-[1280px] w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">sign_language</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-text-main dark:text-white text-xl font-bold leading-tight">من الإشارة إلى الصوت</h4>
                    <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">ترجمة فورية لإيماءات لغة الإشارة التي تلتقطها الكاميرا إلى صوت منطوق وواضح.</p>
                  </div>
                </div>
                <div className="group flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">record_voice_over</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-text-main dark:text-white text-xl font-bold leading-tight">من الصوت إلى الإشارة</h4>
                    <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">تحويل الكلمات المنطوقة أو النصوص إلى أفاتار ثلاثي الأبعاد واقعي يترجم بالإشارة في الوقت الفعلي بتعابير دقيقة.</p>
                  </div>
                </div>
                <div className="group flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">videocam</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-text-main dark:text-white text-xl font-bold leading-tight">تكامل الفيديو</h4>
                    <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">يتكامل بسلاسة مع أدوات مؤتمرات الفيديو الشهيرة مثل Zoom و Teams عبر تعريف كاميرا ويب افتراضية.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="py-16 px-6 lg:px-40 bg-background-alt dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
            <div className="mx-auto max-w-[960px] flex flex-col gap-10">
              <div className="text-center">
                <h2 className="text-text-main dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em] mb-4">كيف تعمل المنصة</h2>
                <p className="text-text-sub dark:text-slate-400 text-lg">مسار سلس من الإدخال إلى الفهم.</p>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-x-6 md:gap-x-10 px-4">
                <div className="flex flex-col items-center gap-2 pt-2">
                  <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 border-2 border-primary flex items-center justify-center text-primary z-10">
                    <span className="material-symbols-outlined">videocam</span>
                  </div>
                  <div className="w-0.5 bg-gray-200 dark:bg-slate-600 h-full grow min-h-[60px]"></div>
                </div>
                <div className="flex flex-1 flex-col py-2 pb-12">
                  <h4 className="text-text-main dark:text-white text-xl font-bold mb-2">مصدر الإدخال</h4>
                  <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">التقاط فيديو للمتحدث عبر كاميرا الويب أو إدخال صوت من الميكروفون. يكتشف النظام الوسيلة تلقائيًا.</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-0.5 bg-gray-200 dark:bg-slate-600 h-4"></div>
                  <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 border-2 border-primary flex items-center justify-center text-primary z-10">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                  <div className="w-0.5 bg-gray-200 dark:bg-slate-600 h-full grow min-h-[60px]"></div>
                </div>
                <div className="flex flex-1 flex-col py-2 pb-12">
                  <h4 className="text-text-main dark:text-white text-xl font-bold mb-2">محرك المعالجة بالذكاء الاصطناعي</h4>
                  <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">تحلل شبكاتنا العصبية أشكال اليد وتعبيرات الوجه ولغة الجسد لتحويل الإشارة إلى نص، أو تحليل دلالات الكلام لقواعد تحويل النص إلى إشارة.</p>
                </div>
                <div className="flex flex-col items-center gap-2 pb-2">
                  <div className="w-0.5 bg-gray-200 dark:bg-slate-600 h-4"></div>
                  <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 border-2 border-primary flex items-center justify-center text-primary z-10">
                    <span className="material-symbols-outlined">record_voice_over</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col py-2">
                  <h4 className="text-text-main dark:text-white text-xl font-bold mb-2">ترجمة فورية</h4>
                  <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">يحصل المتلقي على المخرج بالتنسيق المفضل لديه فورًا: صوت مركب أو أفاتار ثلاثي الأبعاد عالي الدقة يترجم بالإشارة.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="py-20 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-4xl bg-primary rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden ring-1 ring-white/10">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150"></div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 relative z-10">هل أنت مستعد لكسر حاجز الصمت؟</h2>
              <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">انضم إلى آلاف المستخدمين وتواصل بحرية بلا حواجز. ابدأ تجربتك المجانية اليوم.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <button
                  onClick={() => navigate('/signup')}
                  className="flex items-center justify-center rounded-xl h-14 px-8 bg-white text-primary text-lg font-bold hover:bg-orange-50 transition-colors shadow-lg"
                >
                  ابدأ مجانًا
                </button>
                <button className="flex items-center justify-center rounded-xl h-14 px-8 bg-primary-dark/40 border border-white/30 text-white text-lg font-bold hover:bg-primary-dark/60 transition-colors backdrop-blur-sm">
                  تواصل مع المبيعات
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer variant="default" />
      </div>
    </ThemeProvider>
  );
};

export default HomePage;
