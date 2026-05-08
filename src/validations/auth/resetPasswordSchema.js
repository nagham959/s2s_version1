/**
 * Reset Password schema — VALIDATION_RULES.md §6
 * Endpoint: POST /api/v1/Account/reset-password
 */
import { z } from 'zod';
import { SHARED, RESET_PASSWORD } from '../shared/messages.js';
import { passwordFieldNoHtml, confirmPasswordMatch } from '../shared/helpers.js';

export const resetPasswordSchema = z
  .object({
    token: z
      .string({ required_error: RESET_PASSWORD.tokenRequired })
      .min(1, { message: RESET_PASSWORD.tokenRequired }),

    newPassword: passwordFieldNoHtml(),

    confirmPassword: z
      .string({ required_error: SHARED.confirmPasswordRequired })
      .min(1, { message: SHARED.confirmPasswordRequired }),
  })
  .superRefine(confirmPasswordMatch('newPassword', 'confirmPassword'));
