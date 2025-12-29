/**
 * Navigation E2E Tests
 * 
 * Tests cover:
 * - Sidebar/header navigation
 * - Active link highlighting
 * - Mobile navigation
 * - 404 page handling
 */

describe('Navigation', () => {
  beforeEach(() => {
    // Login as admin to have full access
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  describe('Sidebar Navigation', () => {
    it('should have dashboard link', () => {
      cy.get('a[href="/dashboard"]').should('exist');
    });

    it('should have projects link', () => {
      cy.get('a[href="/projects"]').should('exist');
    });

    it('should have documents link', () => {
      cy.get('a[href="/documents"]').should('exist');
    });

    it('should navigate to dashboard when clicking dashboard link', () => {
      cy.visit('/projects'); // Go somewhere else first
      cy.get('a[href="/dashboard"]:visible').first().click();
      cy.url().should('include', '/dashboard');
    });

    it('should navigate to projects when clicking projects link', () => {
      cy.get('a[href="/projects"]:visible').first().click();
      cy.url().should('include', '/projects');
    });

    it('should navigate to documents when clicking documents link', () => {
      cy.get('a[href="/documents"]:visible').first().click();
      cy.url().should('include', '/documents');
    });
  });

  describe('Admin Navigation', () => {
    it('should show users link for admin', () => {
      cy.get('a[href="/users"]').should('exist');
    });

    it('should navigate to users page when clicking users link', () => {
      cy.get('a[href="/users"]:visible').first().click();
      cy.url().should('include', '/users');
    });
  });

  describe('User Menu', () => {
    it('should have settings link', () => {
      cy.get('a[href="/settings"]').should('exist');
    });

    it('should have logout button', () => {
      cy.get('button').contains(/logout|sign out/i).should('exist');
    });

    it('should navigate to settings when clicking settings link', () => {
      cy.get('a[href="/settings"]:visible').first().click();
      cy.url().should('include', '/settings');
    });
  });

  describe('404 Page', () => {
    it('should display 404 page for unknown routes', () => {
      cy.visit('/some-unknown-route-12345');
      cy.get('body').then(($body) => {
        const has404 = $body.text().includes('404') || $body.text().includes('Not Found');
        expect(has404).to.be.true;
      });
    });

    it('should have link to go back home from 404', () => {
      cy.visit('/nonexistent-page');
      cy.get('a[href="/"], a[href="/dashboard"]').should('exist');
    });
  });

  describe('Deep Linking', () => {
    it('should load projects page directly', () => {
      cy.visit('/projects');
      cy.url().should('include', '/projects');
    });

    it('should load documents page directly', () => {
      cy.visit('/documents');
      cy.url().should('include', '/documents');
    });
  });

  describe('Back Navigation', () => {
    it('should support browser back button', () => {
      cy.visit('/dashboard');
      cy.visit('/projects');
      cy.visit('/documents');

      cy.go('back');
      cy.url().should('include', '/projects');

      cy.go('back');
      cy.url().should('include', '/dashboard');
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    });

    it('should display navigation on mobile', () => {
      cy.get('nav, aside, header').should('exist');
    });

    it('should allow navigation on mobile', () => {
      cy.visit('/projects');
      cy.url().should('include', '/projects');
    });
  });
});

describe('Navigation - Non-Admin User', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('userEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should not show users link for regular users in main nav', () => {
    // Users link should not be visible in the sidebar
    cy.get('aside, nav').first().within(() => {
      cy.get('a[href="/users"]').should('not.exist');
    });
  });

  it('should have dashboard, projects, and documents links', () => {
    cy.get('a[href="/dashboard"]').should('exist');
    cy.get('a[href="/projects"]').should('exist');
    cy.get('a[href="/documents"]').should('exist');
  });
});
