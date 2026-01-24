# صفحات التطبيق (Pages)

تم تحويل جميع ملفات HTML إلى صفحات React في هذا المجلد.

## الصفحات المتوفرة

### 1. HomePage.js
الصفحة الرئيسية للموقع - تم تحويلها من `home_page.html`

**المميزات:**
- استخدام Navbar و Footer Components
- دعم Dark Mode كامل
- جميع الأقسام: Hero, Features, How It Works, CTA

### 2. SignUpPage.js
صفحة إنشاء حساب جديد - تم تحويلها من `authentication1.html`

**المميزات:**
- نموذج تسجيل كامل
- إظهار/إخفاء كلمة المرور
- تسجيل دخول اجتماعي (Google, Apple)
- دعم Dark Mode

### 3. LoginPage.js
صفحة تسجيل الدخول - تم تحويلها من `authentication2.html`

**المميزات:**
- نموذج تسجيل دخول
- رابط "نسيت كلمة المرور"
- تسجيل دخول اجتماعي
- دعم Dark Mode

### 4. DashboardPage.js
لوحة التحكم الرئيسية - تم تحويلها من `dashboard1.html`

**المميزات:**
- استخدام Navbar و Sidebar Components
- بطاقات الترجمة (Sign to Voice, Voice to Avatar)
- جدول النشاط الأخير
- دعم Dark Mode

### 5. ProfileSettingsPage.js
صفحة الملف الشخصي والإعدادات - تم تحويلها من `profile&settings.html`

**المميزات:**
- معلومات المستخدم
- إعدادات اللغة
- إعدادات إمكانية الوصول
- تبديل Dark Mode مدمج
- إعدادات الأفاتار
- أمان الحساب

### 6. SignToVoicePage.js
صفحة الترجمة من الإشارة إلى الصوت - تم تحويلها من `signToVoice.html`

**المميزات:**
- عرض الكاميرا المباشر
- لوحة النص المباشر
- عناصر التحكم
- دعم Dark Mode

### 7. VoiceToAvatarPage.js
صفحة الترجمة من الصوت إلى الأفاتار - تم تحويلها من `voiceToAvatar.html`

**المميزات:**
- تسجيل صوتي
- معاينة الأفاتار
- إحصائيات مباشرة
- دعم Dark Mode

## التغييرات المطبقة

✅ تحويل جميع `class` إلى `className`
✅ إصلاح جميع Tags غير المقفولة
✅ تحويل `onclick` إلى `onClick`
✅ تحويل `onsubmit` إلى `onSubmit`
✅ استخدام Navbar و Footer Components بدلاً من الكود المتكرر
✅ إضافة دعم Dark Mode في جميع الصفحات
✅ تحويل جميع الأحداث إلى React Events
✅ إصلاح جميع الـ Attributes (مثل `for` → `htmlFor`, `fill-rule` → `fillRule`)

## الاستخدام

```jsx
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
// ... إلخ

// في App.js أو Router
<HomePage />
```

## ملاحظات

- جميع الصفحات تستخدم `ThemeProvider` داخلياً
- يمكنك استخدام React Router للتنقل بين الصفحات
- جميع الصور والروابط الخارجية محفوظة كما هي
- يمكنك استبدالها بروابط داخلية عند الحاجة
