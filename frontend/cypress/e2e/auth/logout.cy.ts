/**
 * Logout E2E Tests
 * 
 * Tests cover:
 * - Logout functionality
 * - Session cleanup after logout
 * - Redirect behavior after logout
 */

describe('Logout', () => {
  beforeEach(() => {
    // Login before each test
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  describe('Logout Functionality', () => {
    it('should logout successfully from sidebar/header', () => {
      // Find and click logout button (adjust selector based on actual UI)
      cy.get('button, a').contains(/logout|sign out/i).click();

      // Should redirect to login
      cy.url().should('include', '/login');

      // Token should be removed
      cy.window().its('localStorage.token').should('be.undefined');
    });

    it('should not be able to access protected routes after logout', () => {
      // Logout
      cy.get('button, a').contains(/logout|sign out/i).click();
      cy.url().should('include', '/login');

      // Try to access protected route
      cy.visit('/dashboard');
      cy.url().should('include', '/login');

      cy.visit('/projects');
      cy.url().should('include', '/login');
    });

    it('should clear user data from localStorage on logout', () => {
      // Verify data exists before logout
      cy.window().its('localStorage.token').should('exist');

      // Logout
      cy.get('button, a').contains(/logout|sign out/i).click();

      // Verify data is cleared
      cy.window().its('localStorage.token').should('be.undefined');
      cy.window().its('localStorage.user').should('be.undefined');
    });
  });

  describe('Session Persistence', () => {
    it('should maintain session across page reloads', () => {
      // Verify we're logged in
      cy.url().should('include', '/dashboard');

      // Reload page
      cy.reload();

      // Should still be on dashboard
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome back').should('be.visible');
    });

    it('should maintain session across navigation', () => {
      // Navigate to different pages
      cy.visit('/projects');
      cy.url().should('include', '/projects');

      cy.visit('/documents');
      cy.url().should('include', '/documents');

      // Go back to dashboard
      cy.visit('/dashboard');
      cy.url().should('include', '/dashboard');
    });
  });
});
