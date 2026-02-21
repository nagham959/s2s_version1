import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import logoSrc from '../assets/logo_s2s.png';

const Navbar = ({
  variant = 'default', // 'default', 'auth', 'dashboard'
  logo = 'SignaryAI',
  navItems = [],
  showAccessibility = true,
  showThemeToggle = true,
  userProfile = null,
  onLoginClick = null,
  onMenuClick = null
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle links that contain a hash (e.g. /#features)
  const handleHashNav = (e, href) => {
    const [path, hash] = href.split('#');
    const targetPath = path || '/';
    e.preventDefault();
    if (location.pathname === targetPath) {
      navigate(href); // updates location.hash
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  // Default navigation items based on variant
  const defaultNavItems = {
    default: [
      { label: 'المميزات', href: '/#features' },
      { label: 'من نحن', href: '/about' },
      { label: 'الأسعار', href: '/pricing' }
    ],
    dashboard: [
      { label: 'لوحة التحكم', href: '/dashboard' },
      { label: 'السجل', href: '/history' },
      { label: 'الإعدادات', href: '/profile-settings' }
    ],
    auth: []
  };

  const items = navItems.length > 0 ? navItems : (defaultNavItems[variant] || []);

  // Logo Image Component
  const LogoImg = ({ className = "h-full w-auto" }) => (
    <img src={logoSrc} alt="SignaryAI Logo" className={className} />
  );

  // Render based on variant
  if (variant === 'auth') {
    return (
      <header className="w-full border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 sm:px-10 sticky top-0 z-50 transition-colors">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-12 flex items-center justify-center">
              <LogoImg />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{logo}</h1>
          </Link>
          <div className="flex items-center gap-3">
            {showAccessibility && (
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors focus-visible-ring">
                <span className="material-symbols-outlined text-[20px]">accessibility_new</span>
                <span className="text-sm">خيارات الوصول</span>
              </button>
            )}
            {showThemeToggle && (
              <button
                aria-label="Toggle Theme"
                onClick={toggleTheme}
                className="flex items-center justify-center size-10 rounded-lg bg-background-light dark:bg-[#2a2a2a] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#333] transition-colors focus-visible-ring"
              >
                <span className="material-symbols-outlined">contrast</span>
              </button>
            )}
          </div>
        </div>
      </header>
    );
  }

  if (variant === 'dashboard') {
    return (
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-border-dark shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center size-12 rounded-lg">
                <LogoImg />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{logo}</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {items.map((item, index) => {
                const isActive = item.active || location.pathname === item.href;
                return item.href.startsWith('/') ? (
                  <Link
                    key={index}
                    to={item.href}
                    className={`text-sm font-medium transition-colors ${isActive
                        ? 'text-primary'
                        : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                      }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${isActive
                        ? 'text-primary'
                        : 'text-slate-600 dark:text-slate-400 hover:text-primary'
                      }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
            <div className="flex items-center gap-4">
              {showAccessibility && (
                <button
                  aria-label="Accessibility Options"
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">accessibility_new</span>
                  <span className="hidden lg:inline">إمكانية الوصول</span>
                </button>
              )}
              {showThemeToggle && (
                <button
                  aria-label="Toggle Theme"
                  onClick={toggleTheme}
                  className="flex items-center justify-center size-10 rounded-lg bg-slate-100 dark:bg-[#2a2a2a] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#333] transition-colors"
                >
                  <span className="material-symbols-outlined">contrast</span>
                </button>
              )}
              {userProfile && (
                <Link to="/profile-settings" className="relative size-10 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${userProfile})` }}
                    alt="User profile"
                  ></div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Default variant (home page)
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-border-dark bg-white/95 dark:bg-surface-dark/95 backdrop-blur transition-colors">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-4 text-text-main dark:text-white">
          <div className="size-12">
            <LogoImg />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">{logo}</h2>
        </Link>
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            {items.map((item, index) => {
              const hasHash = item.href.includes('#');
              const [pathPart, hashPart] = item.href.split('#');
              const isActive = hasHash
                ? location.pathname === (pathPart || '/') && location.hash === '#' + hashPart
                : location.pathname === item.href;
              return item.href.startsWith('/') ? (
                <Link
                  key={index}
                  to={item.href}
                  onClick={hasHash ? (e) => handleHashNav(e, item.href) : undefined}
                  className={`text-sm font-medium leading-normal transition-colors relative ${
                    isActive
                      ? 'text-primary font-bold after:absolute after:-bottom-1 after:right-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full'
                      : 'text-text-main dark:text-slate-300 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className={`text-sm font-medium leading-normal transition-colors ${
                    isActive ? 'text-primary font-bold' : 'text-text-main dark:text-slate-300 hover:text-primary'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="flex gap-2">
            {onLoginClick ? (
              <Link
                to="/login"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-colors"
              >
                <span className="truncate">تسجيل الدخول</span>
              </Link>
            ) : null}
            {showAccessibility && (
              <button
                aria-label="Accessibility Options"
                className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-text-main dark:text-slate-300 gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">accessibility_new</span>
              </button>
            )}
            {showThemeToggle && (
              <button
                aria-label="Toggle Theme"
                onClick={toggleTheme}
                className="flex items-center justify-center size-10 rounded-lg bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined">contrast</span>
              </button>
            )}
          </div>
        </div>
        <button
          className="md:hidden p-2 text-text-main dark:text-slate-300"
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            if (onMenuClick) onMenuClick();
          }}
        >
          <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-surface-dark px-6 py-4 flex flex-col gap-1">
          {items.map((item, index) => {
            const hasHash = item.href.includes('#');
            const [pathPart, hashPart] = item.href.split('#');
            const isActive = hasHash
              ? location.pathname === (pathPart || '/') && location.hash === '#' + hashPart
              : location.pathname === item.href;
            return item.href.startsWith('/') ? (
              <Link
                key={index}
                to={item.href}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  if (hasHash) handleHashNav(e, item.href);
                }}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10 font-bold'
                    : 'text-text-main dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 px-4 rounded-xl text-sm font-medium text-text-main dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            );
          })}
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-xl h-11 px-4 bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
            >
              تسجيل الدخول
            </Link>
            <div className="flex gap-2">
              {showThemeToggle && (
                <button
                  aria-label="Toggle Theme"
                  onClick={toggleTheme}
                  className="flex items-center justify-center size-10 rounded-lg bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="material-symbols-outlined">contrast</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
