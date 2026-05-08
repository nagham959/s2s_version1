/**
 * Text to Sign schema — VALIDATION_RULES.md §13
 * Endpoint: POST /api/v1/Translate/text-to-sign
 */
import { z } from 'zod';
import { MAX_TRANSLATION_TEXT_LENGTH } from '../shared/constants.js';
import { TRANSLATION } from '../shared/messages.js';

export const textToSignSchema = z.object({
  text: z
    .string({ required_error: TRANSLATION.textRequired })
    .trim()
    .min(1, { message: TRANSLATION.textRequired })
    .max(MAX_TRANSLATION_TEXT_LENGTH, { message: TRANSLATION.textTooLong }),

  avatar: z.string().optional().default('default'),
  speed: z.string().optional().default('1.0'),
  output_format: z.string().optional().default('pose'),
});
