/**
 * Audio to Text (Audio Upload) schema — VALIDATION_RULES.md §12
 * Endpoint: POST /api/v1/Translate/audio-to-text
 */
import { z } from 'zod';
import {
  MAX_AUDIO_SIZE_BYTES,
  ALLOWED_AUDIO_EXTENSIONS,
  ALLOWED_AUDIO_CONTENT_TYPES,
} from '../shared/constants.js';
import { fileField } from '../shared/helpers.js';
import { TRANSLATION } from '../shared/messages.js';

export const audioToTextSchema = z.object({
  audio_file: fileField({
    maxSize: MAX_AUDIO_SIZE_BYTES,
    allowedExtensions: ALLOWED_AUDIO_EXTENSIONS,
    allowedContentTypes: ALLOWED_AUDIO_CONTENT_TYPES,
    messages: {
      required: TRANSLATION.audioRequired,
      tooLarge: TRANSLATION.audioTooLarge,
      invalidFormat: TRANSLATION.audioInvalidFormat,
      invalidContentType: TRANSLATION.audioInvalidContentType,
    },
  }),

  language: z.string().optional().default('ar'),
});
