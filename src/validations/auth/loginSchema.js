/**
 * Login schema — VALIDATION_RULES.md §3
 * Endpoint: POST /api/v1/Account/login
 *
 * NOTE: Login does NOT enforce password complexity (uppercase, digit, etc.).
 * It only requires: not empty, max 100 chars.
 */
import { z } from 'zod';
import { MAX_EMAIL_LENGTH, PASSWORD_MAX_LENGTH } from '../shared/constants.js';
import { SHARED, LOGIN } from '../shared/messages.js';

export const loginSchema = z.object({
  email: z
    .string({ required_error: SHARED.emailRequired })
    .trim()
    .min(1, { message: SHARED.emailRequired })
    .max(MAX_EMAIL_LENGTH, { message: SHARED.emailMaxLength })
    .email({ message: SHARED.emailInvalid }),

  password: z
    .string({ required_error: SHARED.passwordRequired })
    .min(1, { message: SHARED.passwordRequired })
    .max(PASSWORD_MAX_LENGTH, { message: LOGIN.passwordMaxLength }),
});
