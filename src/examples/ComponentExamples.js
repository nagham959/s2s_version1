import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

/**
 * أمثلة على استخدام المكونات
 * يمكنك نسخ هذه الأمثلة واستخدامها في صفحاتك
 */

// مثال 1: صفحة رئيسية (Home Page)
export const HomePageExample = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navbar 
          variant="default"
          onLoginClick={() => console.log('Login clicked')}
        />
        <main>
          {/* محتوى الصفحة */}
        </main>
        <Footer variant="default" />
      </div>
    </ThemeProvider>
  );
};

// مثال 2: صفحة تسجيل الدخول/إنشاء حساب
export const AuthPageExample = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navbar variant="auth" />
        <main className="flex-1 flex items-center justify-center">
          {/* نموذج تسجيل الدخول */}
        </main>
        <Footer variant="auth" />
      </div>
    </ThemeProvider>
  );
};

// مثال 3: لوحة التحكم (Dashboard)
export const DashboardPageExample = () => {
  const handleNavItemClick = (item) => {
    console.log('Navigating to:', item.href);
    // يمكنك استخدام React Router هنا
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <Navbar 
          variant="dashboard"
          logo="مترجم الإشارة"
          userProfile="https://example.com/profile.jpg"
        />
        <main className="flex-1">
          {/* محتوى لوحة التحكم */}
        </main>
        <Sidebar 
          variant="mobile"
          activeItem="dashboard"
          onItemClick={handleNavItemClick}
        />
      </div>
    </ThemeProvider>
  );
};

// مثال 4: Navbar مخصص
export const CustomNavbarExample = () => {
  return (
    <ThemeProvider>
      <Navbar 
        variant="default"
        logo="My App"
        navItems={[
          { label: 'الرئيسية', href: '/' },
          { label: 'المنتجات', href: '/products' },
          { label: 'اتصل بنا', href: '/contact' }
        ]}
        showAccessibility={true}
        showThemeToggle={true}
        onLoginClick={() => window.location.href = '/login'}
      />
    </ThemeProvider>
  );
};

export default {
  HomePageExample,
  AuthPageExample,
  DashboardPageExample,
  CustomNavbarExample
};
