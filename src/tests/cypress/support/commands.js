Cypress.Commands.add('login', (email, password) => {
  const testEmail = email || Cypress.env('testEmail');
  const testPassword = password || Cypress.env('testPassword');
  
  cy.visit('/login');
  cy.get('input[type="email"]').clear().type(testEmail);
  cy.get('input[type="password"]').clear().type(testPassword);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard', { timeout: 10000 });
});

Cypress.Commands.add('logout', () => {
  cy.get('button').contains('تسجيل الخروج').click();
  cy.url().should('include', '/login');
});

Cypress.Commands.add('assertArabicError', (selector, expectedMessage) => {
  cy.get(selector)
    .should('be.visible')
    .and('contain', expectedMessage);
});

Cypress.Commands.add('switchToArabic', () => {
  cy.get('html').should('have.attr', 'dir', 'rtl');
});

Cypress.Commands.add('apiRequest', (method, endpoint, body, token) => {
  const baseUrl = Cypress.env('apiUrl') || 'https://api.s2sai.online';
  
  const options = {
    method: method,
    url: `${baseUrl}${endpoint}`,
    headers: { 'Content-Type': 'application/json' },
  };
  
  if (body) options.body = body;
  if (token) options.headers['Authorization'] = `Bearer ${token}`;
  
  return cy.request(options);
});

Cypress.Commands.add('uploadFile', (selector, fileName) => {
  cy.get(selector).selectFile(`src/tests/cypress/fixtures/${fileName}`, { force: true });
});