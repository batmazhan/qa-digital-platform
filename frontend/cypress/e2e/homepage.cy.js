// frontend/cypress/e2e/homepage.cy.js
describe('Homepage UI & Navigation', () => {
  beforeEach(() => {
    // uses baseUrl from cypress.config.(js|ts) if set; otherwise change to your URL
    cy.visit('/');
  });

  it('shows the Articles heading', () => {
    cy.get('[data-testid="articles-heading"]').should('contain.text', 'Articles');
  });

  it('lists at least 2 article items', () => {
    cy.get('[data-testid="article-item"]').should('have.length.at.least', 2);
  });

  it('renders expected sample titles (smoke check)', () => {
    cy.get('[data-testid="article-item"]').then(($items) => {
      const texts = [...$items].map((el) => el.textContent);
      expect(texts.join(' ')).to.include('My Test Article');
      expect(texts.join(' ')).to.include('Nesli Working');
    });
  });

  it('navigates from homepage link to /articles (if link exists)', () => {
  cy.get('body').then(($body) => {
    // check if the element exists
    if ($body.find('[data-testid="articles-link"]').length === 0) {
      cy.log('No [data-testid="articles-link"] found — skipping this test');
      return; // exit the test early
    }

    // otherwise continue navigation check
    cy.get('[data-testid="articles-link"]').click({ force: true });
    cy.url().should('include', '/articles');
    cy.get('[data-testid="articles-heading"]').should('be.visible');
  });
});
});
