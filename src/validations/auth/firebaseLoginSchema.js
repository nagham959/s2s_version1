/**
 * Firebase Login schema — VALIDATION_RULES.md §9
 * Endpoint: POST /api/v1/Account/firebase-login
 *
 * NOTE: The actual token validation is done server-side via Firebase Admin SDK.
 * Frontend only ensures the token string is not empty.
 */
import { z } from 'zod';
import { FIREBASE_LOGIN } from '../shared/messages.js';

export const firebaseLoginSchema = z.object({
  idToken: z
    .string({ required_error: FIREBASE_LOGIN.idTokenRequired })
    .min(1, { message: FIREBASE_LOGIN.idTokenRequired }),
});
