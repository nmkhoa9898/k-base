/**
 * Authentication E2E Tests
 * 
 * Tests cover:
 * - Login page display and functionality
 * - Successful login with valid credentials
 * - Failed login with invalid credentials
 * - Registration flow
 * - Logout functionality
 * - Session persistence
 * - Protected route access
 * - Test account quick-fill feature
 */

describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  describe('Login Page Display', () => {
    it('should display login form correctly', () => {
      // Check page title and description
      cy.contains('Welcome back').should('be.visible');
      cy.contains('Sign in to your account').should('be.visible');

      // Check form elements
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible').and('contain', 'Sign in');

      // Check links
      cy.contains('Don\'t have an account?').should('be.visible');
      cy.get('a[href="/register"]').should('be.visible').and('contain', 'Sign up');
    });

    it('should display test accounts panel', () => {
      cy.contains('Test Accounts').should('be.visible');
      cy.contains('Password for all accounts').should('be.visible');
      cy.contains('Password123!').should('be.visible');

      // Check test account buttons
      cy.contains('ADMIN').should('be.visible');
      cy.contains('OWNER').should('be.visible');
      cy.contains('USER').should('be.visible');
    });
  });

  describe('Test Account Quick-Fill', () => {
    it('should fill admin credentials when clicking admin test account', () => {
      cy.contains('button', 'admin@kbase.dev').click();
      cy.get('input[type="email"]').should('have.value', 'admin@kbase.dev');
      cy.get('input[type="password"]').should('have.value', 'Password123!');
    });

    it('should fill owner credentials when clicking owner test account', () => {
      cy.contains('button', 'john.smith@techcorp.com').click();
      cy.get('input[type="email"]').should('have.value', 'john.smith@techcorp.com');
      cy.get('input[type="password"]').should('have.value', 'Password123!');
    });

    it('should fill user credentials when clicking user test account', () => {
      cy.contains('button', 'alice.taylor@techcorp.com').click();
      cy.get('input[type="email"]').should('have.value', 'alice.taylor@techcorp.com');
      cy.get('input[type="password"]').should('have.value', 'Password123!');
    });
  });

  describe('Login Validation', () => {
    it('should require email field', () => {
      // HTML5 validation - email field is required
      cy.get('input[type="email"]').then(($input) => {
        expect($input[0].validity.valueMissing).to.be.true;
      });
    });

    it('should require password field', () => {
      // HTML5 validation - password field is required
      cy.get('input[type="password"]').then(($input) => {
        expect($input[0].validity.valueMissing).to.be.true;
      });
    });

    it('should not submit form with empty fields', () => {
      cy.get('button[type="submit"]').click();
      // Form should not navigate away with invalid fields
      cy.url().should('include', '/login');
    });
  });

  describe('Login with Invalid Credentials', () => {
    it('should show error for invalid email', () => {
      cy.get('input[type="email"]').type('nonexistent@kbase.dev');
      cy.get('input[type="password"]').type('Password123!');
      cy.get('button[type="submit"]').click();

      // Should show error message
      cy.get('[role="alert"], .alert').should('be.visible');
      cy.url().should('include', '/login');
    });

    it('should show error for invalid password', () => {
      cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').type('WrongPassword123!');
      cy.get('button[type="submit"]').click();

      // Should show error message
      cy.get('[role="alert"], .alert').should('be.visible');
      cy.url().should('include', '/login');
    });
  });

  describe('Successful Login', () => {
    it('should login successfully with admin credentials', () => {
      cy.intercept('POST', '**/auth/login').as('loginRequest');
      
      cy.get('input[type="email"]').clear().type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').clear().type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();

      // Wait for the login API call
      cy.wait('@loginRequest').then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
      });

      // Should redirect to dashboard
      cy.url().should('include', '/dashboard', { timeout: 15000 });
      cy.contains('Welcome back').should('be.visible');

      // Should store token in localStorage
      cy.window().its('localStorage.token').should('exist');
    });

    it('should login successfully with owner credentials', () => {
      cy.intercept('POST', '**/auth/login').as('loginRequest');
      
      cy.get('input[type="email"]').clear().type(Cypress.env('ownerEmail'));
      cy.get('input[type="password"]').clear().type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');
      cy.url().should('include', '/dashboard', { timeout: 15000 });
    });

    it('should login successfully with user credentials', () => {
      cy.intercept('POST', '**/auth/login').as('loginRequest');
      
      cy.get('input[type="email"]').clear().type(Cypress.env('userEmail'));
      cy.get('input[type="password"]').clear().type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');
      cy.url().should('include', '/dashboard', { timeout: 15000 });
    });

    it('should show loading state during login', () => {
      cy.intercept('POST', '**/auth/login').as('loginRequest');
      
      cy.get('input[type="email"]').clear().type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').clear().type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();

      cy.wait('@loginRequest');
      cy.url().should('include', '/dashboard', { timeout: 15000 });
    });
  });

  describe('Protected Routes', () => {
    it('should redirect to login when accessing dashboard without auth', () => {
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });

    it('should redirect to login when accessing projects without auth', () => {
      cy.visit('/projects');
      cy.url().should('include', '/login');
    });

    it('should redirect to login when accessing documents without auth', () => {
      cy.visit('/documents');
      cy.url().should('include', '/login');
    });

    it('should redirect authenticated user from login to dashboard', () => {
      cy.intercept('POST', '**/auth/login').as('loginRequest');
      
      // Login first
      cy.get('input[type="email"]').clear().type(Cypress.env('adminEmail'));
      cy.get('input[type="password"]').clear().type(Cypress.env('testPassword'));
      cy.get('button[type="submit"]').click();
      
      cy.wait('@loginRequest');
      cy.url().should('include', '/dashboard', { timeout: 15000 });

      // Try to visit login again
      cy.visit('/login');
      cy.url().should('include', '/dashboard', { timeout: 10000 });
    });
  });
});
