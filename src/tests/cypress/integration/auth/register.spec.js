describe('Register Form - Error Messages (Arabic)', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  describe('EM-010 to EM-032: Error Messages', () => {
    it('EM-010: Empty displayName shows Arabic error', () => {
      cy.get('input[name="userName"]').type('testuser');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('Test1234@');
      cy.get('input[name="confirmPassword"]').type('Test1234@');
      cy.get('button[type="submit"]').click();
      cy.contains('الاسم الكامل مطلوب').should('be.visible');
    });

    it('EM-013: Username less than 3 chars shows Arabic error', () => {
      cy.get('input[name="userName"]').clear().type('ab');
      cy.get('button[type="submit"]').click();
      cy.contains('يجب أن يتكون اسم المستخدم من ٣ أحرف على الأقل').should('be.visible');
    });

    it('EM-020: Invalid Egyptian phone shows Arabic error', () => {
      cy.get('input[name="phoneNumber"]').clear().type('1234567890');
      cy.get('button[type="submit"]').click();
      cy.contains('يجب أن يكون رقم الهاتف مصرياً صحيحاً').should('be.visible');
    });

    it('EM-023: Password less than 8 chars shows Arabic error', () => {
      cy.get('input[name="password"]').clear().type('1234567');
      cy.get('button[type="submit"]').click();
      cy.contains('يجب أن تتكون كلمة المرور من ٨ أحرف على الأقل').should('be.visible');
    });

    it('EM-024: Password without uppercase shows Arabic error', () => {
      cy.get('input[name="password"]').clear().type('password1@');
      cy.get('button[type="submit"]').click();
      cy.contains('يجب أن تحتوي كلمة المرور على حرف كبير').should('be.visible');
    });

    it('EM-029: Password mismatch shows Arabic error', () => {
      cy.get('input[name="password"]').clear().type('Password1@');
      cy.get('input[name="confirmPassword"]').clear().type('DifferentPass1@');
      cy.get('button[type="submit"]').click();
      cy.contains('كلمتا المرور غير متطابقتين').should('be.visible');
    });

    it('EM-031: Age under 15 shows Arabic error', () => {
      cy.get('input[name="dateOfBirth"]').clear().type('2015-01-01');
      cy.get('button[type="submit"]').click();
      cy.contains('يجب أن يكون العمر بين ١٥ و٨٠ عاماً').should('be.visible');
    });
  });
});