/**
 * Centralized regex patterns — derived from VALIDATION_RULES.md §18.
 * Copy-paste-ready from the backend document.
 */

// ── Password Rules ───────────────────────────────────────────────────
export const HAS_UPPERCASE = /[A-Z]/;
export const HAS_LOWERCASE = /[a-z]/;
export const HAS_DIGIT = /[0-9]/;
export const HAS_SPECIAL_CHAR = /[!?\\*.#@$%^&()_+\-=\[\]{};:'"<>,./\\]/;
export const NO_HTML_TAGS = /^[^<>]*$/;

// ── Phone ────────────────────────────────────────────────────────────
/** Egyptian phone numbers only: 01[0125]XXXXXXXX (11 digits) */
export const PHONE_REGEX = /^01[0125]\d{8}$/;

// ── OTP ──────────────────────────────────────────────────────────────
export const OTP_REGEX = /^\d{6}$/;

// ── Email (Forgot Password — strict) ────────────────────────────────
export const EMAIL_STRICT_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ── Forbidden Characters ─────────────────────────────────────────────
/** Chars forbidden in email fields: < > & ' " \ / ; ` */
export const NO_FORBIDDEN_CHARS = /^[^<>&'"\\\/;`]*$/;

// ── Username ─────────────────────────────────────────────────────────
/** Only letters, numbers, dots, hyphens, and underscores */
export const USERNAME_REGEX = /^[a-zA-Z0-9._-]+$/;
