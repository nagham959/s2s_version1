import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200 font-display rtl" dir="rtl">
        <Navbar variant="default" />
        <main className="flex flex-col flex-1">

          {/* Hero */}
          <section className="py-20 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">من نحن</h2>
              <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
                نؤمن بأن التواصل حق للجميع
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-lg leading-relaxed">
                SignaryAI منصة مبتكرة تهدف إلى كسر الحواجز اللغوية بين مجتمع الصم وعالم السامعين باستخدام أحدث تقنيات الذكاء الاصطناعي.
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-16 px-6 lg:px-40 bg-background-alt dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
            <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">flag</span>
                </div>
                <h3 className="text-text-main dark:text-white text-2xl font-bold">مهمتنا</h3>
                <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">
                  تمكين الأفراد من ذوي الإعاقة السمعية من التواصل بحرية وثقة في كل جوانب حياتهم، سواء في العمل أو التعليم أو التفاعل الاجتماعي، من خلال أدوات ترجمة ذكية ومتاحة.
                </p>
              </div>
              <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
                <h3 className="text-text-main dark:text-white text-2xl font-bold">رؤيتنا</h3>
                <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">
                  عالم لا توجد فيه حواجز لغوية، حيث يستطيع كل إنسان التعبير عن نفسه والتواصل مع الآخرين بصرف النظر عن قدراته الحسية أو اللغوية.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-[960px] text-center mb-12">
              <h2 className="text-text-main dark:text-white text-3xl font-bold mb-4">قيمنا</h2>
              <p className="text-text-sub dark:text-slate-400 text-lg">المبادئ التي تقود كل قرار نتخذه.</p>
            </div>
            <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'favorite', title: 'الشمول', desc: 'نضع إمكانية الوصول في صميم كل ما نبنيه، لأن التكنولوجيا يجب أن تخدم الجميع.' },
                { icon: 'science', title: 'الابتكار', desc: 'نواصل البحث والتطوير لتقديم حلول ترجمة أكثر دقة وطبيعية.' },
                { icon: 'shield', title: 'الخصوصية', desc: 'بيانات المستخدمين مقدسة لدينا، ولا نشارك أي بيانات شخصية مع أطراف ثالثة.' },
              ].map((val, i) => (
                <div key={i} className="flex flex-col gap-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 text-center items-center hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">{val.icon}</span>
                  </div>
                  <h4 className="text-text-main dark:text-white text-xl font-bold">{val.title}</h4>
                  <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          {/* <section className="py-16 px-6 lg:px-40 bg-primary">
            <div className="mx-auto max-w-[1280px] grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
              {[
                { num: '+10K', label: 'مستخدم نشط' },
                { num: '98%', label: 'دقة الترجمة' },
                { num: '<200ms', label: 'زمن الاستجابة' },
                { num: '24/7', label: 'دعم متواصل' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-4xl font-black mb-2">{stat.num}</div>
                  <div className="text-orange-100 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </section> */}

          {/* CTA */}
          <section className="py-20 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center">
            <h2 className="text-text-main dark:text-white text-3xl font-bold mb-4">كن جزءًا من التغيير</h2>
            <p className="text-text-sub dark:text-slate-400 text-lg mb-8 max-w-xl mx-auto">انضم إلينا اليوم وساهم في بناء عالم أكثر شمولًا وتواصلًا.</p>
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center justify-center rounded-xl h-14 px-10 bg-primary text-white text-lg font-bold hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
            >
              ابدأ مجانًا
            </button>
          </section>

        </main>
        <Footer variant="default" />
      </div>
    </ThemeProvider>
  );
};

export default AboutPage;
