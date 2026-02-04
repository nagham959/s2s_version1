import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Sidebar = ({
  variant = 'mobile', // 'mobile', 'desktop'
  items = [],
  activeItem = null,
  onItemClick = null
}) => {
  const { isDark } = useTheme();
  const location = useLocation();

  // Default mobile navigation items
  const defaultMobileItems = [
    {
      icon: 'dashboard',
      label: 'الرئيسية',
      href: '/dashboard',
      active: activeItem === 'dashboard' || location.pathname === '/dashboard'
    },
    {
      icon: 'history',
      label: 'السجل',
      href: '/history',
      active: activeItem === 'history' || location.pathname === '/history'
    },
    {
      icon: 'settings',
      label: 'الإعدادات',
      href: '/profile-settings',
      active: activeItem === 'settings' || location.pathname === '/profile-settings'
    },
    {
      icon: 'account_circle',
      label: 'الملف الشخصي',
      href: '/profile-settings',
      active: activeItem === 'profile' || location.pathname === '/profile-settings'
    }
  ];

  const navigationItems = items.length > 0 ? items : defaultMobileItems;

  if (variant === 'mobile') {
    return (
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark px-6 py-3 flex justify-between items-center z-50">
        {navigationItems.map((item, index) => {
          const isActive = item.active || location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              onClick={() => {
                if (onItemClick) {
                  onItemClick(item);
                }
              }}
              className={`flex flex-col items-center gap-1 transition-colors ${isActive
                  ? 'text-primary'
                  : 'text-slate-500 dark:text-slate-400 hover:text-primary'
                }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  // Desktop sidebar variant (if needed in the future)
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-border-dark h-screen sticky top-0">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item, index) => {
          const isActive = item.active || location.pathname === item.href;
          return (
            <Link
              key={index}
              to={item.href}
              onClick={() => {
                if (onItemClick) {
                  onItemClick(item);
                }
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary'
                }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
