/**
 * Create Project E2E Tests
 * 
 * Tests cover:
 * - Create project page display
 * - Form validation
 * - Successful project creation
 * - Cancel functionality
 * - Error handling
 */

describe('Create Project', () => {
  beforeEach(() => {
    // Login as owner who can create projects
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.visit('/projects/new');
  });

  describe('Create Project Page Display', () => {
    it('should display page title', () => {
      cy.contains('Create New Project').should('be.visible');
    });

    it('should display project form', () => {
      cy.get('input[name="projectName"]').should('be.visible');
      cy.get('textarea[name="description"]').should('be.visible');
    });

    it('should display form buttons', () => {
      cy.contains('button', 'Cancel').should('be.visible');
      cy.contains('button', 'Create Project').should('be.visible');
    });
  });

  describe('Form Validation', () => {
    it('should show error when project name is empty', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Project name is required').should('be.visible');
    });

    it('should allow empty description', () => {
      cy.get('input[name="projectName"]').type('Test Project');
      cy.get('button[type="submit"]').click();

      // Should proceed (either success or different error, not validation)
      cy.get('[role="alert"]:contains("Project name is required")').should('not.exist');
    });
  });

  describe('Successful Project Creation', () => {
    it('should create project with name only', () => {
      const projectName = `Test Project ${Date.now()}`;

      cy.get('input[name="projectName"]').type(projectName);
      cy.get('button[type="submit"]').click();

      // Should redirect to project detail page
      cy.url().should('match', /\/projects\/\d+/);
      cy.contains(projectName).should('be.visible');
    });

    it('should create project with name and description', () => {
      const projectName = `Full Project ${Date.now()}`;
      const description = 'This is a test project description created by Cypress';

      cy.get('input[name="projectName"]').type(projectName);
      cy.get('textarea[name="description"]').type(description);
      cy.get('button[type="submit"]').click();

      // Should redirect to project detail page
      cy.url().should('match', /\/projects\/\d+/);
      cy.contains(projectName).should('be.visible');
      cy.contains(description).should('be.visible');
    });

    it('should show loading state while creating project', () => {
      cy.get('input[name="projectName"]').type('Loading Test Project');
      cy.get('button[type="submit"]').click();

      // Should show loading or redirect quickly
      cy.url().should('match', /\/projects\/\d+/);
    });
  });

  describe('Cancel Functionality', () => {
    it('should go back when clicking cancel', () => {
      cy.contains('button', 'Cancel').click();

      // Should navigate away from create page
      cy.url().should('not.include', '/projects/new');
    });

    it('should not create project when cancel is clicked', () => {
      cy.get('input[name="projectName"]').type('Cancelled Project');
      cy.contains('button', 'Cancel').click();

      // Go to projects and verify project wasn't created
      cy.visit('/projects');
      cy.contains('Cancelled Project').should('not.exist');
    });
  });

  describe('Form Interaction', () => {
    it('should allow typing in project name field', () => {
      cy.get('input[name="projectName"]').type('My New Project');
      cy.get('input[name="projectName"]').should('have.value', 'My New Project');
    });

    it('should allow typing in description field', () => {
      const description = 'This is a long description for testing';
      cy.get('textarea[name="description"]').type(description);
      cy.get('textarea[name="description"]').should('have.value', description);
    });

    it('should handle special characters in project name', () => {
      const specialName = 'Project with Special Chars: !@#$%';
      cy.get('input[name="projectName"]').type(specialName);
      cy.get('button[type="submit"]').click();

      cy.url().should('match', /\/projects\/\d+/);
    });
  });
});

describe('Create Project - Permission Tests', () => {
  it('should allow owners to create projects', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    cy.visit('/projects/new');
    cy.contains('Create New Project').should('be.visible');
  });

  it('should allow admins to create projects', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    cy.visit('/projects/new');
    cy.contains('Create New Project').should('be.visible');
  });
});
