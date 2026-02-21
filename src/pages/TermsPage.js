import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsPage = () => {
  return (
    <ThemeProvider>
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-text-main dark:text-white transition-colors duration-200 font-display rtl" dir="rtl">
        <Navbar variant="default" />
        <main className="flex flex-col flex-1">

          {/* Hero */}
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center border-b border-gray-100 dark:border-slate-700">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-primary font-bold tracking-wide uppercase text-sm mb-3">قانوني</h2>
              <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-4">
                شروط الخدمة
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-sm">آخر تحديث: فبراير 2026</p>
            </div>
          </section>

          {/* Content */}
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-[800px] flex flex-col gap-10 text-text-sub dark:text-slate-400 text-base leading-relaxed">

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">1. قبول الشروط</h2>
                <p>باستخدام منصة SignaryAI، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يُرجى التوقف عن استخدام الخدمة.</p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">2. وصف الخدمة</h2>
                <p>تقدم SignaryAI خدمات ترجمة لغة الإشارة إلى صوت وصوت إلى لغة إشارة باستخدام تقنيات الذكاء الاصطناعي. الخدمة مخصصة للاستخدام الشخصي والمهني المشروع فقط.</p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">3. حساب المستخدم</h2>
                <p>أنت مسؤول عن الحفاظ على سرية بيانات تسجيل الدخول الخاصة بك. يجب إخطارنا فورًا عند اشتباهك في أي استخدام غير مصرح به لحسابك. لا تتحمل SignaryAI مسؤولية أي خسائر ناجمة عن إخفاقك في حماية بيانات حسابك.</p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">4. الاستخدام المقبول</h2>
                <p>يُحظر استخدام المنصة في:</p>
                <ul className="list-disc list-inside flex flex-col gap-2 pr-4">
                  <li>أي نشاط غير قانوني أو ضار</li>
                  <li>انتهاك حقوق الملكية الفكرية</li>
                  <li>نشر محتوى مسيء أو تمييزي</li>
                  <li>محاولة اختراق أو تعطيل الخدمة</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">5. الملكية الفكرية</h2>
                <p>جميع حقوق الملكية الفكرية للمنصة وما تحتويه من تقنيات ومحتوى محفوظة لـ SignaryAI. لا يُسمح بنسخ أو توزيع أو تعديل أي جزء من الخدمة دون إذن كتابي مسبق.</p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">6. إخلاء المسؤولية</h2>
                <p>تُقدَّم الخدمة "كما هي" دون أي ضمانات. لا تضمن SignaryAI دقة الترجمة في جميع الأوقات، ولا تتحمل مسؤولية أي ضرر ناجم عن استخدام الخدمة أو الاعتماد عليها في مواقف تتطلب دقة مطلقة.</p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">7. التعديلات على الشروط</h2>
                <p>تحتفظ SignaryAI بحق تعديل هذه الشروط في أي وقت. سيتم إشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار داخل التطبيق. استمرارك في استخدام الخدمة بعد التعديلات يُعد قبولًا لها.</p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">8. التواصل معنا</h2>
                <p>لأي استفسارات حول هذه الشروط، يُرجى التواصل معنا عبر صفحة <a href="/contact" className="text-primary hover:underline">اتصل بنا</a>.</p>
              </div>

            </div>
          </section>

        </main>
        <Footer variant="default" />
      </div>
    </ThemeProvider>
  );
};

export default TermsPage;
