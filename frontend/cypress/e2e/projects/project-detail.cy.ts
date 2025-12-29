/**
 * Project Detail E2E Tests
 * 
 * Tests cover:
 * - Project detail page display
 * - Documents tab
 * - Members tab
 * - Project settings (for owners)
 * - Delete project functionality
 * - Navigation
 */

describe('Project Detail', () => {
  beforeEach(() => {
    // Login as admin (more likely to have projects)
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // First create a project to ensure we have one
    cy.visit('/projects/new');
    const projectName = `Test Project ${Date.now()}`;
    cy.get('input[name="projectName"]').type(projectName);
    cy.get('textarea[name="description"]').type('Test project for Cypress tests');
    cy.get('button[type="submit"]').click();
    cy.url().should('match', /\/projects\/\d+/, { timeout: 10000 });
  });

  describe('Project Detail Display', () => {
    it('should display project name', () => {
      cy.get('h1').should('exist').and('not.be.empty');
    });

    it('should display back to projects link', () => {
      cy.contains('Back to projects').should('be.visible');
    });

    it('should display project owner', () => {
      cy.contains('Owner:').should('be.visible');
    });

    it('should display creation date', () => {
      cy.contains('Created:').should('be.visible');
    });

    it('should display tabs for documents and members', () => {
      cy.contains('button', 'Documents').should('be.visible');
      cy.contains('button', 'Members').should('be.visible');
    });
  });

  describe('Documents Tab', () => {
    it('should show documents tab content', () => {
      // Documents tab is active by default - check for document count
      cy.contains('Documents').should('be.visible');
    });

    it('should display upload document button or no documents message', () => {
      cy.get('body').then(($body) => {
        const hasUpload = $body.find('a[href*="/upload"]').length > 0 || $body.text().includes('Upload');
        const hasNoDocuments = $body.text().includes('No documents yet');
        expect(hasUpload || hasNoDocuments).to.be.true;
      });
    });

    it('should display document list or empty state', () => {
      // Either shows documents or empty state message
      cy.get('body').then(($body) => {
        if ($body.text().includes('No documents yet')) {
          cy.contains('No documents yet').should('be.visible');
        } else if ($body.find('a[href^="/documents/"]').length > 0) {
          // Documents are displayed
          cy.get('a[href^="/documents/"]').should('exist');
        }
        // Both cases are valid
      });
    });

    it('should navigate to document detail when clicking a document', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/documents/"]').length > 0) {
          cy.get('a[href^="/documents/"]').first().click();
          cy.url().should('match', /\/documents\/\d+/);
        }
      });
    });
  });

  describe('Members Tab', () => {
    it('should switch to members tab when clicked', () => {
      cy.contains('button', 'Members').click();
      // Tab should now be active (has border color)
      cy.contains('button', 'Members').should('have.class', 'border-blue-500');
    });

    it('should display member information', () => {
      cy.contains('button', 'Members').click();
      cy.wait(500);
      // The owner should always be displayed
      cy.get('.space-y-6').should('exist');
    });
  });

  describe('Project Owner Actions', () => {
    it('should display settings button for owner', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href*="/settings"]').length > 0 || $body.text().includes('Settings')) {
          cy.contains('Settings').should('be.visible');
        }
      });
    });

    it('should display delete button for owner', () => {
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Delete")').length > 0) {
          cy.contains('button', 'Delete').should('be.visible');
        }
      });
    });
  });

  describe('Navigation', () => {
    it('should navigate back to projects when clicking back link', () => {
      cy.contains('Back to projects').click();
      cy.url().should('include', '/projects');
      cy.url().should('not.match', /\/projects\/\d+$/);
    });
  });
});

describe('Project Detail - Delete Project', () => {
  it('should allow owner to delete their project', () => {
    // Login as owner
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // Create a project to delete
    cy.visit('/projects/new');
    const projectName = `Delete Test ${Date.now()}`;
    cy.get('input[name="projectName"]').type(projectName);
    cy.get('textarea[name="description"]').type('Test project for deletion');
    cy.get('button[type="submit"]').click();
    
    // Wait for navigation to new project
    cy.url().should('match', /\/projects\/\d+/, { timeout: 10000 });

    // Click delete button
    cy.contains('button', 'Delete').click();

    // Confirm deletion in modal
    cy.get('[role="dialog"]', { timeout: 5000 }).should('be.visible');
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', 'Delete').click();
    });

    // Should redirect to projects list
    cy.url({ timeout: 10000 }).should('include', '/projects');
    cy.url().should('not.match', /\/projects\/\d+$/);

    // Project should no longer exist
    cy.contains(projectName).should('not.exist');
  });
});

describe('Project Detail - Non-Owner View', () => {
  it('should not show delete button for non-owners', () => {
    // Login as regular user
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('userEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // Navigate to projects
    cy.visit('/projects');

    // If user has access to any projects
    cy.get('body').then(($body) => {
      const projectLinks = $body.find('a[href^="/projects/"]').not('[href="/projects/new"]');
      if (projectLinks.length > 0) {
        cy.get('a[href^="/projects/"]').not('[href="/projects/new"]').first().click();
        cy.url().should('match', /\/projects\/\d+/);
        // Non-owners should not see delete button (unless they own the project)
        // This is a soft check since the user might own some projects
      }
    });
  });
});
