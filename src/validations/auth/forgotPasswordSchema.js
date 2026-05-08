/**
 * Forgot Password schema — VALIDATION_RULES.md §5
 * Endpoint: POST /api/v1/Account/forgot-password
 *
 * Uses the STRICT email regex: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
 * Plus forbidden chars check.
 */
import { z } from 'zod';
import { MAX_EMAIL_LENGTH } from '../shared/constants.js';
import { EMAIL_STRICT_REGEX, NO_FORBIDDEN_CHARS } from '../shared/regex.js';
import { FORGOT_PASSWORD } from '../shared/messages.js';

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: FORGOT_PASSWORD.emailRequired })
    .trim()
    .min(1, { message: FORGOT_PASSWORD.emailRequired })
    .max(MAX_EMAIL_LENGTH, { message: FORGOT_PASSWORD.emailMaxLength })
    .refine((val) => EMAIL_STRICT_REGEX.test(val), {
      message: FORGOT_PASSWORD.emailFormat,
    })
    .refine((val) => NO_FORBIDDEN_CHARS.test(val), {
      message: FORGOT_PASSWORD.emailForbiddenChars,
    }),
});
