/**
 * Verify OTP schema — VALIDATION_RULES.md §4
 * Endpoint: POST /api/v1/Account/verify-otp
 */
import { z } from 'zod';
import { MAX_EMAIL_LENGTH, OTP_LENGTH } from '../shared/constants.js';
import { OTP_REGEX, NO_FORBIDDEN_CHARS } from '../shared/regex.js';
import { VERIFY_OTP } from '../shared/messages.js';

export const verifyOtpSchema = z.object({
  email: z
    .string({ required_error: VERIFY_OTP.emailRequired })
    .trim()
    .min(1, { message: VERIFY_OTP.emailRequired })
    .max(MAX_EMAIL_LENGTH, { message: VERIFY_OTP.emailMaxLength })
    .email({ message: VERIFY_OTP.emailInvalid })
    .refine((val) => NO_FORBIDDEN_CHARS.test(val), {
      message: VERIFY_OTP.emailForbiddenChars,
    }),

  otp: z
    .string({ required_error: VERIFY_OTP.otpRequired })
    .min(1, { message: VERIFY_OTP.otpRequired })
    .length(OTP_LENGTH, { message: VERIFY_OTP.otpLength })
    .refine((val) => OTP_REGEX.test(val), { message: VERIFY_OTP.otpDigitsOnly }),
});
