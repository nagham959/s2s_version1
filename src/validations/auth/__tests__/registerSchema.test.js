const { registerSchema } = require('../registerSchema.js');

describe('Register Schema Validation', () => {
  // Use numeric enum values: Deaf=1, NormalUser=2, Egyptian=1
  const validData = {
    displayName: 'Test User',
    userName: 'testuser',
    email: 'test@example.com',
    password: 'Test1234@',
    confirmPassword: 'Test1234@',
    phoneNumber: '01012345678',
    dateOfBirth: '1995-01-01',
    userType: 2,  // NormalUser = 2
    usesSignLanguage: false,
  };

  test('valid registration data', () => {
    const result = registerSchema.safeParse(validData);
    if (!result.success) {
      console.log('Errors:', JSON.stringify(result.error.issues, null, 2));
    }
    expect(result.success).toBe(true);
  });

  test('invalid email format', () => {
    const result = registerSchema.safeParse({ ...validData, email: 'invalid' });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('validation.shared.emailInvalid');
  });

  test('empty displayName', () => {
    const result = registerSchema.safeParse({ ...validData, displayName: '' });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('validation.register.displayNameRequired');
  });

  test('short username', () => {
    const result = registerSchema.safeParse({ ...validData, userName: 'ab' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.register.usernameMinLength'))).toBe(true);
  });

  test('username with invalid characters', () => {
    const result = registerSchema.safeParse({ ...validData, userName: 'test@user' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.register.usernamePattern'))).toBe(true);
  });

  test('password mismatch', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'Test1234@',
      confirmPassword: 'DifferentPass1@'
    });
    expect(result.success).toBe(false);
    // The error should be on confirmPassword field
    expect(result.error.issues.some(issue => 
      issue.path[0] === 'confirmPassword'
    )).toBe(true);
  });

  test('sign language required when usesSignLanguage is true', () => {
    const result = registerSchema.safeParse({
      ...validData,
      usesSignLanguage: true,
      signLanguage: undefined
    });
    expect(result.success).toBe(false);
    // Should have error about sign language required
    expect(result.error.issues.some(i => 
      i.path[0] === 'signLanguage' || 
      i.message.includes('validation.register.signLanguageRequired')
    )).toBe(true);
  });

  test('sign language works when provided', () => {
    const result = registerSchema.safeParse({
      ...validData,
      usesSignLanguage: true,
      signLanguage: 1  // Egyptian = 1
    });
    expect(result.success).toBe(true);
  });

  test('invalid phone number', () => {
    const result = registerSchema.safeParse({ ...validData, phoneNumber: '1234567890' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.register.phoneInvalid'))).toBe(true);
  });

  test('password without uppercase', () => {
    const result = registerSchema.safeParse({ ...validData, password: 'test1234@' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.shared.passwordUppercase'))).toBe(true);
  });

  test('password without lowercase', () => {
    const result = registerSchema.safeParse({ ...validData, password: 'TEST1234@' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.shared.passwordLowercase'))).toBe(true);
  });

  test('password without digit', () => {
    const result = registerSchema.safeParse({ ...validData, password: 'TestPass@' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.shared.passwordDigit'))).toBe(true);
  });

  test('password without special char', () => {
    const result = registerSchema.safeParse({ ...validData, password: 'TestPass123' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.shared.passwordSpecialChar'))).toBe(true);
  });

  test('displayName exceeding max length', () => {
    const result = registerSchema.safeParse({ ...validData, displayName: 'a'.repeat(51) });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.register.displayNameMaxLength'))).toBe(true);
  });

  test('empty userName', () => {
    const result = registerSchema.safeParse({ ...validData, userName: '' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.register.usernameRequired'))).toBe(true);
  });

  test('empty password', () => {
    const result = registerSchema.safeParse({ ...validData, password: '' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.shared.passwordRequired'))).toBe(true);
  });

  test('empty phoneNumber', () => {
    const result = registerSchema.safeParse({ ...validData, phoneNumber: '' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.register.phoneRequired'))).toBe(true);
  });

  test('age under 15 should fail', () => {
    const result = registerSchema.safeParse({ ...validData, dateOfBirth: '2015-01-01' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.register.dobAge'))).toBe(true);
  });

  test('age over 80 should fail', () => {
    const result = registerSchema.safeParse({ ...validData, dateOfBirth: '1940-01-01' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.message.includes('validation.register.dobAge'))).toBe(true);
  });

  test('deaf user type', () => {
    const result = registerSchema.safeParse({ ...validData, userType: 1 });
    expect(result.success).toBe(true);
  });
});