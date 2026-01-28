# SignaryAI - منصة ترجمة لغة الإشارة الذكية

هي منصة متطورة تعتمد على الذكاء الاصطناعي لترجمة لغة الإشارة بشكل متبادل وفوري، مما يسهل التواصل بين مجتمع الصم وضعاف السمع وبقية العالم.


## البنية البرمجية (Folder Structure)

```
s2s_website/
├── public/              # الملفات العامة والأيقونات
├── src/
│   ├── components/      # مكونات الواجهة (Navbar, Sidebar)
│   ├── contexts/        # إدارة الحالة (ThemeContext, HistoryContext)
│   ├── pages/           # صفحات التطبيق (Dashboard, History, Settings)
│   ├── App.js           # المكون الرئيسي وتوزيع المسارات
│   ├── index.js         # نقطة الدخول
│   └── index.css        # التنسيقات العامة
├── tailwind.config.js   # إعدادات التصميم والألوان
└── README.md
```

## المتطلبات التقنية (Tech Stack)

*   **React.js**: المطور الأساسي لتطوير واجهة المستخدم.
*   **Tailwind CSS**: للتصميم العصري والتجاوب.
*   **Web Speech API**: للتعرف على الكلام باللغة العربية.
*   **React Router**: لإدارة الانتقالات بين الصفحات.

## التثبيت والتشغيل (Setup & Development)

```bash
# تثبيت التبعيات
npm install

# تشغيل المشروع في بيئة التطوير
npm start

# بناء النسخة النهائية
npm run build
```

## الألوان والهوية (Identity)

## الألوان المستخدمة:

- **Primary**: `#F2593D`
- **Primary Dark**: `#D14026`
- **Primary Hover**: `#D14026`
- **Primary Light**: `#FF7E66`
- **Background Light**: `#ffffff`
- **Background Alt**: `#f9fafb`
- **Background Dark**: `#121212`
- **Surface Light**: `#ffffff`
- **Surface Dark**: `#1c1c1c`
- **Text Main**: `#0e151b`
- **Text Sub**: `#4e7597`
- **Text Secondary**: `#94a3b8`

## الخطوط

- **Cairo**: الخط الأساسي المستخدم في جميع الصفحات
- **Material Symbols Outlined**: للأيقونات
