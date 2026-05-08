/**
 * Update Profile schema — VALIDATION_RULES.md §8
 * Endpoint: PUT /api/v1/Profile/update
 */
import { z } from 'zod';
import { MAX_DISPLAY_NAME_LENGTH } from '../shared/constants.js';
import { phoneFieldOptional } from '../shared/helpers.js';
import { UPDATE_PROFILE } from '../shared/messages.js';

export const updateProfileSchema = z.object({
  displayName: z
    .string({ required_error: UPDATE_PROFILE.displayNameEmpty })
    .trim()
    .min(1, { message: UPDATE_PROFILE.displayNameEmpty })
    .max(MAX_DISPLAY_NAME_LENGTH, { message: UPDATE_PROFILE.displayNameMaxLength }),

  phoneNumber: phoneFieldOptional(UPDATE_PROFILE.phoneInvalid),
});
