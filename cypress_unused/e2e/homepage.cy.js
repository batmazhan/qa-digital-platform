describe('Homepage UI & Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001');
  });

  it('should display at least 2 articles on the homepage', () => {
    cy.get('[data-testid="article-item"]').should('have.length.at.least', 2);
  });

  it('should display article titles', () => {
    cy.get('[data-testid="article-item"]').eq(0).should('contain.text', 'My Test Article');
    cy.get('[data-testid="article-item"]').eq(1).should('contain.text', 'Nesli working');
  });

  it('should navigate to article detail page on click (if routing exists)', () => {
    cy.get('[data-testid="article-item"]')
      .first()
      .find('a')
      .click();
    cy.url().should('include', '/article');
  });

  it('should display header and footer if available', () => {
    cy.get('header').should('exist');
    cy.get('footer').should('exist');
  });

  it('should scroll to the bottom of the page', () => {
    cy.scrollTo('bottom');
  });

  it('should not show error messages on load', () => {
    cy.contains('Error').should('not.exist');
    cy.contains('404').should('not.exist');
  });

  it('should display homepage CTAs', () => {
    cy.get('[data-testid="deploy-now-link"]').should('exist').and('be.visible');
    cy.get('[data-testid="docs-link"]').should('exist').and('be.visible');
    cy.get('[data-testid="learn-link"]').should('exist').and('be.visible');
    cy.get('[data-testid="examples-link"]').should('exist').and('be.visible');
    cy.get('[data-testid="nextjs-link"]').should('exist').and('be.visible');
  });

  it('should have correct href for Deploy now', () => {
    cy.get('[data-testid="deploy-now-link"]')
      .should('have.attr', 'href')
      .and('include', 'vercel.com/new');
  });

  it('should have correct href for Docs', () => {
    cy.get('[data-testid="docs-link"]')
      .should('have.attr', 'href')
      .and('include', 'nextjs.org/docs');
  });

  it('should have correct href for Learn', () => {
    cy.get('[data-testid="learn-link"]')
      .should('have.attr', 'href')
      .and('include', 'nextjs.org/learn');
  });

  it('should have correct href for Examples', () => {
    cy.get('[data-testid="examples-link"]')
      .should('have.attr', 'href')
      .and('include', 'vercel.com/templates');
  });

  it('should have correct href for Next.js homepage', () => {
    cy.get('[data-testid="nextjs-link"]')
      .should('have.attr', 'href')
      .and('include', 'nextjs.org');
  });
});
