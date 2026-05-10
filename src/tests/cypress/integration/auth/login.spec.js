describe('Login Form - Error Messages (Arabic)', () => {
  const testEmail = Cypress.env('testEmail') || 'test@example.com';
  const testPassword = Cypress.env('testPassword') || 'ChangeMe123!';

  beforeEach(() => {
    cy.visit('/login');
  });

  describe('EM-001 to EM-007: Error Messages', () => {
    it('EM-001: Empty email shows Arabic error', () => {
      cy.get('input[type="password"]').type('anypassword');
      cy.get('button[type="submit"]').click();
      cy.contains('البريد الإلكتروني مطلوب').should('be.visible');
    });

    it('EM-002: Invalid email format shows Arabic error', () => {
      cy.get('input[type="email"]').clear().type('notanemail');
      cy.get('input[type="password"]').type('anypassword');
      cy.get('button[type="submit"]').click();
      cy.contains('يجب إدخال بريد إلكتروني صحيح').should('be.visible');
    });

    it('EM-005: Empty password shows Arabic error', () => {
      cy.get('input[type="email"]').clear().type('test@example.com');
      cy.get('button[type="submit"]').click();
      cy.contains('كلمة المرور مطلوبة').should('be.visible');
    });

    it('EM-007: Wrong credentials shows Arabic error', () => {
      cy.get('input[type="email"]').clear().type(testEmail);
      cy.get('input[type="password"]').clear().type('WrongPassword123');
      cy.get('button[type="submit"]').click();
      cy.contains('البريد الإلكتروني أو كلمة المرور غير صحيحة').should('be.visible');
    });
  });

  describe('POS-001: Valid Login', () => {
    it('Should login successfully with valid credentials', () => {
      if (!Cypress.env('testEmail') || !Cypress.env('testPassword')) {
        cy.log('Skipping valid login: CYPRESS_TEST_EMAIL/CYPRESS_TEST_PASSWORD are not set.');
        return;
      }
      cy.get('input[type="email"]').clear().type(testEmail);
      cy.get('input[type="password"]').clear().type(testPassword);
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard', { timeout: 15000 });
    });
  });
});
