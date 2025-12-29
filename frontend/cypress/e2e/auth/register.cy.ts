/**
 * Registration E2E Tests
 * 
 * Tests cover:
 * - Registration page display
 * - Form validation
 * - Successful registration
 * - Error handling for duplicate email
 * - Password confirmation validation
 * - Role selection
 */

describe('Registration', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  describe('Registration Page Display', () => {
    it('should display registration form correctly', () => {
      // Check page title and description
      cy.contains('Create an account').should('be.visible');
      cy.contains('Start managing your team\'s knowledge').should('be.visible');

      // Check form elements
      cy.get('input[name="fullName"]').should('be.visible');
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('input[name="confirmPassword"]').should('be.visible');
      cy.get('select[name="role"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible').and('contain', 'Create account');

      // Check link to login
      cy.contains('Already have an account?').should('be.visible');
      cy.get('a[href="/login"]').should('be.visible').and('contain', 'Sign in');
    });

    it('should have role options', () => {
      cy.get('select[name="role"]').should('contain', 'User');
      cy.get('select[name="role"]').should('contain', 'Owner');
    });
  });

  describe('Registration Form Validation', () => {
    it('should require full name field', () => {
      cy.get('input[name="fullName"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false;
      });
    });

    it('should require email field', () => {
      cy.get('input[name="email"]').then(($input) => {
        expect($input[0].checkValidity()).to.be.false;
      });
    });

    it('should show error when full name is missing', () => {
      cy.get('input[name="email"]').type('newuser@test.com');
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[name="confirmPassword"]').type('Password123!');
      cy.get('button[type="submit"]').click();
      // HTML5 validation will prevent submission and show browser validation
      cy.url().should('include', '/register'); // Still on register page
    });

    it('should show error for invalid email format', () => {
      cy.get('input[name="fullName"]').type('Test User');
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[name="confirmPassword"]').type('Password123!');
      cy.get('button[type="submit"]').click();
      cy.contains('valid email').should('be.visible');
    });

    it('should show error for password too short', () => {
      cy.get('input[name="fullName"]').type('Test User');
      cy.get('input[name="email"]').type('newuser@test.com');
      cy.get('input[name="password"]').type('short');
      cy.get('input[name="confirmPassword"]').type('short');
      cy.get('button[type="submit"]').click();
      cy.contains('at least 6 characters').should('be.visible');
    });

    it('should show error when passwords do not match', () => {
      cy.get('input[name="fullName"]').type('Test User');
      cy.get('input[name="email"]').type('newuser@test.com');
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[name="confirmPassword"]').type('DifferentPassword123!');
      cy.get('button[type="submit"]').click();
      cy.contains('Passwords do not match').should('be.visible');
    });
  });

  describe('Registration with Existing Email', () => {
    it('should show error when registering with existing email', () => {
      cy.get('input[name="fullName"]').type('Test User');
      cy.get('input[name="email"]').type(Cypress.env('adminEmail')); // Existing user
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[name="confirmPassword"]').type('Password123!');
      cy.get('button[type="submit"]').click();

      // Should show error about existing email
      cy.get('[role="alert"], .alert').should('be.visible');
      cy.url().should('include', '/register');
    });
  });

  describe('Successful Registration', () => {
    it('should register successfully with valid data as USER', () => {
      const uniqueEmail = `testuser-${Date.now()}@cypress.test`;

      cy.get('input[name="fullName"]').type('Cypress Test User');
      cy.get('input[name="email"]').type(uniqueEmail);
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[name="confirmPassword"]').type('Password123!');
      cy.get('select[name="role"]').select('USER');
      cy.get('button[type="submit"]').click();

      // Should redirect to dashboard on successful registration
      cy.url().should('include', '/dashboard');
    });

    it('should register successfully with valid data as OWNER', () => {
      const uniqueEmail = `testowner-${Date.now()}@cypress.test`;

      cy.get('input[name="fullName"]').type('Cypress Test Owner');
      cy.get('input[name="email"]').type(uniqueEmail);
      cy.get('input[name="password"]').type('Password123!');
      cy.get('input[name="confirmPassword"]').type('Password123!');
      cy.get('select[name="role"]').select('OWNER');
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/dashboard');
    });
  });

  describe('Navigation', () => {
    it('should navigate to login page when clicking sign in link', () => {
      cy.get('a[href="/login"]').click();
      cy.url().should('include', '/login');
      cy.contains('Welcome back').should('be.visible');
    });
  });
});
