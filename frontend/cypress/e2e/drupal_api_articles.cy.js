describe('Drupal API & UI - Articles', () => {
  it('loads homepage UI and shows articles', () => {
    // ✅ baseUrl is used automatically
    cy.visit('/');
    cy.contains('Articles').should('be.visible');
  });

  it('returns a successful API response', () => {
    // ✅ apiUrl comes from Cypress.env
    cy.request(`${Cypress.env('apiUrl')}/jsonapi/node/article`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data.length).to.be.at.least(2);
      });
  });

  it('includes "Nesli Working" in API titles', () => {
    cy.request(`${Cypress.env('apiUrl')}/jsonapi/node/article`)
      .then((response) => {
        const titles = response.body.data.map(article => article.attributes.title);
        expect(titles).to.include('Nesli Working');
      });
  });
});
