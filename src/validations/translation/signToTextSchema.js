/**
 * Sign to Text (Video Upload) schema — VALIDATION_RULES.md §11
 * Endpoint: POST /api/v1/Translate/sign-to-text
 */
import { z } from 'zod';
import {
  MAX_VIDEO_SIZE_BYTES,
  ALLOWED_VIDEO_EXTENSIONS,
  ALLOWED_VIDEO_CONTENT_TYPES,
} from '../shared/constants.js';
import { fileField } from '../shared/helpers.js';
import { TRANSLATION } from '../shared/messages.js';

export const signToTextSchema = z.object({
  video_file: fileField({
    maxSize: MAX_VIDEO_SIZE_BYTES,
    allowedExtensions: ALLOWED_VIDEO_EXTENSIONS,
    allowedContentTypes: ALLOWED_VIDEO_CONTENT_TYPES,
    messages: {
      required: TRANSLATION.videoRequired,
      tooLarge: TRANSLATION.videoTooLarge,
      invalidFormat: TRANSLATION.videoInvalidFormat,
      invalidContentType: TRANSLATION.videoInvalidContentType,
    },
  }),

  language: z.string().optional().default('ar'),
  include_audio: z.boolean().optional().default(false),
});
