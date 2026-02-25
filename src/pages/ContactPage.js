import React, { useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { t, language, dir } = useLanguage();
  const isRtl = language === 'ar';
  const textStart = isRtl ? 'text-right' : 'text-left';
  const infoCards = t('contact.infoCards', []);
  const formCopy = t('contact.form', {});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">{t('contact.hero.eyebrow')}</h2>
              <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-4">
                {t('contact.hero.title')}
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-lg leading-relaxed">
                {t('contact.hero.subtitle')}
              </p>
            </div>
          </section>

          {/* Contact Info + Form */}
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-3 gap-10">

              {/* Info Cards */}
              <div className="flex flex-col gap-6">
                {infoCards.map((info, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined">{info.icon}</span>
                    </div>
                    <div>
                      <h4 className={`text-text-main dark:text-white font-bold mb-1 ${textStart}`}>{info.title}</h4>
                      <p className={`text-text-sub dark:text-slate-400 text-sm ${textStart}`}>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="md:col-span-2 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <h3 className="text-text-main dark:text-white text-2xl font-bold">{t('contact.submitted.title')}</h3>
                    <p className="text-text-sub dark:text-slate-400">{t('contact.submitted.subtitle')}</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                      className="mt-4 px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
                    >
                      {t('contact.submitted.cta')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h3 className={`text-text-main dark:text-white text-xl font-bold mb-2 ${textStart}`}>{formCopy.title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-text-main dark:text-white">{formCopy.name}</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder={formCopy.placeholders?.name}
                          className="rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-text-main dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-text-main dark:text-white">{formCopy.email}</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder={formCopy.placeholders?.email}
                          className="rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-text-main dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-text-main dark:text-white">{formCopy.subject}</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-text-main dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                      >
                        <option value="">{formCopy.select}</option>
                        {Object.entries(formCopy.subjects || {}).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-text-main dark:text-white">{formCopy.message}</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder={formCopy.placeholders?.message}
                        className="rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-text-main dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="self-start flex items-center gap-2 rounded-xl h-12 px-8 bg-primary text-white font-bold text-base hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                    >
                      <span className="material-symbols-outlined text-xl">send</span>
                      {formCopy.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>

        </main>
        <Footer variant="default" />
      </div>
    </ThemeProvider>
  );
};

export default ContactPage;
