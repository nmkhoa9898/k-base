/**
 * Dashboard E2E Tests
 * 
 * Tests cover:
 * - Dashboard display and layout
 * - Stats cards display
 * - Projects section
 * - Recent documents section
 * - Navigation from dashboard
 * - Different user role views
 */

describe('Dashboard', () => {
  describe('Dashboard as Admin', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });

    it('should display welcome message with user name', () => {
      cy.contains('Welcome back').should('be.visible');
    });

    it('should display stats cards', () => {
      // Check for stats cards
      cy.contains('Total Projects').should('be.visible');
      cy.contains('Documents').should('be.visible');
      cy.contains('Team Members').should('be.visible');
      cy.contains('Activity').should('be.visible');
    });

    it('should display projects section', () => {
      cy.contains('Your Projects').should('be.visible');
      cy.get('a[href="/projects/new"]').should('be.visible');
    });

    it('should display recent documents section', () => {
      cy.contains('Recent Documents').should('be.visible');
      cy.get('a[href="/documents"]').should('be.visible');
    });

    it('should navigate to create new project from dashboard', () => {
      cy.contains('New Project').click();
      cy.url().should('include', '/projects/new');
    });

    it('should navigate to all projects from dashboard', () => {
      cy.contains('View all projects').click();
      cy.url().should('include', '/projects');
    });

    it('should navigate to all documents from dashboard', () => {
      cy.get('a[href="/documents"]').contains('View all').click();
      cy.url().should('include', '/documents');
    });
  });

  describe('Dashboard as Owner', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });

    it('should display owner-specific dashboard', () => {
      cy.contains('Welcome back').should('be.visible');
      cy.contains('Your Projects').should('be.visible');
    });

    it('should show projects owned by the user', () => {
      // Check that projects section exists
      cy.contains('Your Projects').should('be.visible');
    });
  });

  describe('Dashboard as Regular User', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('userEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });

    it('should display user-specific dashboard', () => {
      cy.contains('Welcome back').should('be.visible');
    });

    it('should show projects the user is a member of', () => {
      cy.contains('Your Projects').should('be.visible');
    });
  });

  describe('Dashboard Navigation', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });

    it('should have working sidebar/navigation links', () => {
      // Check navigation exists
      cy.get('nav, aside').should('exist');
    });

    it('should navigate to projects page', () => {
      cy.get('a[href="/projects"]').first().click();
      cy.url().should('include', '/projects');
    });

    it('should navigate to documents page', () => {
      cy.get('a[href="/documents"]').first().click();
      cy.url().should('include', '/documents');
    });

    it('should navigate back to dashboard', () => {
      cy.visit('/projects');
      cy.get('a[href="/dashboard"]').first().click();
      cy.url().should('include', '/dashboard');
    });
  });

  describe('Dashboard Loading States', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
    });

    it('should eventually load dashboard content', () => {
      cy.url().should('include', '/dashboard');
      // Content should load (not show loading forever)
      cy.contains('Welcome back', { timeout: 10000 }).should('be.visible');
    });
  });

  describe('Dashboard Responsiveness', () => {
    beforeEach(() => {
      cy.visit('/login');
      cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/dashboard');
    });

    it('should display correctly on mobile viewport', () => {
      cy.viewport(375, 667);
      cy.contains('Welcome back').should('be.visible');
      cy.contains('Total Projects').should('be.visible');
    });

    it('should display correctly on tablet viewport', () => {
      cy.viewport(768, 1024);
      cy.contains('Welcome back').should('be.visible');
      cy.contains('Total Projects').should('be.visible');
    });

    it('should display correctly on desktop viewport', () => {
      cy.viewport(1280, 720);
      cy.contains('Welcome back').should('be.visible');
      cy.contains('Total Projects').should('be.visible');
    });
  });
});
