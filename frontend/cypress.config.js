const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',   // Next.js container
    env: {
      apiUrl: 'http://localhost:8080'   // Drupal container
    },
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    video: true,
    screenshotOnRunFailure: true
  }
});
