/**
 * Centralized validation error messages — using i18n keys instead of hardcoded strings.
 * These keys map to translations in locales/en.json and locales/ar.json.
 *
 * Messages are grouped by feature/endpoint for easy maintenance.
 */

// ── Shared / Reusable ────────────────────────────────────────────────
export const SHARED = {
  emailRequired: 'validation.shared.emailRequired',
  emailInvalid: 'validation.shared.emailInvalid',
  emailMaxLength: 'validation.shared.emailMaxLength',
  emailForbiddenChars: 'validation.shared.emailForbiddenChars',
  passwordRequired: 'validation.shared.passwordRequired',
  passwordMinLength: 'validation.shared.passwordMinLength',
  passwordMaxLength: 'validation.shared.passwordMaxLength',
  passwordUppercase: 'validation.shared.passwordUppercase',
  passwordLowercase: 'validation.shared.passwordLowercase',
  passwordDigit: 'validation.shared.passwordDigit',
  passwordSpecialChar: 'validation.shared.passwordSpecialChar',
  passwordNoHtmlTags: 'validation.shared.passwordNoHtmlTags',
  confirmPasswordRequired: 'validation.shared.confirmPasswordRequired',
  confirmPasswordMismatch: 'validation.shared.confirmPasswordMismatch',
};

// ── Register (§2) ────────────────────────────────────────────────────
export const REGISTER = {
  displayNameRequired: 'validation.register.displayNameRequired',
  displayNameMaxLength: 'validation.register.displayNameMaxLength',
  usernameRequired: 'validation.register.usernameRequired',
  usernameMinLength: 'validation.register.usernameMinLength',
  usernameMaxLength: 'validation.register.usernameMaxLength',
  usernamePattern: 'validation.register.usernamePattern',
  phoneRequired: 'validation.register.phoneRequired',
  phoneInvalid: 'validation.register.phoneInvalid',
  dobRequired: 'validation.register.dobRequired',
  dobAge: 'validation.register.dobAge',
  userTypeRequired: 'validation.register.userTypeRequired',
  signLanguageRequired: 'validation.register.signLanguageRequired',
};

// ── Login (§3) ────────────────────────────────────────────────────────
export const LOGIN = {
  passwordMaxLength: 'validation.login.passwordMaxLength',
};

// ── Verify OTP (§4) ──────────────────────────────────────────────────
export const VERIFY_OTP = {
  emailRequired: 'validation.verifyOtp.emailRequired',
  emailInvalid: 'validation.verifyOtp.emailInvalid',
  emailMaxLength: 'validation.verifyOtp.emailMaxLength',
  emailForbiddenChars: 'validation.verifyOtp.emailForbiddenChars',
  otpRequired: 'validation.verifyOtp.otpRequired',
  otpLength: 'validation.verifyOtp.otpLength',
  otpDigitsOnly: 'validation.verifyOtp.otpDigitsOnly',
};

// ── Forgot Password (§5) ─────────────────────────────────────────────
export const FORGOT_PASSWORD = {
  emailRequired: 'validation.forgotPassword.emailRequired',
  emailMaxLength: 'validation.forgotPassword.emailMaxLength',
  emailInvalid: 'validation.forgotPassword.emailInvalid',
  emailFormat: 'validation.forgotPassword.emailFormat',
  emailForbiddenChars: 'validation.forgotPassword.emailForbiddenChars',
};

// ── Reset Password (§6) ──────────────────────────────────────────────
export const RESET_PASSWORD = {
  tokenRequired: 'validation.resetPassword.tokenRequired',
};

// ── Change Password (§7) ─────────────────────────────────────────────
export const CHANGE_PASSWORD = {
  currentPasswordRequired: 'validation.changePassword.currentPasswordRequired',
  newPasswordRequired: 'validation.changePassword.newPasswordRequired',
  newPasswordSameAsCurrent: 'validation.changePassword.newPasswordSameAsCurrent',
};

// ── Update Profile (§8) ──────────────────────────────────────────────
export const UPDATE_PROFILE = {
  displayNameEmpty: 'validation.updateProfile.displayNameEmpty',
  displayNameMaxLength: 'validation.updateProfile.displayNameMaxLength',
  phoneInvalid: 'validation.updateProfile.phoneInvalid',
};

// ── Firebase Login (§9) ──────────────────────────────────────────────
export const FIREBASE_LOGIN = {
  idTokenRequired: 'validation.firebaseLogin.idTokenRequired',
};

// ── FCM Token (§10) ──────────────────────────────────────────────────
export const FCM_TOKEN = {
  fcmTokenRequired: 'validation.fcmToken.fcmTokenRequired',
};

// ── Translation (§11-14) ─────────────────────────────────────────────
export const TRANSLATION = {
  videoRequired: 'validation.translation.videoRequired',
  videoTooLarge: 'validation.translation.videoTooLarge',
  videoInvalidFormat: 'validation.translation.videoInvalidFormat',
  videoInvalidContentType: 'validation.translation.videoInvalidContentType',
  audioRequired: 'validation.translation.audioRequired',
  audioTooLarge: 'validation.translation.audioTooLarge',
  audioInvalidFormat: 'validation.translation.audioInvalidFormat',
  audioInvalidContentType: 'validation.translation.audioInvalidContentType',
  textRequired: 'validation.translation.textRequired',
  textTooLong: 'validation.translation.textTooLong',
};

// ── TTS (§15) ────────────────────────────────────────────────────────
export const TTS = {
  textRequired: 'validation.tts.textRequired',
  textTooLong: 'validation.tts.textTooLong',
};

// ── Change Email (§19) ───────────────────────────────────────────────
export const CHANGE_EMAIL = {
  newEmailRequired: 'validation.changeEmail.newEmailRequired',
  newEmailInvalid: 'validation.changeEmail.newEmailInvalid',
  currentPasswordRequired: 'validation.changeEmail.currentPasswordRequired',
  currentPasswordMaxLength: 'validation.changeEmail.currentPasswordMaxLength',
  otpRequired: 'validation.changeEmail.otpRequired',
  otpLength: 'validation.changeEmail.otpLength',
};

// ── Profile Image (§22) ──────────────────────────────────────────────
export const PROFILE_IMAGE = {
  imageRequired: 'validation.profileImage.imageRequired',
  imageTooLarge: 'validation.profileImage.imageTooLarge',
  imageInvalidFormat: 'validation.profileImage.imageInvalidFormat',
  imageInvalidContentType: 'validation.profileImage.imageInvalidContentType',
};
