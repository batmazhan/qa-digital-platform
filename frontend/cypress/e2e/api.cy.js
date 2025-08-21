describe('Drupal JSON:API - Article Endpoint', () => {
  it('returns a successful response', () => {
    cy.request('http://localhost:8080/jsonapi/node/article').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.length).to.be.at.least(2);
    });
  });

  it('includes specific article titles', () => {
    cy.request('http://localhost:8080/jsonapi/node/article').then((response) => {
      const titles = response.body.data.map((article) => article.attributes.title);
      expect(titles).to.include('My Test Article');
      expect(titles).to.include('Nesli Working'); // ✅ fixed
    });
  });

  it('validates article JSON structure', () => {
    cy.request('http://localhost:8080/jsonapi/node/article').then((response) => {
      const article = response.body.data[0];
      expect(article).to.have.property('id');
      expect(article.attributes).to.have.property('title');
      expect(article.attributes).to.have.property('body');
    });
  });
});
