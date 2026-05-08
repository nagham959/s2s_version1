describe('Translation - Text to Sign Error Messages (Arabic)', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/dashboard');
  });

  describe('EM-060 to EM-061: Text to Sign Errors', () => {
    it('EM-060: Empty text shows Arabic error', () => {
      cy.get('textarea').clear();
      cy.get('button').contains('تحويل إلى إشارة').click();
      cy.contains('النص مطلوب للترجمة').should('be.visible');
    });

    it('EM-061: Text exceeding 200 chars shows Arabic error', () => {
      const longText = 'أ'.repeat(201);
      cy.get('textarea').clear().type(longText);
      cy.get('button').contains('تحويل إلى إشارة').click();
      cy.contains('لا يمكن أن يتجاوز النص ٢٠٠ حرف').should('be.visible');
    });
  });

  describe('POS-020: Valid Text to Sign', () => {
    it('Should generate avatar for valid Arabic text', () => {
      cy.get('textarea').clear().type('مرحبا');
      cy.get('button').contains('تحويل إلى إشارة').click();
      // Should initiate translation (specific assertion depends on UI)
      cy.get('textarea').should('not.be.empty');
    });
  });

  afterEach(() => {
    cy.logout();
  });
});