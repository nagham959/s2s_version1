# S2S - منصة ترجمة لغة الإشارة الذكية

منصة متطورة تعتمد على الذكاء الاصطناعي لترجمة لغة الإشارة بشكل متبادل وفوري، مما يسهل التواصل بين مجتمع الصم وضعاف السمع وبقية العالم.

---

## البنية البرمجية (Folder Structure)

```
s2s_website/
├── public/
│   ├── index.html
│   └── images/
│       ├── logo_s2s.png       # شعار الموقع
│       └── avatar.png         # صورة الأفاتار الافتراضية
├── src/
│   ├── assets/
│   │   ├── logo_s2s.png       # الشعار (مُحسَّن عبر webpack)
│   │   └── avatar.png         # الأفاتار (مُحسَّن عبر webpack)
│   ├── components/
│   │   ├── Navbar.js          # شريط التنقل (default / auth / dashboard)
│   │   ├── Footer.js          # تذييل الصفحة
│   │   └── Sidebar.js         # الشريط الجانبي للداشبورد
│   ├── contexts/
│   │   ├── ThemeContext.js    # إدارة الثيم (فاتح/داكن) - افتراضي فاتح
│   │   ├── HistoryContext.js  # إدارة سجل الترجمة
│   │   └── authContext.js     # إدارة حالة المصادقة
│   ├── pages/
│   │   ├── HomePage.js            # الصفحة الرئيسية
│   │   ├── FeaturesPage.js        # صفحة المميزات
│   │   ├── AboutPage.js           # صفحة من نحن
│   │   ├── PricingPage.js         # صفحة الأسعار
│   │   ├── ContactPage.js         # صفحة اتصل بنا
│   │   ├── TermsPage.js           # شروط الخدمة
│   │   ├── PrivacyPage.js         # سياسة الخصوصية
│   │   ├── LoginPage.js           # تسجيل الدخول
│   │   ├── SignUpPage.js          # إنشاء حساب
│   │   ├── verifyEmailPage.js     # التحقق من البريد
│   │   ├── ForgotPasswordPage.js  # نسيت كلمة المرور
│   │   ├── ResetPasswordPage.js   # إعادة تعيين كلمة المرور
│   │   ├── ChangePasswordPage.js  # تغيير كلمة المرور
│   │   ├── DashboardPage.js       # لوحة التحكم الرئيسية
│   │   ├── HistoryPage.js         # سجل الترجمات
│   │   └── ProfileSettingsPage.js # إعدادات الملف الشخصي
│   ├── App.js           # المكون الرئيسي وتوزيع المسارات
│   ├── index.js         # نقطة الدخول
│   └── index.css        # التنسيقات العامة
├── tailwind.config.js   # إعدادات التصميم والألوان
├── postcss.config.js
├── package.json
└── README.md
```

---

## المسارات (Routes)

| المسار | الصفحة |
|--------|--------|
| `/` | الصفحة الرئيسية |
| `/features` | المميزات |
| `/about` | من نحن |
| `/pricing` | الأسعار |
| `/contact` | اتصل بنا |
| `/terms` | شروط الخدمة |
| `/privacy` | سياسة الخصوصية |
| `/login` | تسجيل الدخول |
| `/signup` | إنشاء حساب |
| `/verifyEmail` | التحقق من البريد |
| `/forgot-password` | نسيت كلمة المرور |
| `/reset-password` | إعادة تعيين كلمة المرور |
| `/dashboard` | لوحة التحكم |
| `/history` | سجل الترجمات |
| `/profile-settings` | إعدادات الملف الشخصي |
| `/change-password` | تغيير كلمة المرور |

---

## المتطلبات التقنية (Tech Stack)

| التقنية | الاستخدام |
|---------|-----------|
| **React.js 18** | بناء واجهة المستخدم |
| **Tailwind CSS** | التصميم والتجاوب |
| **React Router v6** | إدارة المسارات |
| **@tanstack/react-query** | إدارة حالة البيانات |
| **Web Speech API** | التعرف على الكلام العربي |
| **Material Symbols** | الأيقونات |

---

## التثبيت والتشغيل (Setup & Development)

```bash
# تثبيت التبعيات
npm install

# تشغيل المشروع في بيئة التطوير
npm start

# بناء النسخة النهائية
npm run build
```

---

## الهوية البصرية (Brand Identity)

### الشعار
الشعار موجود في `src/assets/logo_s2s.png` ويُستخدم عبر `import` مباشرةً في Navbar وFooter.

### الألوان

| المتغير | القيمة | الاستخدام |
|---------|--------|-----------|
| `primary` | `#F2593D` | اللون الرئيسي |
| `primary-dark` | `#D14026` | hover / تأثيرات |
| `primary-light` | `#FF7E66` | تلميحات |
| `background-light` | `#ffffff` | خلفية الوضع الفاتح |
| `background-alt` | `#f9fafb` | خلفية بديلة |
| `background-dark` | `#121212` | خلفية الوضع الداكن |
| `surface-dark` | `#1c1c1c` | أسطح الوضع الداكن |
| `text-main` | `#0e151b` | النص الرئيسي |
| `text-sub` | `#4e7597` | النص الثانوي |

### الخطوط
- **Cairo** — الخط الأساسي (RTL)
- **Material Symbols Outlined** — الأيقونات

---

## ملاحظات التطوير

- الثيم الافتراضي عند أول فتح هو **الوضع الفاتح** بغض النظر عن إعداد النظام.
- يُحفظ اختيار الثيم في `localStorage` للزيارات اللاحقة.
- المنصة تدعم اتجاه **RTL** بالكامل.
- الـ Navbar يدعم ثلاثة أوضاع: `default` (الصفحات العامة)، `auth` (صفحات المصادقة)، `dashboard` (لوحة التحكم).
- روابط الـ hash (مثل `/#features`) تعمل مع scroll سلس حتى عند الانتقال من صفحة أخرى.
