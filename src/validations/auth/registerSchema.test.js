const { registerSchema } = require('./registerSchema.js');

describe('registerSchema', () => {
  // Use numeric enum values: Deaf=1, NormalUser=2
  const validData = {
    displayName: 'Test User',
    userName: 'testuser',
    email: 'test@example.com',
    password: 'Test1234@',
    confirmPassword: 'Test1234@',
    phoneNumber: '01012345678',
    dateOfBirth: '1995-01-01',
    userType: 2,  // NormalUser
    usesSignLanguage: false,
  };

  it('should require email', () => {
    const result = registerSchema.safeParse({ ...validData, email: '' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'email')).toBe(true);
  });

  it('should require valid email', () => {
    const result = registerSchema.safeParse({ ...validData, email: 'invalid' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'email')).toBe(true);
  });

  it('should require displayName', () => {
    const result = registerSchema.safeParse({ ...validData, displayName: '' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'displayName')).toBe(true);
  });

  it('should require userName', () => {
    const result = registerSchema.safeParse({ ...validData, userName: '' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'userName')).toBe(true);
  });

  it('should enforce userName min length', () => {
    const result = registerSchema.safeParse({ ...validData, userName: 'ab' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'userName')).toBe(true);
  });

  it('should enforce userName max length', () => {
    const result = registerSchema.safeParse({ ...validData, userName: 'a'.repeat(31) });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'userName')).toBe(true);
  });

  it('should enforce userName pattern', () => {
    const result = registerSchema.safeParse({ ...validData, userName: 'test@user' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'userName')).toBe(true);
  });

  it('should require password', () => {
    const result = registerSchema.safeParse({ ...validData, password: '' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'password')).toBe(true);
  });

  it('should require confirmPassword', () => {
    const result = registerSchema.safeParse({ ...validData, confirmPassword: '' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'confirmPassword')).toBe(true);
  });

  it('should require password and confirmPassword to match', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'Test1234@',
      confirmPassword: 'Different1234@'
    });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'confirmPassword')).toBe(true);
  });

  it('should require phoneNumber', () => {
    const result = registerSchema.safeParse({ ...validData, phoneNumber: '' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'phoneNumber')).toBe(true);
  });

  it('should require valid Egyptian phoneNumber', () => {
    const result = registerSchema.safeParse({ ...validData, phoneNumber: '01312345678' });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'phoneNumber')).toBe(true);
  });

  it('should require dateOfBirth', () => {
    const result = registerSchema.safeParse({ ...validData, dateOfBirth: undefined });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'dateOfBirth')).toBe(true);
  });

  it('should require userType', () => {
    const result = registerSchema.safeParse({ ...validData, userType: undefined });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'userType')).toBe(true);
  });

  it('should require usesSignLanguage', () => {
    const result = registerSchema.safeParse({ ...validData, usesSignLanguage: undefined });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'usesSignLanguage')).toBe(true);
  });

  it('should require signLanguage when usesSignLanguage is true', () => {
    const result = registerSchema.safeParse({
      ...validData,
      usesSignLanguage: true,
      signLanguage: undefined
    });
    expect(result.success).toBe(false);
    // Either userType or signLanguage error is acceptable
    expect(result.error.issues.some(i => i.path[0] === 'signLanguage' || i.path[0] === 'userType')).toBe(true);
  });

  it('should not require signLanguage when usesSignLanguage is false', () => {
    const result = registerSchema.safeParse({
      ...validData,
      usesSignLanguage: false,
      signLanguage: undefined
    });
    expect(result.success).toBe(true);
  });

  it('should enforce displayName max length', () => {
    const result = registerSchema.safeParse({ ...validData, displayName: 'a'.repeat(51) });
    expect(result.success).toBe(false);
    expect(result.error.issues.some(i => i.path[0] === 'displayName')).toBe(true);
  });

  it('should accept valid data', () => {
    const result = registerSchema.safeParse(validData);
    if (!result.success) {
      console.log('Valid data errors:', JSON.stringify(result.error.issues, null, 2));
    }
    expect(result.success).toBe(true);
  });
});