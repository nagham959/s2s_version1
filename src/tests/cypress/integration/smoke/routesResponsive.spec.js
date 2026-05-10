const publicRoutes = [
  '/',
  '/home',
  '/features',
  '/about',
  '/pricing',
  '/terms',
  '/privacy',
  '/faq',
  '/contact',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
];

const protectedRoutes = [
  '/dashboard',
  '/history',
  '/profile-settings',
  '/change-password',
];

const breakpoints = [
  [320, 720],
  [360, 740],
  [375, 812],
  [390, 844],
  [414, 896],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1280, 720],
  [1440, 900],
];

const assertNoHorizontalOverflow = () => {
  cy.window().then((win) => {
    const documentWidth = win.document.documentElement.scrollWidth;
    expect(documentWidth, 'document width').to.be.lte(win.innerWidth + 2);
  });
};

describe('Routes and responsive smoke coverage', () => {
  breakpoints.forEach(([width, height]) => {
    context(`${width}x${height}`, () => {
      publicRoutes.forEach((route) => {
        it(`renders public route ${route}`, () => {
          cy.viewport(width, height);
          cy.visit(route);
          cy.get('#root').children().should('have.length.greaterThan', 0);
          assertNoHorizontalOverflow();
        });
      });

      protectedRoutes.forEach((route) => {
        it(`redirects protected route ${route}`, () => {
          cy.viewport(width, height);
          cy.visit(route);
          cy.location('pathname').should('eq', '/login');
          assertNoHorizontalOverflow();
        });
      });
    });
  });
});
