# إعداد React Router

تم إعداد React Router بنجاح لربط جميع الصفحات ببعضها.

## المسارات المكونة

### المسارات الرئيسية:
- `/` → HomePage (الصفحة الرئيسية)
- `/login` → LoginPage (صفحة تسجيل الدخول)
- `/signup` → SignUpPage (صفحة إنشاء حساب)
- `/dashboard` → DashboardPage (لوحة التحكم)
- `/profile-settings` → ProfileSettingsPage (الملف الشخصي والإعدادات)
- `/sign-to-voice` → SignToVoicePage (من الإشارة إلى الصوت)
- `/voice-to-avatar` → VoiceToAvatarPage (من الصوت إلى الأفاتار)

## التحديثات المطبقة

### 1. App.js
- إضافة `BrowserRouter` و `Routes` و `Route`
- ربط جميع الصفحات بالمسارات المناسبة

### 2. Navbar Component
- استخدام `Link` من `react-router-dom` للروابط الداخلية
- استخدام `useLocation` لتحديد الصفحة النشطة تلقائياً
- الشعار قابل للنقر ويوجه إلى الصفحة الرئيسية
- زر "تسجيل الدخول" يستخدم Link بدلاً من onClick

### 3. Footer Component
- إضافة `Link` (الروابط الخارجية مثل #features تبقى كما هي)

### 4. Sidebar Component
- استخدام `Link` للتنقل
- استخدام `useLocation` لتحديد العنصر النشط تلقائياً
- تحديث روابط الإعدادات والملف الشخصي إلى `/profile-settings`

### 5. الصفحات
- **HomePage**: استخدام `useNavigate` للأزرار
- **LoginPage**: استخدام `Link` للروابط
- **SignUpPage**: استخدام `Link` للروابط
- **DashboardPage**: استخدام `useNavigate` للأزرار

## كيفية الاستخدام

### للتنقل باستخدام Link:
```jsx
import { Link } from 'react-router-dom';

<Link to="/dashboard">لوحة التحكم</Link>
```

### للتنقل باستخدام useNavigate:
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/login');
```

### للتنقل عند الضغط على زر:
```jsx
<button onClick={() => navigate('/dashboard')}>
  اذهب للوحة التحكم
</button>
```

## المميزات

✅ جميع الصفحات مربوطة ببعضها
✅ التنقل السلس بدون إعادة تحميل الصفحة
✅ تحديد الصفحة النشطة تلقائياً في Navbar و Sidebar
✅ دعم Dark Mode في جميع الصفحات
✅ استخدام Components المشتركة (Navbar, Footer, Sidebar)

## الخطوات التالية

1. تثبيت التبعيات (إذا لم تكن مثبتة):
   ```bash
   npm install
   ```

2. تشغيل المشروع:
   ```bash
   npm start
   ```

3. فتح المتصفح على:
   ```
   http://localhost:3000
   ```

4. التنقل بين الصفحات:
   - `/` - الصفحة الرئيسية
   - `/login` - تسجيل الدخول
   - `/signup` - إنشاء حساب
   - `/dashboard` - لوحة التحكم
   - وغيرها...

## ملاحظات

- جميع الروابط الداخلية تستخدم React Router
- الروابط الخارجية (مثل #features) تبقى كما هي
- يمكن إضافة مسارات جديدة بسهولة في `App.js`
