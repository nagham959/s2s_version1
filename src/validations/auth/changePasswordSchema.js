/**
 * Change Password schema — VALIDATION_RULES.md §7
 * Endpoint: PUT /api/v1/Profile/change-password
 */
import { z } from "zod";
import { SHARED, CHANGE_PASSWORD } from "../shared/messages.js";
import {
  passwordFieldNoHtml,
  confirmPasswordMatch,
} from "../shared/helpers.js";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: CHANGE_PASSWORD.currentPasswordRequired })
      .min(1, { message: CHANGE_PASSWORD.currentPasswordRequired }),

    newPassword: passwordFieldNoHtml({
      required: CHANGE_PASSWORD.newPasswordRequired,
    }),

    confirmPassword: z
      .string({ required_error: SHARED.confirmPasswordRequired })
      .min(1, { message: SHARED.confirmPasswordRequired }),
  })
  .superRefine((data, ctx) => {
    // NewPassword must differ from CurrentPassword
    if (
      data.newPassword &&
      data.currentPassword &&
      data.newPassword === data.currentPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: CHANGE_PASSWORD.newPasswordSameAsCurrent,
        path: ["newPassword"],
      });
    }
  })
  .superRefine(confirmPasswordMatch("newPassword", "confirmPassword"));
