import React from 'react';

const Footer = ({ variant = 'default' }) => {
  // Logo SVG Component
  const LogoIcon = () => (
    <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
    </svg>
  );

  if (variant === 'auth') {
    return (
      <footer className="w-full py-6 text-center text-xs text-slate-400 dark:text-slate-600">
        <div className="flex justify-center gap-6 mb-2">
          <a
            href="/"
            className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            سياسة الخصوصية
          </a>
          <a
            href="/"
            className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            شروط الخدمة
          </a>
          <a
            href="/"
            className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            مركز المساعدة
          </a>
        </div>
        <p>© 2025 SignaryAI Inc. جميع الحقوق محفوظة.</p>
      </footer>
    );
  }

  // Default variant (home page)
  return (
    <footer className="bg-[#0e151b] dark:bg-background-dark text-white py-12 border-t border-gray-800 dark:border-slate-700">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="size-6 text-primary">
                <LogoIcon />
              </div>
              <span className="text-lg font-bold">SignaryAI</span>
            </div>
            <p className="text-gray-400 dark:text-slate-400 text-sm leading-relaxed">
              نجعل العالم أكثر سهولة في الوصول، إيماءة تلو الأخرى.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base mb-1">المنتج</h4>
            <a
              href="#features"
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              المميزات
            </a>
            <a
              href="#pricing"
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              الأسعار
            </a>
            <a
              href="#enterprise"
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              الشركات
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base mb-1">الشركة</h4>
            <a
              href="#about"
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              من نحن
            </a>
            <a
              href="#careers"
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              الوظائف
            </a>
            <a
              href="#contact"
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              اتصل بنا
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base mb-1">قانوني</h4>
            <a
              href="#privacy"
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              سياسة الخصوصية
            </a>
            <a
              href="#terms"
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              شروط الخدمة
            </a>
            <a
              href="#accessibility"
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              بيان إمكانية الوصول
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 dark:border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-slate-500 text-xs">
            © 2025 SignaryAI Inc. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4">
            <a
              aria-label="Twitter"
              href="/"
              className="text-gray-400 dark:text-slate-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a
              aria-label="LinkedIn"
              href="/"
              className="text-gray-400 dark:text-slate-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">group</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
