/**
 * Profile Image Upload schema — VALIDATION_RULES.md §22
 * Endpoint: POST /api/v1/Auth/UploadProfileImage
 */
import { z } from 'zod';
import {
  MAX_PROFILE_IMAGE_SIZE_BYTES,
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_CONTENT_TYPES,
} from '../shared/constants.js';
import { fileField } from '../shared/helpers.js';
import { PROFILE_IMAGE } from '../shared/messages.js';

export const uploadProfileImageSchema = z.object({
  image: fileField({
    maxSize: MAX_PROFILE_IMAGE_SIZE_BYTES,
    allowedExtensions: ALLOWED_IMAGE_EXTENSIONS,
    allowedContentTypes: ALLOWED_IMAGE_CONTENT_TYPES,
    messages: {
      required: PROFILE_IMAGE.imageRequired,
      tooLarge: PROFILE_IMAGE.imageTooLarge,
      invalidFormat: PROFILE_IMAGE.imageInvalidFormat,
      invalidContentType: PROFILE_IMAGE.imageInvalidContentType,
    },
  }),
});
