import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const TermsPage = () => {
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
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center border-b border-gray-100 dark:border-slate-700">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">{t('terms.hero.eyebrow')}</h2>
              <h1 className={`text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-4 ${textStart}`}>
                {t('terms.hero.title')}
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-sm">{t('terms.hero.updated')}</p>
            </div>
          </section>

          {/* Content */}
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-[800px] flex flex-col gap-10 text-text-sub dark:text-slate-400 text-base leading-relaxed">

              {t('terms.sections', []).map((section, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <h2 className={`text-text-main dark:text-white text-xl font-bold ${textStart}`}>{section.title}</h2>
                  <p className={textStart}>{section.body}</p>
                  {section.list && (
                    <ul className={`list-disc list-inside flex flex-col gap-2 ${isRtl ? 'pr-4' : 'pl-4'}`}>
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.linkText && (
                    <a href="/contact" className="text-primary hover:underline self-start">
                      {section.linkText}
                    </a>
                  )}
                </div>
              ))}

            </div>
          </section>

        </main>
        <Footer variant="default" />
      </div>
    </ThemeProvider>
  );
};

export default TermsPage;
