/**
 * Register schema — VALIDATION_RULES.md §2
 * Endpoint: POST /api/v1/Account/register
 */
import { z } from 'zod';
import {
  MAX_DISPLAY_NAME_LENGTH,
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  UserType,
  SignLanguage,
} from '../shared/constants.js';
import { USERNAME_REGEX } from '../shared/regex.js';
import { REGISTER } from '../shared/messages.js';
import {
  emailFieldStrict,
  passwordField,
  phoneFieldRequired,
  dateOfBirthField,
  confirmPasswordMatch,
} from '../shared/helpers.js';

export const registerSchema = z
  .object({
    email: emailFieldStrict(),

    displayName: z
      .string({ required_error: REGISTER.displayNameRequired })
      .trim()
      .min(1, { message: REGISTER.displayNameRequired })
      .max(MAX_DISPLAY_NAME_LENGTH, { message: REGISTER.displayNameMaxLength }),

    userName: z
      .string({ required_error: REGISTER.usernameRequired })
      .trim()
      .min(1, { message: REGISTER.usernameRequired })
      .min(MIN_USERNAME_LENGTH, { message: REGISTER.usernameMinLength })
      .max(MAX_USERNAME_LENGTH, { message: REGISTER.usernameMaxLength })
      .refine((val) => USERNAME_REGEX.test(val), { message: REGISTER.usernamePattern }),

    password: passwordField(),

    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required.' }),

    phoneNumber: phoneFieldRequired(),

    dateOfBirth: dateOfBirthField(),

    userType: z.nativeEnum(UserType, {
      required_error: REGISTER.userTypeRequired,
      invalid_type_error: REGISTER.userTypeRequired,
    }),

    usesSignLanguage: z.boolean(),

    signLanguage: z.nativeEnum(SignLanguage).optional().nullable(),
  })
  .superRefine(confirmPasswordMatch('password', 'confirmPassword'));
