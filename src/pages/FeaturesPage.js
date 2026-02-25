import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturesPage = () => {
  const { t, language, dir } = useLanguage();
  const isRtl = language === 'ar';
  const textStart = isRtl ? 'text-right' : 'text-left';

  return (
    <ThemeProvider>
      <div
        dir={dir}
        className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200 font-display"
      >
        <Navbar variant="default" />
        <main className="flex flex-col flex-1">

          {/* Hero */}
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center">
            <div className="mx-auto max-w-3xl flex flex-col gap-4">
              <h2 className="text-primary font-bold tracking-wide uppercase text-sm">{t('featuresPage.hero.eyebrow')}</h2>
              <h1 className={`text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] ${textStart}`}>
                {t('featuresPage.hero.title')}
              </h1>
              <p className={`text-text-sub dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto ${textStart}`}>
                {t('featuresPage.hero.subtitle')}
              </p>
            </div>
          </section>

          {/* Feature cards */}
          <section className="pb-20 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-[1280px]">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {t('featuresPage.featureCards', []).map((feature, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-background-alt dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 text-primary flex items-center justify-center text-2xl">
                      <span className="material-symbols-outlined">{feature.icon}</span>
                    </div>
                    <h3 className={`text-text-main dark:text-white text-xl font-bold ${textStart}`}>{feature.title}</h3>
                    <p className={`text-text-sub dark:text-slate-400 text-base leading-relaxed ${textStart}`}>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="py-16 px-6 lg:px-40 bg-background-alt dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700">
            <div className="mx-auto max-w-[960px] flex flex-col gap-10">
              <div className="text-center">
                <h2 className={`text-text-main dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em] mb-4 ${textStart}`}>{t('featuresPage.howItWorks.title')}</h2>
                <p className={`text-text-sub dark:text-slate-400 text-lg ${textStart}`}>{t('featuresPage.howItWorks.subtitle')}</p>
              </div>
              <div className="grid grid-cols-[60px_1fr] gap-x-6 md:gap-x-10 px-4">
                {t('featuresPage.howItWorks.steps', []).map((step, i, arr) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-2 pt-2">
                      <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/20 border-2 border-primary flex items-center justify-center text-primary z-10">
                        <span className="material-symbols-outlined">{step.icon}</span>
                      </div>
                      {i < arr.length - 1 && <div className="w-0.5 bg-gray-200 dark:bg-slate-600 h-full grow min-h-[60px]"></div>}
                    </div>
                    <div className={`flex flex-1 flex-col py-2 ${i < arr.length - 1 ? 'pb-12' : ''}`}>
                      <h4 className={`text-text-main dark:text-white text-xl font-bold mb-2 ${textStart}`}>{step.title}</h4>
                      <p className={`text-text-sub dark:text-slate-400 text-base leading-relaxed ${textStart}`}>{step.description}</p>
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
