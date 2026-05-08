/**
 * Centralized validation constants — derived from VALIDATION_RULES.md §1.
 * Single source of truth for all numeric limits used across Zod schemas.
 */

// ── Size Limits ──────────────────────────────────────────────────────
export const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB
export const MAX_AUDIO_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
export const MAX_PROFILE_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// ── OTP ──────────────────────────────────────────────────────────────
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 10;
export const MAX_OTP_ATTEMPTS = 3;
export const RESEND_OTP_COOLDOWN_SECONDS = 60;

// ── Password ─────────────────────────────────────────────────────────
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 100;
export const PASSWORD_HISTORY_LIMIT = 5;

// ── Account Security ─────────────────────────────────────────────────
export const ACCOUNT_LOCKOUT_MINUTES = 15;
export const MAX_FAILED_ACCESS_ATTEMPTS = 3;

// ── Tokens ───────────────────────────────────────────────────────────
export const ACCESS_TOKEN_EXPIRY_MINUTES = 15;
export const REFRESH_TOKEN_EXPIRY_DAYS = 7;
export const RESET_TOKEN_EXPIRY_MINUTES = 30;

// ── Field Lengths ────────────────────────────────────────────────────
export const MAX_EMAIL_LENGTH = 256;
export const MAX_DISPLAY_NAME_LENGTH = 50;
export const MIN_USERNAME_LENGTH = 3;
export const MAX_USERNAME_LENGTH = 30;

// ── Translation ──────────────────────────────────────────────────────
export const MAX_TRANSLATION_TEXT_LENGTH = 200;
export const MAX_TTS_TEXT_LENGTH = 2000;

// ── Age ──────────────────────────────────────────────────────────────
export const MIN_AGE = 15;
export const MAX_AGE = 80;

// ── Enums ────────────────────────────────────────────────────────────
export const UserType = Object.freeze({
  Deaf: 1,
  NormalUser: 2,
});

export const SignLanguage = Object.freeze({
  Egyptian: 1,
});

// ── File Types ───────────────────────────────────────────────────────
export const ALLOWED_VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm', '.avi', '.mkv', '.m4v'];
export const ALLOWED_VIDEO_CONTENT_TYPES = [
  'video/mp4',
  'video/quicktime',
  'video/webm',
  'video/x-msvideo',
  'video/x-matroska',
  'video/x-m4v',
];

export const ALLOWED_AUDIO_EXTENSIONS = ['.mp3', '.wav', '.m4a', '.ogg', '.webm', '.mp4', '.mpeg'];
export const ALLOWED_AUDIO_CONTENT_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
  'audio/mp4',
  'audio/m4a',
  'audio/x-m4a',
  'audio/ogg',
  'audio/webm',
  'video/mp4',
  'video/webm',
];

export const ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
export const ALLOWED_IMAGE_CONTENT_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
