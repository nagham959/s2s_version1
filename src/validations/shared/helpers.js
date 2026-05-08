/**
 * Reusable Zod helper validators — composed into feature schemas.
 * Every helper maps directly to a backend validation rule.
 */
import { z } from 'zod';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  MAX_EMAIL_LENGTH,
  MIN_AGE,
  MAX_AGE,
} from './constants.js';
import {
  HAS_UPPERCASE,
  HAS_LOWERCASE,
  HAS_DIGIT,
  HAS_SPECIAL_CHAR,
  NO_HTML_TAGS,
  PHONE_REGEX,
  NO_FORBIDDEN_CHARS,
} from './regex.js';
import { SHARED, REGISTER } from './messages.js';

// ── Email (standard) ─────────────────────────────────────────────────
/**
 * Standard email field: required, valid format, max 256 chars.
 * Used by Register, Login, Verify OTP.
 */
export const emailField = () =>
  z
    .string({ required_error: SHARED.emailRequired })
    .trim()
    .min(1, { message: SHARED.emailRequired })
    .max(MAX_EMAIL_LENGTH, { message: SHARED.emailMaxLength })
    .email({ message: SHARED.emailInvalid });

/**
 * Email field with forbidden-chars check (< > & ' " \ / ; `).
 * Used by Register, Verify OTP, Forgot Password, Change Email.
 */
export const emailFieldStrict = () =>
  emailField().refine((val) => NO_FORBIDDEN_CHARS.test(val), {
    message: SHARED.emailForbiddenChars,
  });

// ── Password (full complexity) ───────────────────────────────────────
/**
 * Full-complexity password: min 8, max 100, upper, lower, digit, special.
 * Used by Register, Reset Password, Change Password.
 */
export const passwordField = (msgs = {}) =>
  z
    .string({ required_error: msgs.required || SHARED.passwordRequired })
    .min(1, { message: msgs.required || SHARED.passwordRequired })
    .min(PASSWORD_MIN_LENGTH, { message: SHARED.passwordMinLength })
    .max(PASSWORD_MAX_LENGTH, { message: SHARED.passwordMaxLength })
    .refine((val) => HAS_UPPERCASE.test(val), { message: SHARED.passwordUppercase })
    .refine((val) => HAS_LOWERCASE.test(val), { message: SHARED.passwordLowercase })
    .refine((val) => HAS_DIGIT.test(val), { message: SHARED.passwordDigit })
    .refine((val) => HAS_SPECIAL_CHAR.test(val), { message: SHARED.passwordSpecialChar });

/**
 * Password with HTML-tag restriction (Reset & Change Password).
 */
export const passwordFieldNoHtml = (msgs = {}) =>
  passwordField(msgs).refine((val) => NO_HTML_TAGS.test(val), {
    message: SHARED.passwordNoHtmlTags,
  });

// ── Phone (Egyptian only) ────────────────────────────────────────────
/**
 * Required Egyptian phone number: ^01[0125]\d{8}$
 */
export const phoneFieldRequired = () =>
  z
    .string({ required_error: REGISTER.phoneRequired })
    .trim()
    .min(1, { message: REGISTER.phoneRequired })
    .refine((val) => PHONE_REGEX.test(val), { message: REGISTER.phoneInvalid });

/**
 * Optional Egyptian phone number — only validated if provided.
 */
export const phoneFieldOptional = (invalidMsg) =>
  z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || PHONE_REGEX.test(val),
      { message: invalidMsg || REGISTER.phoneInvalid }
    );

// ── Date of Birth (age 15–80) ────────────────────────────────────────
/**
 * Validates that DOB yields an age between MIN_AGE and MAX_AGE.
 */
export const dateOfBirthField = () =>
  z
    .string({ required_error: REGISTER.dobRequired })
    .min(1, { message: REGISTER.dobRequired })
    .refine(
      (val) => {
        const dob = new Date(val);
        if (isNaN(dob.getTime())) return false;
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        return age >= MIN_AGE && age <= MAX_AGE;
      },
      { message: REGISTER.dobAge }
    );

// ── Confirm Password ─────────────────────────────────────────────────
/**
 * Adds cross-field password confirmation via superRefine.
 * Use on the parent object schema: `.superRefine(confirmPasswordMatch('newPassword', 'confirmPassword'))`
 */
export const confirmPasswordMatch = (passwordKey, confirmKey) => (data, ctx) => {
  if (data[passwordKey] !== data[confirmKey]) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: SHARED.confirmPasswordMismatch,
      path: [confirmKey],
    });
  }
};

// ── File Validators ──────────────────────────────────────────────────
/**
 * Creates a file validation schema for browser File objects.
 * @param {object} opts
 * @param {number} opts.maxSize - Max file size in bytes
 * @param {string[]} opts.allowedExtensions - e.g. ['.mp4', '.mov']
 * @param {string[]} opts.allowedContentTypes - e.g. ['video/mp4']
 * @param {object} opts.messages - Error messages { required, tooLarge, invalidFormat, invalidContentType }
 */
export const fileField = ({ maxSize, allowedExtensions, allowedContentTypes, messages }) =>
  z
    .instanceof(File, { message: messages.required })
    .refine((file) => file.size > 0, { message: messages.required })
    .refine((file) => file.size <= maxSize, { message: messages.tooLarge })
    .refine(
      (file) => {
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        return allowedExtensions.includes(ext);
      },
      { message: messages.invalidFormat }
    )
    .refine(
      (file) => allowedContentTypes.includes(file.type),
      { message: messages.invalidContentType }
    );
