import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const FAQPage = () => {
  const navigate = useNavigate();
  const { t, language, dir } = useLanguage();
  const isRtl = language === 'ar';
  const textStart = isRtl ? 'text-right' : 'text-left';
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqContent = language === 'ar' ? [
    {
      question: 'ما هو موقع S2S؟',
      answer: 'موقع S2S هو مشروع تقني يهدف إلى كسر حواجز التواصل. يقوم الموقع بترجمة لغة الإشارة إلى نصوص وصوت، وكذلك ترجمة الكلام والنصوص إلى لغة إشارة يتم عرضها عبر شخصية افتراضية (Avatar) باستخدام تقنيات الذكاء الاصطناعي.'
    },
    {
      question: 'هل الموقع يدعم لغة الإشارة العربية؟',
      answer: 'نعم، تم تطوير نماذج الذكاء الاصطناعي الخاصة بنا بشكل أساسي للتعرف على لغة الإشارة العربية (المصرية) (S2S - Sign to Speech/Speech to Sign) لخدمة المجتمع العربي والمصري.'
    },
    {
      question: 'هل أحتاج إلى إنترنت لاستخدام الموقع؟',
      answer: 'نعم، يتطلب الموقع اتصالاً بالإنترنت لإجراء الترجمة الفورية، حيث يعتمد على خوادمنا السحابية لمعالجة بيانات الكاميرا والصوت عبر الذكاء الاصطناعي بسرعة ودقة.'
    },
    {
      question: 'كيف تعمل الشخصية الافتراضية (Avatar)؟',
      answer: 'عندما يتحدث شخص ما في الميكروفون أو يكتب نصاً، يقوم الذكاء الاصطناعي بتحليل الجملة وتحويلها إلى حركات لغة إشارة دقيقة، تقوم الشخصية الافتراضية بأدائها فوراً ليتمكن الشخص الأصم من فهمها.'
    },
    {
      question: 'هل يحتفظ الموقع بمقاطع الفيديو أو الصوت الخاصة بي؟',
      answer: 'لا، نحن نحترم خصوصيتك تماماً. تتم المعالجة لحظياً (Real-time)، ولا نقوم بحفظ الفيديوهات أو المقاطع الصوتية على خوادمنا بعد انتهاء عملية الترجمة.'
    },
    {
      question: 'كيف يمكنني الإبلاغ عن خطأ في الترجمة؟',
      answer: 'بما أن نموذج الذكاء الاصطناعي في مرحلة التطور والتعلم المستمر، قد تحدث بعض الأخطاء. يمكنك مساعدتنا في تحسينه من خلال خيار "الإبلاغ عن مشكلة" الموجود في شاشة "المساعدة والدعم" داخل الموقع.'
    }
  ] : [
    {
      question: 'What is the S2S website?',
      answer: 'The S2S website is a technical project aimed at breaking down communication barriers. The website translates sign language into text and speech, and also translates spoken words and text into sign language displayed through a virtual character (Avatar) using AI technologies.'
    },
    {
      question: 'Does the website support Arabic Sign Language?',
      answer: 'Yes, our AI models were developed specifically to recognize Arabic Sign Language (Egyptian) (S2S - Sign to Speech/Speech to Sign) to serve the Arab and Egyptian communities.'
    },
    {
      question: 'Do I need the internet to use the website?',
      answer: 'Yes, the website requires an internet connection for real-time translation, as it relies on our cloud servers to process camera and audio data via AI with speed and accuracy.'
    },
    {
      question: 'How does the virtual character (Avatar) work?',
      answer: 'When someone speaks into the microphone or types text, the AI analyzes the sentence and converts it into precise sign language movements. The virtual character performs them instantly so a deaf person can understand.'
    },
    {
      question: 'Does the website keep my videos or audio recordings?',
      answer: 'No, we respect your privacy completely. Processing is done in real-time, and we do not save videos or audio clips on our servers after the translation is complete.'
    },
    {
      question: 'How can I report a translation error?',
      answer: 'Since the AI model is in continuous development and learning, some errors may occur. You can help us improve it through the "Report an issue" option located in the "Help and Support" screen within the website.'
    }
  ];

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
                {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
              </h1>
              <p className="text-text-sub dark:text-slate-400 text-lg leading-relaxed">
                {language === 'ar' ? 'اطّلع على الإجابات الشاملة لأسئلتك الشائعة حول موقع S2S' : 'Find comprehensive answers to your common questions about the S2S website'}
              </p>
            </div>
          </section>

          {/* FAQ Content */}
          <section className="py-16 px-6 lg:px-40 bg-background-light dark:bg-background-dark">
            <div className="mx-auto max-w-[960px]">
              <div className="space-y-4">
                {faqContent.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden transition-all duration-300 hover:shadow-md"
                  >
                    <button
                      onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                      className={`w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${textStart}`}
                    >
                      <h3 className="text-lg font-semibold text-text-main dark:text-white text-start flex-1">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0 ml-4">
                        <span className={`material-symbols-outlined transition-transform duration-300 text-primary ${expandedIndex === index ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </div>
                    </button>

                    {expandedIndex === index && (
                      <div className={`border-t border-gray-200 dark:border-slate-700 px-6 py-5 bg-gray-50 dark:bg-slate-700/50 ${textStart}`}>
                        <p className="text-text-sub dark:text-slate-400 text-base leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6 lg:px-40 bg-white dark:bg-surface-dark text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-text-main dark:text-white text-3xl font-bold mb-4">
                {language === 'ar' ? 'لم تجد الإجابة التي تبحث عنها؟' : "Didn't find your answer?"}
              </h2>
              <p className="text-text-sub dark:text-slate-400 text-lg mb-8">
                {language === 'ar' ? 'تواصل معنا مباشرة عبر صفحة الاتصال' : 'Contact us directly through our contact page'}
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </button>
            </div>
          </section>

        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default FAQPage;
