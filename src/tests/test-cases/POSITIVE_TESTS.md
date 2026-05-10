# Positive Test Cases - Valid Inputs

## Overview
Test cases for valid inputs that should succeed.

---

## Test ID Format: POS-XXX

---

## 1. Authentication Tests

### Login

| Test ID | Email | Password | Expected Result |
|---------|-------|----------|-----------------|
| POS-001 | Set via CYPRESS_TEST_EMAIL | Set via CYPRESS_TEST_PASSWORD | Login success |

### Register

| Test ID | Fields | Expected Result |
|---------|--------|-----------------|
| POS-003 | Valid all fields | Registration success, OTP sent |

### Forgot/Reset Password

| Test ID | Scenario | Expected Result |
|---------|----------|-----------------|
| POS-004 | Valid email | Success message |
| POS-005 | Valid token + password | Password reset success |

### Change Password

| Test ID | Scenario | Expected Result |
|---------|----------|-----------------|
| POS-006 | Correct current + valid new | Password changed |

### Verify OTP

| Test ID | Scenario | Expected Result |
|---------|----------|-----------------|
| POS-007 | Valid OTP | Email verified |

---

## 2. Profile Tests

| Test ID | Scenario | Expected Result |
|---------|----------|-----------------|
| POS-009 | Update displayName | Profile updated |
| POS-011 | Upload valid JPG < 5MB | Image uploaded |

---

## 3. Translation Tests

| Test ID | Scenario | Expected Result |
|---------|----------|-----------------|
| POS-014 | Valid MP4 < 50MB | Translation initiated |
| POS-017 | Valid MP3 < 20MB | Transcription initiated |
| POS-020 | Text "مرحبا" | Avatar animation generated |

---

## Run Tests

```bash
npx cypress run
```
