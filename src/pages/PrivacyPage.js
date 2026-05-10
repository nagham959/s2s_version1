import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const PrivacyPage = () => {
  const { language, dir } = useLanguage();
  const isRtl = language === 'ar';
  const textStart = isRtl ? 'text-right' : 'text-left';

  const privacyContent = language === 'ar' ? {
    title: 'سياسة الخصوصية لموقع S2S',
    date: 'تاريخ آخر تحديث: 5 مايو 2026',
    intro: 'نحن في فريق عمل S2S نولي أهمية قصوى لخصوصية مستخدمينا. تم تطوير هذا الموقع بهدف كسر حواجز التواصل بين الصم وضعاف السمع والأشخاص المتحدثين باستخدام تقنيات الذكاء الاصطناعي (AI). توضح سياسة الخصوصية هذه كيفية جمعنا للبيانات، استخدامها، وحمايتها.',
    sections: [
      {
        title: '1. المعلومات التي نجمعها',
        content: 'لتقديم خدمة الترجمة الفورية والفعالة، قد يطلب الموقع الوصول إلى البيانات التالية:',
        bullets: [
          'الكاميرا (Camera): نطلب صلاحية الوصول إلى الكاميرا لالتقاط حركات لغة الإشارة الخاصة بك وتمريرها إلى نموذج الذكاء الاصطناعي الخاص بنا لتحليلها وترجمتها.',
          'الميكروفون (Microphone): نطلب صلاحية الوصول إلى الميكروفون لالتقاط الصوت (للمتحدثين) وترجمته إلى لغة إشارة يتم عرضها عبر الشخصية الافتراضية (Avatar).',
          'معلومات الحساب: مثل الاسم وعنوان البريد الإلكتروني عند تسجيل الدخول لتخصيص تجربتك.'
        ]
      },
      {
        title: '2. كيف نستخدم معلوماتك؟',
        content: 'نحن نستخدم البيانات التي يتم جمعها للأغراض التالية حصراً:',
        bullets: [
          'المعالجة الفورية عبر نموذج الذكاء الاصطناعي لترجمة لغة الإشارة إلى نصوص/صوت، والعكس.',
          'تشغيل وتحريك الشخصية الافتراضية للتفاعل معك.',
          'تحسين دقة الترجمة وتطوير أداء الموقع.'
        ]
      },
      {
        title: '3. مشاركة البيانات',
        content: 'نحن لا نخزن أي بيانات ولا نبيع أو نؤجر أو نشارك بياناتك الشخصية أو الفيديوهات أو المقاطع الصوتية مع أي أطراف ثالثة تجارية. تتم المعالجة لغرض تشغيل الخدمة فقط.'
      },
      {
        title: '4. أمان البيانات ومعالجتها',
        content: 'نحن نتخذ تدابير أمنية معقولة لحماية بياناتك. المعالجة الخاصة بالذكاء الاصطناعي تتم بشكل آمن، ولا يتم حفظ مقاطع الفيديو والصوت على خوادمنا بعد انتهاء الترجمة.'
      },
      {
        title: '5. حقوق المستخدم',
        content: 'أنت تمتلك التحكم الكامل في بياناتك. يمكنك من خلال إعدادات الموقع:',
        bullets: [
          'تعديل معلوماتك الشخصية.',
          'سحب صلاحيات الوصول للكاميرا أو الميكروفون من إعدادات جهازك.',
          'طلب حذف حسابك وكافة البيانات المرتبطة به نهائياً.'
        ]
      }
    ]
  } : {
    title: 'Privacy Policy for S2S App',
    date: 'Last Updated: May 5, 2026',
    intro: 'We at the S2S team place the utmost importance on your privacy. This app was developed to bridge communication barriers between deaf and hard of hearing communities and hearing people using AI technologies. This privacy policy outlines how we collect, use, and protect your data.',
    sections: [
      {
        title: '1. Information We Collect',
        content: 'To provide instant and effective translation services, the app may request access to the following data:',
        bullets: [
          'Camera: We request permission to access your camera to capture your sign language movements and send them to our AI model for analysis and translation.',
          'Microphone: We request permission to access your microphone to capture audio (for speakers) and translate it into sign language displayed via the Avatar.',
          'Account Information: Such as your name and email address when signing in to personalize your experience.'
        ]
      },
      {
        title: '2. How We Use Your Information',
        content: 'We use the collected data exclusively for the following purposes:',
        bullets: [
          'Real-time processing via our AI model to translate sign language to text/speech and vice versa.',
          'Operating and animating the Avatar to interact with you.',
          'Improving translation accuracy and enhancing app performance.'
        ]
      },
      {
        title: '3. Data Sharing',
        content: 'We do not store any data and do not sell, rent, or share your personal information, videos, or audio clips with any third-party commercial entities. Processing is done solely for operating the service.'
      },
      {
        title: '4. Data Security and Processing',
        content: 'We take reasonable security measures to protect your data. AI processing is done securely, and video and audio clips are not saved on our servers after translation is complete.'
      },
      {
        title: '5. User Rights',
        content: 'You have full control over your data. Through the app settings, you can:',
        bullets: [
          'Modify your personal information.',
          'Revoke camera and microphone access permissions from your device settings.',
          'Request permanent deletion of your account and all associated data.'
        ]
      }
    ]
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
          <section className="py-20 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className={`text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-6 ${textStart}`}>
                {privacyContent.title}
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-sm mb-6">
                {privacyContent.date}
              </p>
            </div>
          </section>

          {/* Content */}
          <section className="py-16 px-6 lg:px-40 bg-background-light dark:bg-background-dark">
            <div className="mx-auto max-w-[960px]">
              <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 md:p-12">
                <p className={`text-text-sub dark:text-slate-400 text-base leading-relaxed mb-8 ${textStart}`}>
                  {privacyContent.intro}
                </p>
                
                {privacyContent.sections.map((section, idx) => (
                  <div key={idx} className={`mb-8 last:mb-0 ${textStart}`}>
                    <h2 className="text-xl md:text-2xl font-bold text-text-main dark:text-white mb-4">
                      {section.title}
                    </h2>
                    <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed mb-4">
                      {section.content}
                    </p>
                    {section.bullets && (
                      <ul className={`space-y-3 ${isRtl ? 'pr-6' : 'pl-6'}`}>
                        {section.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-text-sub dark:text-slate-400 text-base leading-relaxed flex gap-3">
                            <span className="text-primary font-bold flex-shrink-0">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
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

export default PrivacyPage;
