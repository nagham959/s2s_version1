import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const TermsPage = () => {
  const navigate = useNavigate();
  const { t, language, dir } = useLanguage();
  const isRtl = language === 'ar';
  const textStart = isRtl ? 'text-right' : 'text-left';

  const termsContent = language === 'ar' ? {
    title: 'الشروط والأحكام لموقع S2S',
    date: 'تاريخ الإصدار: 5 مايو 2026',
    intro: 'مرحباً بكم في موقع S2S. يُعد هذا الموقع مبادرة لخدمة المجتمع تهدف بشكل أساسي إلى إزالة الفجوة وتسهيل التواصل الفعال بين مجتمع الصم وضعاف السمع والمجتمع الناطق. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بالشروط والأحكام الموضحة أدناه.',
    sections: [
      {
        title: '1. قبول الشروط',
        content: 'بمجرد استخدامك لموقع S2S، فإنك تقر بقراءتك لهذه الشروط وموافقتك التامة عليها. إذا كنت لا توافق على أي بند من هذه البنود، يُرجى التوقف عن استخدام الموقع فوراً.'
      },
      {
        title: '2. طبيعة الخدمة وإخلاء المسؤولية التقنية',
        content: 'يعتمد الموقع على تقنيات ونماذج الذكاء الاصطناعي (AI) لترجمة لغة الإشارة إلى نصوص/صوت والعكس. يرجى العلم بما يلي:',
        bullets: [
          'الذكاء الاصطناعي في حالة تطور مستمر، ورغم سعينا لأعلى درجات الدقة، قد تحدث بعض الأخطاء في الترجمة.',
          'يُمنع الاعتماد الكلي على الموقع في المواقف الحرجة (مثل الطوارئ الطبية، أو المسائل القانونية، أو القرارات المصيرية). فريق S2S غير مسؤول عن أي ضرر ناتج عن سوء فهم أو خطأ في الترجمة.'
        ]
      },
      {
        title: '3. قواعد الاستخدام المقبول',
        content: 'نحن نقدم هذه الخدمة لدعم المجتمع، ولذلك نلزم المستخدمين بما يلي:',
        bullets: [
          'عدم استخدام الموقع والشخصية الافتراضية (Avatar) لترجمة أو إنتاج محتوى مسيء، أو عنصري، أو يحرّض على الكراهية.',
          'عدم محاولة اختراق الموقع، أو التلاعب بنماذج الذكاء الاصطناعي الخاصة بنا، أو استخدام خوادمنا لأغراض غير مصرح بها.',
          'يحق لإدارة الموقع حظر أي مستخدم ينتهك هذه القواعد دون سابق إنذار.'
        ]
      },
      {
        title: '4. حقوق الملكية الفكرية',
        content: 'جميع حقوق الملكية الفكرية المرتبطة بالموقع، بما في ذلك الأكواد البرمجية، وتصميم الشخصية الافتراضية (Avatar)، ونماذج الذكاء الاصطناعي المُطورة، والشعارات، هي ملكية حصرية لفريق عمل S2S. يُمنع منعاً باتاً نسخها أو الهندسة العكسية لها أو استخدامها لأغراض تجارية دون إذن كتابي مسبق.'
      },
      {
        title: '5. التعديل على الخدمة وإيقافها',
        content: 'نحتفظ بالحق في تعديل، أو تحديث، أو إيقاف الموقع (بشكل مؤقت أو دائم) في أي وقت بغرض الصيانة أو التطوير، ولا نتحمل أي مسؤولية قانونية تجاه المستخدمين في حال توقف الخدمة.'
      },
      {
        title: '6. تحديث الشروط والأحكام',
        content: 'قد نقوم بتحديث هذه الشروط من وقت لآخر لمواكبة التطورات التقنية أو القانونية. استمرارك في استخدام الموقع بعد أي تحديث يُعد موافقة ضمنية منك على الشروط الجديدة.'
      }
    ]
  } : {
    title: 'Terms and Conditions for S2S Website',
    date: 'Release Date: May 5, 2026',
    sections: [
      {
        title: '1. Acceptance of Terms',
        content: 'By downloading or using the S2S website, you acknowledge that you have read these terms and fully agree to them. If you do not agree with any of these provisions, please stop using the website immediately.'
      },
      {
        title: '2. Nature of Service and Technical Disclaimer',
        content: 'The website relies on AI models to translate sign language to text/speech and vice versa. Please note:',
        bullets: [
          'AI is in continuous development, and while we strive for accuracy, translation errors may occur.',
          'Do not rely entirely on the website for critical situations (e.g., medical emergencies, legal matters, life-changing decisions). The S2S team is not responsible for any harm resulting from mistranslation or errors.'
        ]
      },
      {
        title: '3. Acceptable Use Policy',
        content: 'We provide this service to support the community, so we require users to:',
        bullets: [
          'Not use the website and Avatar to translate or produce offensive, racist, or hateful content.',
          'Not attempt to hack the website, manipulate our AI models, or use our servers for unauthorized purposes.',
          'Accept that the website administration may ban any user violating these rules without warning.'
        ]
      },
      {
        title: '4. Intellectual Property Rights',
        content: 'All intellectual property associated with the website, including code, Avatar design, AI models, and logos, is the exclusive property of the S2S team. It is strictly prohibited to copy, reverse-engineer, or use them for commercial purposes without prior written permission.'
      },
      {
        title: '5. Service Modification and Suspension',
        content: 'We reserve the right to modify, update, or suspend the website (temporarily or permanently) at any time for maintenance or development purposes. We assume no legal responsibility toward users in case of service suspension.'
      },
      {
        title: '6. Updates to Terms and Conditions',
        content: 'We may update these terms from time to time to keep pace with technical or legal developments. Your continued use of the website after any update constitutes your implicit acceptance of the new terms.'
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
                {termsContent.title}
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-sm">
                {termsContent.date}
              </p>
            </div>
          </section>

          {/* Content */}
          <section className="py-16 px-6 lg:px-40 bg-background-light dark:bg-background-dark">
            <div className="mx-auto max-w-[960px]">
              <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 md:p-12">
                {termsContent.intro && (
                  <div className={`mb-8 p-6 rounded-lg bg-gray-50 dark:bg-slate-700/50 border-r-4 dark:border-r-primary border-primary ${textStart}`}>
                    <p className="text-text-main dark:text-white font-semibold mb-2">مرحباً بكم في موقع S2S.</p>
                    <p className="text-text-sub dark:text-slate-300 text-base leading-relaxed">
                      {termsContent.intro}
                    </p>
                  </div>
                )}
                {termsContent.sections.map((section, idx) => (
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

export default TermsPage;
