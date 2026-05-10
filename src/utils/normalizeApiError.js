const DEFAULT_FALLBACKS = {
  "errors.network": "Could not reach the server. Check your internet connection.",
  "errors.tooManyRequests": "Too many attempts. Please wait and try again.",
  "errors.unauthorized": "Your session expired. Please sign in again.",
  "errors.invalidCredentials": "The email or password is incorrect.",
  "errors.forbidden": "You do not have permission to perform this action.",
  "errors.server": "The server is unavailable. Please try again later.",
  "errors.validation": "Some details are invalid. Check the required fields.",
  "errors.unknown": "An unexpected error occurred. Please try again.",
  "errors.audioToSignFailed": "Could not convert audio to sign. Please try again.",
  "errors.textToSignFailed": "Could not convert text to sign. Please try again.",
};

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

const parseBody = (body) => {
  if (!body) return {};
  if (isPlainObject(body)) return body;
  if (typeof body !== "string") return {};
  try {
    const parsed = JSON.parse(body);
    return isPlainObject(parsed) ? parsed : {};
  } catch (_error) {
    return {};
  }
};

const isUnsafeServerMessage = (message) =>
  !message || /<!doctype|<html|<body|<pre|bearer|token|password/i.test(message);

const normalizeFieldErrors = (errors) => {
  if (!isPlainObject(errors)) return {};

  return Object.entries(errors).reduce((acc, [field, value]) => {
    const first = Array.isArray(value) ? value[0] : value;
    if (first !== undefined && first !== null) {
      acc[field] = String(first);
    }
    return acc;
  }, {});
};

const getStatus = (error) => error?.response?.status || error?.status || null;

const getFallbackMessage = (messageKey) =>
  DEFAULT_FALLBACKS[messageKey] || DEFAULT_FALLBACKS["errors.unknown"];

export const normalizeApiError = (error, options = {}) => {
  const status = getStatus(error);
  const data = parseBody(error?.response?.data ?? error?.data);
  const rawMessage = String(
    data?.detail || data?.message || data?.title || error?.message || "",
  ).trim();
  const lowerMessage = rawMessage.toLowerCase();

  let kind = "unknown";
  let messageKey = options.defaultMessageKey || "errors.unknown";
  let retryable = false;

  if (/no speech|speech.*not.*detected|empty audio|silent audio/i.test(rawMessage)) {
    kind = "validation";
    messageKey = "errors.noSpeechDetected";
  } else if (/sigml|animation/i.test(rawMessage) && /invalid|missing|empty|not.*generated/i.test(rawMessage)) {
    kind = "validation";
    messageKey = "errors.noValidSigml";
  } else if (
    !status &&
    (error?.code === "ECONNABORTED" ||
      error?.name === "AbortError" ||
      /network|timeout|failed to fetch|cors|offline/i.test(rawMessage))
  ) {
    kind = "network";
    messageKey = "errors.network";
    retryable = true;
  } else if (status === 400 || status === 422) {
    kind = "validation";
    messageKey = options.validationMessageKey || "errors.validation";
  } else if (status === 401) {
    kind = "unauthorized";
    messageKey = options.invalidCredentials ? "errors.invalidCredentials" : "errors.unauthorized";
  } else if (status === 403) {
    kind = "forbidden";
    messageKey = "errors.forbidden";
  } else if (status === 429) {
    kind = "too_many_requests";
    messageKey = "errors.tooManyRequests";
  } else if (status >= 500 || status === 0) {
    kind = "server";
    messageKey = "errors.server";
    retryable = true;
  } else if (/network|timeout|failed to fetch|cors|offline/i.test(lowerMessage)) {
    kind = "network";
    messageKey = "errors.network";
    retryable = true;
  }

  if (options.messageKey) {
    messageKey = options.messageKey;
  }

  return {
    kind,
    status,
    messageKey,
    fallbackMessage: isUnsafeServerMessage(rawMessage)
      ? getFallbackMessage(messageKey)
      : getFallbackMessage(messageKey),
    fieldErrors: normalizeFieldErrors(data?.errors),
    retryable,
  };
};

export const getErrorMessageKey = (error, options) =>
  normalizeApiError(error, options).messageKey;
