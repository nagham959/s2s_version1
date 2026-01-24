# المكونات (Components)

هذا المجلد يحتوي على المكونات القابلة لإعادة الاستخدام في المشروع.

## المكونات المتوفرة

### 1. Navbar
شريط التنقل الرئيسي مع دعم Dark Mode.

**الاستخدام:**
```jsx
import Navbar from './components/Navbar';

// Variant: 'default', 'auth', 'dashboard'
<Navbar 
  variant="default"
  logo="SignTranslator"
  navItems={[
    { label: 'المميزات', href: '#features' },
    { label: 'من نحن', href: '#about' }
  ]}
  showAccessibility={true}
  showThemeToggle={true}
  onLoginClick={() => console.log('Login')}
/>
```

**Props:**
- `variant`: 'default' | 'auth' | 'dashboard'
- `logo`: نص الشعار
- `navItems`: مصفوفة عناصر التنقل
- `showAccessibility`: إظهار زر إمكانية الوصول
- `showThemeToggle`: إظهار زر تبديل الوضع الداكن
- `userProfile`: رابط صورة المستخدم (لـ dashboard)
- `onLoginClick`: دالة عند الضغط على تسجيل الدخول
- `onMenuClick`: دالة عند الضغط على قائمة الجوال

### 2. Footer
تذييل الصفحة مع دعم Dark Mode.

**الاستخدام:**
```jsx
import Footer from './components/Footer';

<Footer variant="default" />
```

**Props:**
- `variant`: 'default' | 'auth'

### 3. Sidebar
شريط جانبي للتنقل (خاص بالجوال أو سطح المكتب).

**الاستخدام:**
```jsx
import Sidebar from './components/Sidebar';

<Sidebar 
  variant="mobile"
  activeItem="dashboard"
  onItemClick={(item) => console.log(item)}
/>
```

**Props:**
- `variant`: 'mobile' | 'desktop'
- `items`: مصفوفة عناصر التنقل
- `activeItem`: العنصر النشط
- `onItemClick`: دالة عند الضغط على عنصر

## Dark Mode

جميع المكونات تدعم Dark Mode تلقائياً من خلال `ThemeContext`. تأكد من لف التطبيق بـ `ThemeProvider`:

```jsx
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

استخدم `useTheme` hook للوصول إلى حالة الوضع الداكن:

```jsx
import { useTheme } from './contexts/ThemeContext';

function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```
