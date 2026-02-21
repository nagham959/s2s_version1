import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage = () => {
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
                سياسة الخصوصية
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-sm">آخر تحديث: فبراير 2026</p>
            </div>
          </section>

          {/* Content */}
          <section className="py-16 px-6 lg:px-40 bg-white dark:bg-surface-dark">
            <div className="mx-auto max-w-[800px] flex flex-col gap-10 text-text-sub dark:text-slate-400 text-base leading-relaxed">

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">1. مقدمة</h2>
                <p>تلتزم SignaryAI بحماية خصوصيتك. توضح هذه السياسة كيفية جمع بياناتك واستخدامها وحمايتها عند استخدامك لمنصتنا.</p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">2. البيانات التي نجمعها</h2>
                <p>نجمع الأنواع التالية من البيانات:</p>
                <ul className="list-disc list-inside flex flex-col gap-2 pr-4">
                  <li><strong className="text-text-main dark:text-white">بيانات الحساب:</strong> الاسم، البريد الإلكتروني، كلمة المرور (مشفرة)</li>
                  <li><strong className="text-text-main dark:text-white">بيانات الاستخدام:</strong> سجلات الترجمة، مدة الجلسات</li>
                  <li><strong className="text-text-main dark:text-white">بيانات تقنية:</strong> عنوان IP، نوع المتصفح، نظام التشغيل</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">3. كيف نستخدم بياناتك</h2>
                <p>نستخدم البيانات المجمعة من أجل:</p>
                <ul className="list-disc list-inside flex flex-col gap-2 pr-4">
                  <li>تقديم خدمات الترجمة وتحسينها</li>
                  <li>تخصيص تجربة المستخدم</li>
                  <li>إرسال الإشعارات والتحديثات المهمة</li>
                  <li>تحليل الأداء والكشف عن الأخطاء</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">4. مشاركة البيانات</h2>
                <p>لا نبيع أو نؤجر بياناتك لأي طرف ثالث. قد نشارك البيانات فقط في الحالات التالية:</p>
                <ul className="list-disc list-inside flex flex-col gap-2 pr-4">
                  <li>بموافقتك الصريحة</li>
                  <li>الامتثال للمتطلبات القانونية</li>
                  <li>مزودي الخدمات الموثوقين الملزمين بسياسات سرية صارمة</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">5. أمان البيانات</h2>
                <p>نطبق تشفير TLS لجميع البيانات المنقولة، ونخزّن البيانات الحساسة بتشفير AES-256. نجري مراجعات أمنية دورية للحفاظ على سلامة بياناتك.</p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">6. حقوقك</h2>
                <p>لديك الحق في:</p>
                <ul className="list-disc list-inside flex flex-col gap-2 pr-4">
                  <li>الوصول إلى بياناتك الشخصية</li>
                  <li>تصحيح أي بيانات غير دقيقة</li>
                  <li>طلب حذف بياناتك (حق النسيان)</li>
                  <li>الاعتراض على معالجة بياناتك</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">7. ملفات تعريف الارتباط</h2>
                <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك وحفظ تفضيلاتك. يمكنك التحكم في هذه الملفات من إعدادات متصفحك.</p>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-text-main dark:text-white text-xl font-bold">8. تواصل معنا</h2>
                <p>لممارسة حقوقك أو لأي استفسار يتعلق بالخصوصية، تواصل معنا عبر صفحة <a href="/contact" className="text-primary hover:underline">اتصل بنا</a>.</p>
              </div>

            </div>
          </section>

        </main>
        <Footer variant="default" />
      </div>
    </ThemeProvider>
  );
};

export default PrivacyPage;
