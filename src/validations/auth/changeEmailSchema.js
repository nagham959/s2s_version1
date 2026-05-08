/**
 * Change Email schemas — VALIDATION_RULES.md §19
 * Step 1: POST /api/v1/Auth/ChangeEmail
 * Step 2: POST /api/v1/Auth/ConfirmEmailChange
 */
import { z } from 'zod';
import { MAX_EMAIL_LENGTH, PASSWORD_MAX_LENGTH, OTP_LENGTH } from '../shared/constants.js';
import { NO_FORBIDDEN_CHARS, OTP_REGEX } from '../shared/regex.js';
import { CHANGE_EMAIL } from '../shared/messages.js';

/**
 * Step 1: Request email change — requires new email + current password.
 */
export const requestEmailChangeSchema = z.object({
  newEmail: z
    .string({ required_error: CHANGE_EMAIL.newEmailRequired })
    .trim()
    .min(1, { message: CHANGE_EMAIL.newEmailRequired })
    .max(MAX_EMAIL_LENGTH, { message: 'Email cannot exceed 256 characters.' })
    .email({ message: CHANGE_EMAIL.newEmailInvalid })
    .refine((val) => NO_FORBIDDEN_CHARS.test(val), {
      message: 'Email contains forbidden characters.',
    }),

  currentPassword: z
    .string({ required_error: CHANGE_EMAIL.currentPasswordRequired })
    .min(1, { message: CHANGE_EMAIL.currentPasswordRequired })
    .max(PASSWORD_MAX_LENGTH, { message: CHANGE_EMAIL.currentPasswordMaxLength }),
});

/**
 * Step 2: Confirm email change — requires new email + OTP.
 */
export const confirmEmailChangeSchema = z.object({
  newEmail: z
    .string({ required_error: CHANGE_EMAIL.newEmailRequired })
    .trim()
    .min(1, { message: CHANGE_EMAIL.newEmailRequired })
    .max(MAX_EMAIL_LENGTH, { message: 'Email cannot exceed 256 characters.' })
    .email({ message: CHANGE_EMAIL.newEmailInvalid }),

  otp: z
    .string({ required_error: CHANGE_EMAIL.otpRequired })
    .min(1, { message: CHANGE_EMAIL.otpRequired })
    .length(OTP_LENGTH, { message: CHANGE_EMAIL.otpLength })
    .refine((val) => OTP_REGEX.test(val), {
      message: CHANGE_EMAIL.otpLength,
    }),
});
