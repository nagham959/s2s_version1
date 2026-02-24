import React, { useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <ThemeProvider>
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200 font-display rtl" dir="rtl">
        <Navbar variant="default" />
        <main className="flex flex-col flex-1">

          {/* Hero */}
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center border-b border-gray-100 dark:border-slate-700">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">تواصل معنا</h2>
              <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-4">
                كيف يمكننا مساعدتك؟
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-lg leading-relaxed">
                فريقنا مستعد للإجابة على جميع استفساراتك. سنرد عليك خلال 24 ساعة.
              </p>
            </div>
          </section>

          {/* Contact Info + Form */}
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-3 gap-10">

              {/* Info Cards */}
              <div className="flex flex-col gap-6">
                {[
                  { icon: 'email', title: 'البريد الإلكتروني', value: 'support@signaryai.com' },
                  { icon: 'schedule', title: 'ساعات العمل', value: 'الأحد - الخميس، 9ص - 5م' },
                  { icon: 'location_on', title: 'الموقع', value: 'القاهرة، مصر' },
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined">{info.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-text-main dark:text-white font-bold mb-1">{info.title}</h4>
                      <p className="text-text-sub dark:text-slate-400 text-sm">{info.value}</p>
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
                    <h3 className="text-text-main dark:text-white text-2xl font-bold">تم إرسال رسالتك!</h3>
                    <p className="text-text-sub dark:text-slate-400">سنتواصل معك قريبًا على بريدك الإلكتروني.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                      className="mt-4 px-6 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h3 className="text-text-main dark:text-white text-xl font-bold mb-2">أرسل لنا رسالة</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-text-main dark:text-white">الاسم</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="اسمك الكامل"
                          className="rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-text-main dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-text-main dark:text-white">البريد الإلكتروني</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="example@email.com"
                          className="rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-text-main dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-text-main dark:text-white">الموضوع</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className="rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-text-main dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                      >
                        <option value="">اختر موضوعًا</option>
                        <option value="support">دعم تقني</option>
                        <option value="billing">الاشتراكات والفواتير</option>
                        <option value="enterprise">استفسار مؤسسي</option>
                        <option value="feedback">اقتراح أو ملاحظة</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-text-main dark:text-white">الرسالة</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="اكتب رسالتك هنا..."
                        className="rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-text-main dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="self-start flex items-center gap-2 rounded-xl h-12 px-8 bg-primary text-white font-bold text-base hover:bg-primary-dark transition-all shadow-lg shadow-primary/20"
                    >
                      <span className="material-symbols-outlined text-xl">send</span>
                      إرسال الرسالة
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
