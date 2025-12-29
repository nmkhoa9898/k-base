/**
 * API Error Handling E2E Tests
 * 
 * Tests cover:
 * - Network error handling
 * - API error messages
 * - 401 unauthorized handling
 * - 403 forbidden handling
 * - 404 not found handling
 * - 500 server error handling
 */

describe('API Error Handling', () => {
  describe('Network Errors', () => {
    it('should handle network failure gracefully', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type('test@test.com');
      cy.get('input[type="password"]').type('password');

      // Intercept and fail the request
      cy.intercept('POST', '**/auth/login', { forceNetworkError: true }).as('loginFail');

      cy.get('button[type="submit"]').click();

      // Should show error message
      cy.get('[role="alert"], .alert').should('be.visible');
    });
  });

  describe('401 Unauthorized', () => {
    it('should redirect to login on 401 response', () => {
      // Login first
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');

      // Intercept and return 401
      cy.intercept('GET', '**/projects/**', {
        statusCode: 401,
        body: { message: 'Unauthorized' },
      }).as('unauthorized');

      cy.visit('/projects');

      // Should redirect to login
      cy.wait(2000);
      cy.url().should('include', '/login');
    });
  });

  describe('403 Forbidden', () => {
    it('should show error for forbidden access', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('userEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');

      // Try to access admin page
      cy.visit('/users');

      // Should show access denied
      cy.contains('Access Denied').should('be.visible');
    });
  });

  describe('404 Not Found', () => {
    it('should handle non-existent project gracefully', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');

      // Try to access non-existent project
      cy.visit('/projects/999999');

      // Should show not found message
      cy.contains(/not found|Project not found/i).should('be.visible');
    });

    it('should handle non-existent document gracefully', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');

      cy.visit('/documents/999999');

      cy.contains(/not found|Document not found/i).should('be.visible');
    });
  });

  describe('Server Errors', () => {
    it('should show error message on 500 response', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');

      // Intercept and return 500
      cy.intercept('GET', '**/projects/my**', {
        statusCode: 500,
        body: { message: 'Internal Server Error' },
      }).as('serverError');

      cy.visit('/projects');

      // Should show error message
      cy.get('[role="alert"], .alert').should('be.visible');
    });
  });

  describe('Validation Errors', () => {
    it('should show validation error from server', () => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');

      // Intercept project creation and return validation error
      cy.intercept('POST', '**/projects', {
        statusCode: 400,
        body: { 
          status: 400,
          message: 'Project name is required' 
        },
      }).as('validationError');

      cy.visit('/projects/new');
      cy.get('input[name="projectName"]').type('Test');
      cy.get('button[type="submit"]').click();

      cy.wait('@validationError');
      cy.get('[role="alert"], .alert').should('be.visible');
    });
  });
});

describe('Error Recovery', () => {
  it('should allow retry after error', () => {
    cy.visit('/login');

    // First attempt fails
    cy.intercept('POST', '**/auth/login', {
      statusCode: 500,
      body: { message: 'Server error' },
    }).as('firstAttempt');

    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();

    cy.wait('@firstAttempt');
    cy.get('[role="alert"], .alert').should('be.visible');

    // Second attempt succeeds (remove intercept)
    cy.intercept('POST', '**/auth/login').as('secondAttempt');

    // Close error alert if possible
    cy.get('body').then(($body) => {
      if ($body.find('[role="alert"] button').length > 0) {
        cy.get('[role="alert"] button').click();
      }
    });

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
  });
});
