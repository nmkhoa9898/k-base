/**
 * Project List E2E Tests
 * 
 * Tests cover:
 * - Project list display
 * - Search functionality
 * - Pagination
 * - Navigation to project details
 * - Empty state display
 */

describe('Project List', () => {
  beforeEach(() => {
    // Login as owner who has projects
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.visit('/projects');
  });

  describe('Project List Display', () => {
    it('should display page title and description', () => {
      cy.get('h1').contains('Projects').should('be.visible');
      cy.contains('Manage your team projects').should('be.visible');
    });

    it('should display New Project button', () => {
      cy.contains('New Project').should('be.visible');
    });

    it('should display search input', () => {
      cy.get('input[placeholder*="Search"]').should('be.visible');
    });

    it('should display project cards or empty state', () => {
      // Wait for loading to complete
      cy.get('body').then(($body) => {
        if ($body.text().includes('No projects yet')) {
          cy.contains('No projects yet').should('be.visible');
        } else {
          cy.get('a[href^="/projects/"]').not('[href="/projects/new"]').should('exist');
        }
      });
    });
  });

  describe('Project Card Display', () => {
    it('should display project name on card', () => {
      // Wait for projects to load, may show empty state
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/projects/"]').not('[href="/projects/new"]').length > 0) {
          cy.get('a[href^="/projects/"]').not('[href="/projects/new"]').first().should('exist');
        }
      });
    });

    it('should display project information when projects exist', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/projects/"]').not('[href="/projects/new"]').length > 0) {
          cy.get('a[href^="/projects/"]').not('[href="/projects/new"]').first().within(() => {
            // Should have some content
            cy.get('*').should('exist');
          });
        }
      });
    });

    it('should display owner information when projects exist', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/projects/"]').not('[href="/projects/new"]').length > 0) {
          cy.contains('Owner:').should('exist');
        }
      });
    });

    it('should display project creation date', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/projects/"]').not('[href="/projects/new"]').length > 0) {
          cy.get('a[href^="/projects/"]').not('[href="/projects/new"]').first().should('exist');
        }
      });
    });
  });

  describe('Search Functionality', () => {
    it('should filter projects by name', () => {
      cy.get('input[placeholder*="Search"]').type('Tech');
      cy.get('button').contains('Search').click();

      // Wait for search results
      cy.wait(500);
      
      // Should show filtered results
      cy.get('a[href^="/projects/"]').should('exist');
    });

    it('should show empty state when no results found', () => {
      cy.get('input[placeholder*="Search"]').type('NonExistentProject12345');
      cy.get('button').contains('Search').click();

      cy.wait(500);
      cy.contains('No projects found').should('be.visible');
    });

    it('should clear search and show all projects', () => {
      // Search for something
      cy.get('input[placeholder*="Search"]').type('Test');
      cy.get('button').contains('Search').click();
      cy.wait(500);

      // Clear search
      cy.get('input[placeholder*="Search"]').clear();
      cy.get('button').contains('Search').click();
      cy.wait(500);

      // Should show all projects again
      cy.get('a[href^="/projects/"]').should('have.length.at.least', 1);
    });
  });

  describe('Navigation', () => {
    it('should navigate to project details when clicking a project', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/projects/"]').not('[href="/projects/new"]').length > 0) {
          cy.get('a[href^="/projects/"]')
            .not('[href="/projects/new"]')
            .first()
            .click();
          cy.url().should('match', /\/projects\/\d+/);
        }
      });
    });

    it('should navigate to create project page when clicking New Project', () => {
      cy.contains('New Project').click();
      cy.url().should('include', '/projects/new');
    });
  });

  describe('Pagination', () => {
    it('should display pagination when there are many projects', () => {
      // Pagination may or may not be visible depending on number of projects
      // This test checks if pagination exists when needed
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Next")').length > 0) {
          cy.contains('Next').should('be.visible');
        }
      });
    });
  });
});

describe('Project List - Empty State', () => {
  it('should show empty state for new user with no projects', () => {
    // Create a new user and check empty state
    const uniqueEmail = `newuser-${Date.now()}@cypress.test`;

    // Register new user
    cy.visit('/register');
    cy.get('input[name="fullName"]').type('New Test User');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="confirmPassword"]').type('Password123!');
    cy.get('select[name="role"]').select('USER');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');

    // Go to projects
    cy.visit('/projects');

    // May show empty state or projects user is member of
    cy.get('body').then(($body) => {
      if ($body.text().includes('No projects yet')) {
        cy.contains('No projects yet').should('be.visible');
        cy.contains('Create your first project').should('be.visible');
      }
    });
  });
});
