# Security Test Scenarios

## Overview
Security test cases covering input validation, authentication, and rate limiting.

---

## Test ID Format: SEC-XXX

---

## 1. Input Validation Security

### XSS Prevention

| Test ID | Field | Scenario | Expected Behavior | Priority |
|---------|-------|----------|-------------------|----------|
| SEC-001 | displayName | `<script>alert('xss')</script>` | Rejected or sanitized | HIGH |
| SEC-002 | displayName | `<img src=x onerror=alert(1)>` | Rejected or sanitized | HIGH |

### HTML in Passwords

| Test ID | Scenario | Expected Behavior | Priority |
|---------|----------|-------------------|----------|
| SEC-005 | Password with `<html>` | Rejected: "لا يمكن أن تحتوي كلمة المرور على وسوم HTML." | HIGH |
| SEC-006 | Password with `<script>` | Rejected | HIGH |

### SQL Injection Patterns

| Test ID | Field | Scenario | Expected Behavior | Priority |
|---------|-------|----------|-------------------|----------|
| SEC-008 | email | `admin'--` | Handled gracefully | HIGH |
| SEC-010 | phoneNumber | `' OR '1'='1` | Rejected | MEDIUM |

### Long Input

| Test ID | Field | Scenario | Expected Behavior | Priority |
|---------|-------|----------|-------------------|----------|
| SEC-011 | email | 1000+ chars | Rejected with proper error | HIGH |
| SEC-012 | displayName | 500+ chars | Rejected | HIGH |

---

## 2. Authentication Security

### Account Lockout

| Test ID | Scenario | Expected Behavior | Priority |
|---------|----------|-------------------|----------|
| SEC-018 | 3 failed login attempts | Account locked for 15 minutes | HIGH |
| SEC-019 | Login while locked | "الحساب مغلق. حاول مرة أخرى..." | HIGH |

### Password Policy

| Test ID | Scenario | Expected Behavior | Priority |
|---------|----------|-------------------|----------|
| SEC-021 | Password without uppercase | Rejected | HIGH |
| SEC-022 | Password without lowercase | Rejected | HIGH |
| SEC-025 | Reuse last 5 passwords | "لا يمكنك إعادة استخدام أي من كلمات المرور الخمس الأخيرة." | HIGH |

### Token Security

| Test ID | Scenario | Expected Behavior | Priority |
|---------|----------|-------------------|----------|
| SEC-026 | Expired JWT token | Redirect to login | HIGH |
| SEC-027 | Invalid JWT token | 401 Unauthorized | HIGH |
| SEC-028 | Change password | All sessions invalidated | HIGH |

### OTP Security

| Test ID | Scenario | Expected Behavior | Priority |
|---------|----------|-------------------|----------|
| SEC-030 | Wrong OTP 3 times | OTP invalidated | HIGH |
| SEC-031 | OTP spam | Rate limited | HIGH |
| SEC-032 | Expired OTP | "الكود غير صحيح أو منتهي الصلاحية" | HIGH |

---

## 3. Rate Limiting Tests

| Test ID | Endpoint | Expected Behavior | Priority |
|---------|----------|-------------------|----------|
| SEC-033 | /forgot-password | Rate limited | HIGH |
| SEC-034 | /verify-otp | Rate limited | HIGH |
| SEC-035 | /upload-profile-image | Rate limited | MEDIUM |

---

## 4. Information Leakage Prevention

| Test ID | Scenario | Expected Behavior | Priority |
|---------|----------|-------------------|----------|
| SEC-036 | Forgot password non-existent email | Returns 200 OK | HIGH |
| SEC-037 | API error response | No stack trace | HIGH |
| SEC-039 | Invalid login | Generic message | HIGH |

---

## 5. File Upload Security

| Test ID | Scenario | Expected Behavior | Priority |
|---------|----------|-------------------|----------|
| SEC-042 | Large file (200MB) | Rejected | HIGH |
| SEC-044 | Double extension (.php.jpg) | Detected via magic bytes | HIGH |

---

## Run Tests

```bash
npx cypress run --spec "cypress/integration/security/**/*.spec.js"
```