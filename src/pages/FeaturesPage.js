import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FeaturesPage = () => {
  return (
    <ThemeProvider>
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200 font-display rtl" dir="rtl">
        <Navbar variant="default" />
        <main className="flex flex-col flex-1">

          {/* Hero */}
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">المميزات</h2>
              <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
                كل ما تحتاجه للتواصل بلا حواجز
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                تجمع منصة SignaryAI بين الذكاء الاصطناعي المتقدم وتقنيات تتبع الحركة لتوفير تجربة ترجمة فورية وسلسة.
              </p>
            </div>
          </section>

          {/* Features Grid */}
          <section className="pb-20 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-[1280px]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: 'sign_language',
                    title: 'من الإشارة إلى الصوت',
                    desc: 'ترجمة فورية لإيماءات لغة الإشارة التي تلتقطها الكاميرا إلى صوت منطوق وواضح باستخدام شبكات عصبية متقدمة.'
                  },
                  {
                    icon: 'record_voice_over',
                    title: 'من الصوت إلى الإشارة',
                    desc: 'تحويل الكلمات المنطوقة أو النصوص إلى أفاتار ثلاثي الأبعاد واقعي يترجم بالإشارة في الوقت الفعلي بتعابير دقيقة.'
                  },
                  {
                    icon: 'videocam',
                    title: 'تكامل الفيديو',
                    desc: 'يتكامل بسلاسة مع أدوات مؤتمرات الفيديو الشهيرة مثل Zoom و Teams عبر تعريف كاميرا ويب افتراضية.'
                  },
                  {
                    icon: 'psychology',
                    title: 'ذكاء اصطناعي متطور',
                    desc: 'نماذج عصبية مدرّبة على آلاف ساعات من بيانات لغة الإشارة لضمان دقة عالية في الترجمة.'
                  },
                  {
                    icon: 'accessibility_new',
                    title: 'إمكانية الوصول الشاملة',
                    desc: 'مصمم من الأساس ليكون متاحًا للجميع مع دعم كامل لمعايير إمكانية الوصول WCAG 2.1.'
                  },
                  {
                    icon: 'bolt',
                    title: 'أداء فوري',
                    desc: 'معالجة في الوقت الفعلي مع زمن استجابة أقل من 200 ميلي ثانية لضمان تواصل طبيعي وغير منقطع.'
                  },
                ].map((feature, i) => (
                  <div key={i} className="group flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <span className="material-symbols-outlined">{feature.icon}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-text-main dark:text-white text-xl font-bold leading-tight">{feature.title}</h4>
                      <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="py-16 px-6 lg:px-40 bg-background-alt dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
            <div className="mx-auto max-w-[960px] flex flex-col gap-10">
              <div className="text-center">
                <h2 className="text-text-main dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em] mb-4">كيف تعمل المنصة</h2>
                <p className="text-text-sub dark:text-slate-400 text-lg">مسار سلس من الإدخال إلى الفهم.</p>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-x-6 md:gap-x-10 px-4">
                {[
                  { icon: 'videocam', title: 'مصدر الإدخال', desc: 'التقاط فيديو للمتحدث عبر كاميرا الويب أو إدخال صوت من الميكروفون. يكتشف النظام الوسيلة تلقائيًا.' },
                  { icon: 'psychology', title: 'محرك الذكاء الاصطناعي', desc: 'تحلل شبكاتنا العصبية أشكال اليد وتعبيرات الوجه ولغة الجسد لتحويل الإشارة إلى نص.' },
                  { icon: 'record_voice_over', title: 'ترجمة فورية', desc: 'يحصل المتلقي على المخرج بالتنسيق المفضل فورًا: صوت مركب أو أفاتار ثلاثي الأبعاد.' },
                ].map((step, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-2 pt-2">
                      <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 border-2 border-primary flex items-center justify-center text-primary z-10">
                        <span className="material-symbols-outlined">{step.icon}</span>
                      </div>
                      {i < arr.length - 1 && <div className="w-0.5 bg-gray-200 dark:bg-slate-600 h-full grow min-h-[60px]"></div>}
                    </div>
                    <div className={`flex flex-1 flex-col py-2 ${i < arr.length - 1 ? 'pb-12' : ''}`}>
                      <h4 className="text-text-main dark:text-white text-xl font-bold mb-2">{step.title}</h4>
                      <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">{step.desc}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

        </main>
        <Footer variant="default" />
      </div>
    </ThemeProvider>
  );
};

export default FeaturesPage;
