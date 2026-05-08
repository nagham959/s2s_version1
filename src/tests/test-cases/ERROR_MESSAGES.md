# Test Cases - Error Messages (Arabic)

## Overview
This document contains all error message test cases for S2S application.
Each test validates that the correct Arabic error message is displayed.

---

## Test ID Format: EM-XXX

---

## 1. Login Form Tests

| Test ID | Field | Scenario | Expected Arabic Error | Priority |
|---------|-------|----------|----------------------|----------|
| EM-001 | email | Empty | "البريد الإلكتروني مطلوب." | HIGH |
| EM-002 | email | Invalid format | "يجب إدخال بريد إلكتروني صحيح." | HIGH |
| EM-003 | email | Exceeds 256 chars | "لا يمكن أن يتجاوز البريد الإلكتروني ٢٥٦ حرفاً." | HIGH |
| EM-004 | email | Forbidden chars (<>) | "البريد الإلكتروني يحتوي على رموز غير مسموح بها." | HIGH |
| EM-005 | password | Empty | "كلمة المرور مطلوبة." | HIGH |
| EM-006 | password | Exceeds 100 chars | "لا يمكن أن تتجاوز كلمة المرور ١٠٠ حرف." | HIGH |
| EM-007 | credentials | Wrong email/password | "البريد الإلكتروني أو كلمة المرور غير صحيحة." | HIGH |
| EM-008 | credentials | Account locked | "الحساب مغلق. حاول مرة أخرى خلال {X} دقائق." | HIGH |
| EM-009 | credentials | Email not verified | "يرجى التحقق من بريدك الإلكتروني أولاً." | HIGH |

---

## 2. Register Form Tests

| Test ID | Field | Scenario | Expected Arabic Error | Priority |
|---------|-------|----------|----------------------|----------|
| EM-010 | displayName | Empty | "الاسم الكامل مطلوب." | HIGH |
| EM-011 | displayName | Exceeds 50 chars | "لا يمكن أن يتجاوز الاسم الكامل ٥٠ حرفاً." | HIGH |
| EM-012 | userName | Empty | "اسم المستخدم مطلوب." | HIGH |
| EM-013 | userName | Less than 3 chars | "يجب أن يتكون اسم المستخدم من ٣ أحرف على الأقل." | HIGH |
| EM-014 | userName | Exceeds 30 chars | "لا يمكن أن يتجاوز اسم المستخدم ٣٠ حرفاً." | HIGH |
| EM-015 | userName | Invalid chars | "يمكن أن يحتوي اسم المستخدم فقط على أحرف، أرقام، نقاط، شرطات، وشرطات سفلية." | HIGH |
| EM-016 | email | Empty | "البريد الإلكتروني مطلوب." | HIGH |
| EM-017 | email | Invalid format | "يجب إدخال بريد إلكتروني صحيح." | HIGH |
| EM-018 | email | Already exists | "البريد الإلكتروني مستخدم بالفعل. جرّب تسجيل الدخول." | HIGH |
| EM-019 | phoneNumber | Empty | "رقم الهاتف مطلوب." | HIGH |
| EM-020 | phoneNumber | Invalid Egyptian | "يجب أن يكون رقم الهاتف مصرياً صحيحاً (مثال: 01XXXXXXXXX)." | HIGH |
| EM-021 | phoneNumber | Already exists | "رقم الهاتف مستخدم بالفعل. جرّب رقمًا آخر." | HIGH |
| EM-022 | password | Empty | "كلمة المرور مطلوبة." | HIGH |
| EM-023 | password | Less than 8 chars | "يجب أن تتكون كلمة المرور من ٨ أحرف على الأقل." | HIGH |
| EM-024 | password | No uppercase | "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل." | HIGH |
| EM-025 | password | No lowercase | "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل." | HIGH |
| EM-026 | password | No digit | "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل." | HIGH |
| EM-027 | password | No special char | "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل." | HIGH |
| EM-028 | confirmPassword | Empty | "تأكيد كلمة المرور مطلوب." | HIGH |
| EM-029 | confirmPassword | Mismatch | "كلمتا المرور غير متطابقتين." | HIGH |
| EM-030 | dateOfBirth | Empty | "تاريخ الميلاد مطلوب." | HIGH |
| EM-031 | dateOfBirth | Age < 15 | "يجب أن يكون العمر بين ١٥ و٨٠ عاماً." | HIGH |
| EM-032 | dateOfBirth | Age > 80 | "يجب أن يكون العمر بين ١٥ و٨٠ عاماً." | HIGH |
| EM-033 | userType | Not selected | "نوع المستخدم مطلوب." | HIGH |
| EM-034 | signLanguage | Not selected (when UsesSignLanguage=true) | "يجب تحديد لغة الإشارة إذا تم تفعيل خيار 'أستخدم لغة الإشارة'." | HIGH |

