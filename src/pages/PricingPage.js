import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PricingPage = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'مجاني',
      price: { monthly: 0, annual: 0 },
      desc: 'مثالي للتجربة والاستخدام الشخصي المحدود.',
      features: [
        'ترجمة حتى 30 دقيقة شهريًا',
        'من الإشارة إلى الصوت',
        'جودة أفاتار أساسية',
        'دعم عبر البريد الإلكتروني',
      ],
      cta: 'ابدأ مجانًا',
      highlight: false,
    },
    {
      name: 'احترافي',
      price: { monthly: 29, annual: 23 },
      desc: 'للأفراد والمحترفين الذين يحتاجون ترجمة غير محدودة.',
      features: [
        'ترجمة غير محدودة',
        'كلا الاتجاهين (إشارة ↔ صوت)',
        'أفاتار ثلاثي الأبعاد عالي الدقة',
        'تكامل مع Zoom و Teams',
        'سجل المحادثات',
        'دعم أولوي',
      ],
      cta: 'ابدأ التجربة المجانية',
      highlight: true,
    },
    {
      name: 'مؤسسي',
      price: { monthly: null, annual: null },
      desc: 'للشركات والمؤسسات التي تحتاج حلولًا مخصصة.',
      features: [
        'كل مميزات الخطة الاحترافية',
        'API مخصص للتكامل',
        'لوحة تحكم إدارية',
        'تدريب مخصص للفريق',
        'SLA مضمون',
        'مدير حساب مخصص',
      ],
      cta: 'تواصل معنا',
      highlight: false,
    },
  ];

  return (
    <ThemeProvider>
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200 font-display rtl" dir="rtl">
        <Navbar variant="default" />
        <main className="flex flex-col flex-1">

          {/* Hero */}
          <section className="py-20 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">الأسعار</h2>
              <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-6">
                خطط تناسب احتياجاتك
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-lg leading-relaxed mb-8">
                ابدأ مجانًا وطوّر خطتك مع نموّك. لا بطاقة ائتمانية مطلوبة.
              </p>
              {/* Toggle */}
              <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${!isAnnual ? 'bg-white dark:bg-slate-700 shadow text-text-main dark:text-white' : 'text-text-sub dark:text-slate-400'}`}
                >
                  شهري
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isAnnual ? 'bg-white dark:bg-slate-700 shadow text-text-main dark:text-white' : 'text-text-sub dark:text-slate-400'}`}
                >
                  سنوي
                  <span className="text-xs bg-primary text-white rounded-full px-2 py-0.5">وفّر 20%</span>
                </button>
              </div>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="pb-20 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col gap-6 rounded-2xl border p-8 transition-all duration-300 ${
                    plan.highlight
                      ? 'border-primary bg-primary text-white shadow-2xl shadow-primary/30 scale-105'
                      : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-xl'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-primary text-xs font-black px-4 py-1 rounded-full shadow">
                      الأكثر شيوعًا
                    </div>
                  )}
                  <div>
                    <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-text-main dark:text-white'}`}>{plan.name}</h3>
                    <p className={`text-sm ${plan.highlight ? 'text-orange-100' : 'text-text-sub dark:text-slate-400'}`}>{plan.desc}</p>
                  </div>
                  <div>
                    {plan.price.monthly === null ? (
                      <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-text-main dark:text-white'}`}>تواصل معنا</span>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span className={`text-5xl font-black ${plan.highlight ? 'text-white' : 'text-text-main dark:text-white'}`}>
                          ${isAnnual ? plan.price.annual : plan.price.monthly}
                        </span>
                        {plan.price.monthly > 0 && (
                          <span className={`text-sm mb-2 ${plan.highlight ? 'text-orange-100' : 'text-text-sub dark:text-slate-400'}`}>/شهر</span>
                        )}
                      </div>
                    )}
                  </div>
                  <ul className="flex flex-col gap-3 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-xl ${plan.highlight ? 'text-orange-200' : 'text-primary'}`}>check_circle</span>
                        <span className={`text-sm ${plan.highlight ? 'text-orange-50' : 'text-text-sub dark:text-slate-400'}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => plan.price.monthly === null ? null : navigate('/signup')}
                    className={`mt-auto flex items-center justify-center rounded-xl h-12 px-6 font-bold text-base transition-all ${
                      plan.highlight
                        ? 'bg-white text-primary hover:bg-orange-50'
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 px-6 lg:px-40 bg-background-alt dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
            <div className="mx-auto max-w-[800px]">
              <h2 className="text-text-main dark:text-white text-3xl font-bold text-center mb-10">أسئلة شائعة</h2>
              <div className="flex flex-col gap-4">
                {[
                  { q: 'هل يمكنني الإلغاء في أي وقت؟', a: 'نعم، يمكنك إلغاء اشتراكك في أي وقت بدون أي رسوم إضافية.' },
                  { q: 'هل البيانات محمية؟', a: 'نعم، جميع البيانات مشفرة ومحمية وفق أعلى معايير الأمان. نحن لا نشارك بياناتك مع أي طرف ثالث.' },
                  { q: 'ما لغات الإشارة المدعومة؟', a: 'ندعم حاليًا لغة الإشارة العربية، ونعمل على إضافة لغات إشارة أخرى.' },
                  { q: 'هل يعمل على الهاتف المحمول؟', a: 'المنصة تعمل على المتصفح سواء على الحاسوب أو الهاتف، وتطبيق الهاتف قادم قريبًا.' },
                ].map((faq, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                    <h4 className="text-text-main dark:text-white font-bold mb-2">{faq.q}</h4>
                    <p className="text-text-sub dark:text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
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

export default PricingPage;
