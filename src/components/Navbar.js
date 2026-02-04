import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

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
  const { toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Default navigation items based on variant
  const defaultNavItems = {
    default: [
      { label: 'المميزات', href: '#features' },
      { label: 'من نحن', href: '#about' },
      { label: 'الأسعار', href: '#pricing' }
    ],
    dashboard: [
      { label: 'لوحة التحكم', href: '/dashboard' },
      { label: 'السجل', href: '/history' },
      { label: 'الإعدادات', href: '/profile-settings' }
    ],
    auth: []
  };

  const items = navItems.length > 0 ? navItems : (defaultNavItems[variant] || []);

  // Logo SVG Component
  const LogoIcon = () => (
    <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
      <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
    </svg>
  );

  // Dashboard variant icon
  const DashboardIcon = () => (
    <svg className="size-full" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"></path>
    </svg>
  );

  // Render based on variant
  if (variant === 'auth') {
    return (
      <header className="w-full border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3 sm:px-10 sticky top-0 z-50 transition-colors">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-8 text-primary flex items-center justify-center">
              <DashboardIcon />
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
              <div className="flex items-center justify-center size-9 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined text-2xl">sign_language</span>
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
          <div className="size-8 text-primary">
            <LogoIcon />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">{logo}</h2>
        </Link>
        <div className="hidden md:flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9">
            {items.map((item, index) => {
              return item.href.startsWith('/') ? (
                <Link
                  key={index}
                  to={item.href}
                  className="text-text-main dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="text-text-main dark:text-slate-300 text-sm font-medium leading-normal hover:text-primary transition-colors"
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
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