---

## 3. Forgot Password Tests

| Test ID | Field | Scenario | Expected Arabic Error | Priority |
|---------|-------|----------|----------------------|----------|
| EM-035 | email | Empty | "البريد الإلكتروني مطلوب." | HIGH |
| EM-036 | email | Exceeds 256 chars | "لا يمكن أن يتجاوز البريد الإلكتروني ٢٥٦ حرفاً." | HIGH |
| EM-037 | email | Invalid format | "يرجى إدخال بريد إلكتروني صحيح." | HIGH |

---

## 4. Reset Password Tests

| Test ID | Field | Scenario | Expected Arabic Error | Priority |
|---------|-------|----------|----------------------|----------|
| EM-038 | token | Missing/Invalid | "رابط إعادة التعيين غير صالح أو ناقص (token)." | HIGH |
| EM-039 | newPassword | Empty | "يرجى إدخال كلمة المرور الجديدة." | HIGH |
| EM-040 | newPassword | Less than 8 chars | "يجب أن تتكون كلمة المرور من ٨ أحرف على الأقل." | HIGH |
| EM-041 | newPassword | Contains HTML tags | "لا يمكن أن تحتوي كلمة المرور على وسوم HTML." | HIGH |
| EM-042 | confirmPassword | Mismatch | "كلمتا المرور غير متطابقتين." | HIGH |

---

## 5. Change Password Tests

| Test ID | Field | Scenario | Expected Arabic Error | Priority |
|---------|-------|----------|----------------------|----------|
| EM-043 | currentPassword | Empty | "كلمة المرور الحالية مطلوبة." | HIGH |
| EM-044 | currentPassword | Wrong | "كلمة المرور الحالية غير صحيحة." | HIGH |
| EM-045 | newPassword | Empty | "كلمة المرور الجديدة مطلوبة." | HIGH |
| EM-046 | newPassword | Same as current | "يجب أن تكون كلمة المرور الجديدة مختلفة عن الحالية." | HIGH |
| EM-047 | newPassword | Reused (last 5) | "لا يمكنك إعادة استخدام أي من كلمات المرور الخمس الأخيرة." | HIGH |
| EM-048 | confirmPassword | Mismatch | "كلمتا المرور غير متطابقتين." | HIGH |

---

## 6. Translation Tests

### Sign to Text (Video Upload)

| Test ID | Scenario | Expected Arabic Error | Priority |
|---------|----------|----------------------|----------|
| EM-052 | No video file | "ملف الفيديو مطلوب." | HIGH |
| EM-053 | Video > 50MB | "حجم ملف الفيديو يتجاوز ٥٠ ميجابايت." | HIGH |
| EM-054 | Invalid video format | "صيغة الفيديو غير مدعومة." | HIGH |
| EM-055 | Invalid content type | "نوع محتوى الفيديو غير مدعوم." | HIGH |

### Audio to Text

| Test ID | Scenario | Expected Arabic Error | Priority |
|---------|----------|----------------------|----------|
| EM-056 | No audio file | "ملف الصوت مطلوب." | HIGH |
| EM-057 | Audio > 20MB | "حجم ملف الصوت يتجاوز ٢٠ ميجابايت." | HIGH |

### Text to Sign

| Test ID | Scenario | Expected Arabic Error | Priority |
|---------|----------|----------------------|----------|
| EM-060 | Empty text | "النص مطلوب للترجمة." | HIGH |
| EM-061 | Text > 200 chars | "لا يمكن أن يتجاوز النص ٢٠٠ حرف." | HIGH |

---

## 7. Profile Image Upload

| Test ID | Scenario | Expected Arabic Error | Priority |
|---------|----------|----------------------|----------|
| EM-067 | No image | "الصورة الشخصية مطلوبة." | HIGH |
| EM-068 | Image > 5MB | "حجم الصورة الشخصية يتجاوز ٥ ميجابايت." | HIGH |
| EM-069 | Invalid format | "صيغة الصورة غير مدعومة." | HIGH |

---

## Execution

```bash
# Run Jest validation tests
npm test

# Run Cypress E2E tests
npx cypress run
```