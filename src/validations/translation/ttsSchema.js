/**
 * Text-to-Speech (TTS) schema — VALIDATION_RULES.md §15
 * Used internally, but documented for validation logic.
 */
import { z } from 'zod';
import { MAX_TTS_TEXT_LENGTH } from '../shared/constants.js';
import { TTS } from '../shared/messages.js';

export const ttsSchema = z.object({
  text: z
    .string({ required_error: TTS.textRequired })
    .trim()
    .min(1, { message: TTS.textRequired })
    .max(MAX_TTS_TEXT_LENGTH, { message: TTS.textTooLong }),
});
