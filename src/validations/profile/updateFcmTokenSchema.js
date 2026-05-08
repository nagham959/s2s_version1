/**
 * Update FCM Token schema — VALIDATION_RULES.md §10
 * Endpoint: PUT /api/v1/Profile/fcm-token
 */
import { z } from 'zod';
import { FCM_TOKEN } from '../shared/messages.js';

export const updateFcmTokenSchema = z.object({
  fcmToken: z
    .string({ required_error: FCM_TOKEN.fcmTokenRequired })
    .min(1, { message: FCM_TOKEN.fcmTokenRequired }),
});
