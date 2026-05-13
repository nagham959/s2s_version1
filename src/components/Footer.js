import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoSrc from '../assets/logo_s2s.png';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, dir } = useLanguage();

  const handleHashNav = (e, href) => {
    const [path, hash] = href.split('#');
    const targetPath = path || '/';
    e.preventDefault();
    if (location.pathname === targetPath) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(targetPath);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (variant === 'auth') {
    return (
      <footer dir={dir} className="w-full py-6 text-center text-xs text-slate-400 dark:text-slate-600">
        <div className="flex justify-center gap-6 mb-2">
          <Link
            to="/privacy"
            className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            {t('footer.auth.privacy')}
          </Link>
          <Link
            to="/terms"
            className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            {t('footer.auth.terms')}
          </Link>
          <Link
            to="/faq"
            className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            {t('footer.auth.help')}
          </Link>
        </div>
        <p>{t('footer.auth.copyright')}</p>
      </footer>
    );
  }

  // Default variant (home page)
  return (
    <footer dir={dir} className="bg-[#0e151b] dark:bg-background-dark text-white py-12 border-t border-gray-800 dark:border-slate-700">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="size-10">
                <img src={logoSrc} alt="S2S Logo" className="h-full w-auto" />
              </div>
              <span className="text-lg font-bold">S2S</span>
            </div>
            <p className="text-gray-400 dark:text-slate-400 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base mb-1">{t('footer.product')}</h4>
            <Link
              to="/#features"
              onClick={(e) => handleHashNav(e, '/#features')}
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              {t('footer.features')}
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base mb-1">{t('footer.company')}</h4>
            <Link
              to="/about"
              onClick={scrollToTop}
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              {t('footer.about')}
            </Link>
            <Link
              to="/contact"
              onClick={scrollToTop}
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              {t('footer.contact')}
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-base mb-1">{t('footer.legal')}</h4>
            <Link
              to="/privacy"
              onClick={scrollToTop}
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              {t('footer.privacy')}
            </Link>
            <Link
              to="/terms"
              onClick={scrollToTop}
              className="text-gray-400 dark:text-slate-500 hover:text-primary transition-colors text-sm"
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 dark:border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 dark:text-slate-500 text-xs">
            {t('footer.copyright')}
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              aria-label="Twitter"
              disabled
              className="text-gray-400 dark:text-slate-500 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-sm">public</span>
            </button>
            <button
              type="button"
              aria-label="LinkedIn"
              disabled
              className="text-gray-400 dark:text-slate-500 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-sm">group</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
