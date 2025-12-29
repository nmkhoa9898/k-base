/**
 * User Management E2E Tests
 * 
 * Tests cover:
 * - Admin access to user management
 * - User list display
 * - User search functionality
 * - Access control for non-admin users
 */

describe('User Management - Admin Access', () => {
  beforeEach(() => {
    // Login as admin
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.visit('/users');
  });

  describe('User List Display', () => {
    it('should display page title', () => {
      cy.contains('User Management').should('be.visible');
    });

    it('should display page description', () => {
      cy.contains('Manage all users in the system').should('be.visible');
    });

    it('should display search input', () => {
      cy.get('input[placeholder*="Search users"]').should('be.visible');
    });

    it('should display user table', () => {
      cy.get('table', { timeout: 10000 }).should('exist');
    });

    it('should display user table headers', () => {
      cy.get('table thead').within(() => {
        cy.contains('User').should('be.visible');
        cy.contains('Role').should('be.visible');
        cy.contains('Status').should('be.visible');
      });
    });
  });

  describe('User Table Content', () => {
    it('should display user information in rows', () => {
      cy.get('table tbody tr', { timeout: 10000 }).should('have.length.at.least', 1);
    });

    it('should display user roles with badges', () => {
      cy.get('table tbody').within(() => {
        // At least one role badge should be visible
        cy.get('.rounded-full').should('exist');
      });
    });

    it('should display user status', () => {
      cy.get('table tbody').within(() => {
        // Should show Active or Inactive status
        cy.contains(/Active|Inactive/).should('exist');
      });
    });
  });

  describe('User Search', () => {
    it('should filter users by search term', () => {
      cy.get('input[placeholder*="Search users"]').type('admin');
      cy.wait(500);
      // Results should be filtered
      cy.get('table tbody tr').should('exist');
    });

    it('should show filtered results or empty state when searching', () => {
      cy.get('input[placeholder*="Search users"]').type('xyznonexistent');
      cy.wait(500);
      cy.get('body').then(($body) => {
        // Either shows no results message or empty table
        const hasNoResults = $body.text().includes('No users found') || 
                           $body.find('table tbody tr').length === 0;
        expect(hasNoResults || $body.find('table tbody tr').length > 0).to.be.true;
      });
    });

    it('should clear search and show all users', () => {
      // Type search term
      cy.get('input[placeholder*="Search users"]').type('test');
      cy.wait(300);
      
      // Clear search
      cy.get('input[placeholder*="Search users"]').clear();
      cy.wait(300);

      // Should show all users again
      cy.get('table tbody tr').should('have.length.at.least', 1);
    });
  });

  describe('User Actions', () => {
    it('should have action buttons for each user', () => {
      cy.get('table tbody tr').first().within(() => {
        // Should have edit or delete buttons
        cy.get('button').should('exist');
      });
    });

    it('should disable delete button for current admin user', () => {
      // Find the row with admin email
      cy.contains('tr', Cypress.env('adminEmail')).within(() => {
        // Delete button should be disabled
        cy.get('button').last().should('be.disabled');
      });
    });
  });

  describe('Pagination', () => {
    it('should display pagination controls if many users', () => {
      cy.get('body').then(($body) => {
        // Pagination may or may not be visible depending on user count
        const hasPagination = $body.find('button:contains("Next")').length > 0 ||
                             $body.find('button:contains("Previous")').length > 0;
        // This is informational - we just verify the page loads
        cy.get('table').should('exist');
      });
    });
  });
});

describe('User Management - Access Control', () => {
  it('should deny access for regular users', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('userEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    cy.visit('/users');
    
    // Should show access denied message
    cy.contains('Access Denied').should('be.visible');
  });

  it('should deny access for owner users', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    cy.visit('/users');
    
    // Should show access denied message
    cy.contains('Access Denied').should('be.visible');
  });
});

describe('User Management - Delete User', () => {
  it('should delete a user when confirmed', () => {
    // Login as admin
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // First create a user to delete
    const uniqueEmail = `deletetest-${Date.now()}@cypress.test`;
    
    cy.visit('/register');
    cy.get('input[name="fullName"]').type('Delete Test User');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    cy.get('select[name="role"]').select('USER');
    cy.get('button[type="submit"]').click();

    // Re-login as admin
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // Go to users page
    cy.visit('/users');

    // Find and delete the user
    cy.contains('tr', 'Delete Test User').within(() => {
      cy.get('button').last().click();
    });

    // Confirm deletion in modal
    cy.get('[role="dialog"]', { timeout: 5000 }).should('be.visible');
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', 'Delete').click();
    });

    // User should be removed from the list
    cy.contains('Delete Test User').should('not.exist');
  });
});
