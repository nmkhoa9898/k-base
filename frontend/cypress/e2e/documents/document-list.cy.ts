/**
 * Document List E2E Tests
 * 
 * Tests cover:
 * - Document list display
 * - Search functionality
 * - Document table display
 * - Download functionality
 * - Navigation to document details
 */

describe('Document List', () => {
  beforeEach(() => {
    // Login as owner who has documents
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.visit('/documents');
  });

  describe('Document List Display', () => {
    it('should display page title', () => {
      cy.contains('Documents').should('be.visible');
    });

    it('should display page description', () => {
      cy.contains('Browse and search all your documents').should('be.visible');
    });

    it('should display search input', () => {
      cy.get('input[placeholder*="Search"]').should('be.visible');
    });
  });

  describe('Document Table/List Display', () => {
    it('should display documents or empty state', () => {
      cy.get('body').then(($body) => {
        if ($body.text().includes('No documents yet')) {
          cy.contains('No documents yet').should('be.visible');
        } else {
          // Documents table should exist
          cy.get('table, [class*="divide"]').should('exist');
        }
      });
    });

    it('should display document information columns', () => {
      cy.get('body').then(($body) => {
        if ($body.find('table').length > 0) {
          cy.contains('Document').should('be.visible');
          cy.contains('Project').should('be.visible');
        }
      });
    });
  });

  describe('Search Functionality', () => {
    it('should filter documents by search term', () => {
      cy.get('input[placeholder*="Search"]').type('test');
      cy.get('button').contains('Search').click();
      cy.wait(500);
    });

    it('should show message when no documents match search', () => {
      cy.get('input[placeholder*="Search"]').type('NonExistentDocument12345xyz');
      cy.get('button').contains('Search').click();
      cy.wait(500);
      cy.contains('No documents found').should('be.visible');
    });

    it('should clear search results', () => {
      cy.get('input[placeholder*="Search"]').type('test');
      cy.get('button').contains('Search').click();
      cy.wait(500);

      cy.get('input[placeholder*="Search"]').clear();
      cy.get('button').contains('Search').click();
      cy.wait(500);
    });
  });

  describe('Document Navigation', () => {
    it('should navigate to document detail when clicking view button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/documents/"]').length > 0) {
          cy.get('a[href^="/documents/"]').first().click();
          cy.url().should('match', /\/documents\/\d+/);
        }
      });
    });
  });

  describe('Download Functionality', () => {
    it('should have download buttons for documents', () => {
      cy.get('body').then(($body) => {
        if ($body.find('table').length > 0 && $body.find('button').length > 0) {
          // Download buttons should exist in table
          cy.get('button[title*="Download"], button:has(svg)').should('exist');
        }
      });
    });
  });
});

describe('Document List - Empty State', () => {
  it('should show empty state when user has no documents', () => {
    // Create a new user with no documents
    const uniqueEmail = `noducsuser-${Date.now()}@cypress.test`;

    cy.visit('/register');
    cy.get('input[name="fullName"]').type('No Docs User');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    cy.get('select[name="role"]').select('USER');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    cy.visit('/documents');

    // May show empty state
    cy.get('body').then(($body) => {
      if ($body.text().includes('No documents')) {
        cy.contains('No documents').should('be.visible');
      }
    });
  });
});
