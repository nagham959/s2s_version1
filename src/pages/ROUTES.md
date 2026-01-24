# مسارات التطبيق (Routes)

جميع المسارات المتاحة في التطبيق:

## المسارات الرئيسية

| المسار | الصفحة | الوصف |
|--------|--------|-------|
| `/` | HomePage | الصفحة الرئيسية |
| `/login` | LoginPage | صفحة تسجيل الدخول |
| `/signup` | SignUpPage | صفحة إنشاء حساب جديد |
| `/dashboard` | DashboardPage | لوحة التحكم الرئيسية |
| `/profile-settings` | ProfileSettingsPage | الملف الشخصي والإعدادات |
| `/sign-to-voice` | SignToVoicePage | الترجمة من الإشارة إلى الصوت |
| `/voice-to-avatar` | VoiceToAvatarPage | الترجمة من الصوت إلى الأفاتار |

## التنقل بين الصفحات

### استخدام Link Component
```jsx
import { Link } from 'react-router-dom';

<Link to="/login">تسجيل الدخول</Link>
```

### استخدام useNavigate Hook
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/dashboard');
```

## أمثلة التنقل

### من الصفحة الرئيسية
- زر "ابدأ الترجمة" → `/login`
- زر "ابدأ مجانًا" → `/signup`
- زر "تسجيل الدخول" في Navbar → `/login`

### من صفحة تسجيل الدخول
- رابط "سجل مجاناً" → `/signup`
- رابط "نسيت كلمة المرور؟" → `/forgot-password` (يمكن إضافتها لاحقاً)

### من صفحة إنشاء حساب
- رابط "تسجيل الدخول" → `/login`

### من لوحة التحكم
- زر "بدء الترجمة لمكالمة الآن" → `/sign-to-voice`
- بطاقة "من الإشارة إلى الصوت" → `/sign-to-voice`
- بطاقة "من الصوت إلى الأفاتار" → `/voice-to-avatar`
- رابط "عرض السجل الكامل" → `/history` (يمكن إضافتها لاحقاً)
- صورة المستخدم → `/profile-settings`


## ملاحظات

- جميع المسارات تستخدم React Router v6
- Navbar و Footer و Sidebar تستخدم Link تلقائياً
- يمكن إضافة مسارات جديدة بسهولة في `App.js`
