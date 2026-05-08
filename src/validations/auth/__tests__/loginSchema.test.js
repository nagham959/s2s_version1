const { loginSchema } = require('../loginSchema.js');

describe('Login Schema Validation', () => {
  test('valid email and password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(result.success).toBe(true);
  });

  test('invalid email format', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: 'password123'
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('validation.shared.emailInvalid');
  });

  test('empty email', () => {
    const result = loginSchema.safeParse({
      email: '',
      password: 'password123'
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('validation.shared.emailRequired');
  });

  test('email exceeding max length', () => {
    const result = loginSchema.safeParse({
      email: 'a'.repeat(255) + '@example.com',
      password: 'password123'
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('validation.shared.emailMaxLength');
  });

  test('empty password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: ''
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('validation.shared.passwordRequired');
  });

  test('password exceeding max length', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'a'.repeat(101)
    });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('validation.login.passwordMaxLength');
  });
});