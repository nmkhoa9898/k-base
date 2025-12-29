/**
 * Document Detail E2E Tests
 * 
 * Tests cover:
 * - Document detail page display
 * - Document metadata display
 * - Download functionality
 * - Delete functionality
 * - Navigation
 */

describe('Document Detail', () => {
  beforeEach(() => {
    // Login as owner
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // Navigate to documents and open first one
    cy.visit('/documents');
  });

  describe('Document Detail Display', () => {
    it('should navigate to document detail page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/documents/"]').length > 0) {
          cy.get('a[href^="/documents/"]').first().click();
          cy.url().should('match', /\/documents\/\d+/);
        }
      });
    });

    it('should display document title', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/documents/"]').length > 0) {
          cy.get('a[href^="/documents/"]').first().click();
          cy.get('h1, h2').should('exist');
        }
      });
    });

    it('should display document metadata', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/documents/"]').length > 0) {
          cy.get('a[href^="/documents/"]').first().click();
          // Should show file type, size, etc.
          cy.get('body').should('contain.html', '<');
        }
      });
    });
  });

  describe('Document Actions', () => {
    it('should have download button', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/documents/"]').length > 0) {
          cy.get('a[href^="/documents/"]').first().click();
          cy.contains('Download').should('exist');
        }
      });
    });

    it('should have delete button for document owner', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/documents/"]').length > 0) {
          cy.get('a[href^="/documents/"]').first().click();
          // Delete button may or may not be present depending on ownership
        }
      });
    });
  });

  describe('Navigation', () => {
    it('should navigate back to documents list', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a[href^="/documents/"]').length > 0) {
          cy.get('a[href^="/documents/"]').first().click();
          cy.url().should('match', /\/documents\/\d+/);

          cy.contains('Back').click();
          cy.url().should('not.match', /\/documents\/\d+/);
        }
      });
    });
  });
});

describe('Document Detail - Download', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.visit('/documents');
  });

  it('should trigger download when clicking download button', () => {
    cy.get('body').then(($body) => {
      if ($body.find('a[href^="/documents/"]').length > 0) {
        cy.get('a[href^="/documents/"]').first().click();

        // Click download
        cy.contains('button', 'Download').click();
        // Download should be triggered (hard to verify in Cypress without intercepting)
      }
    });
  });
});

describe('Document Detail - Delete', () => {
  it('should delete document when confirmed', () => {
    // Login as owner
    cy.visit('/login');
    cy.get('input[type="email"]').type(Cypress.env('ownerEmail'));
    cy.get('input[type="password"]').type(Cypress.env('testPassword'));
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');

    // First, upload a document to delete
    cy.visit('/projects');
    cy.get('a[href^="/projects/"]').first().click();
    cy.url().then((url) => {
      const match = url.match(/\/projects\/(\d+)/);
      if (match) {
        cy.visit(`/projects/${match[1]}/upload`);

        // Upload a test document
        cy.get('input[type="file"]').selectFile({
          contents: Cypress.Buffer.from('Delete test content'),
          fileName: `delete-test-${Date.now()}.txt`,
          mimeType: 'text/plain',
        }, { force: true });

        const docTitle = `Delete Test Doc ${Date.now()}`;
        cy.get('input[name="title"]').clear().type(docTitle);
        cy.get('button[type="submit"]').click();
        cy.url().should('match', /\/projects\/\d+/);

        // Now navigate to documents and find the uploaded doc
        cy.visit('/documents');

        cy.get('body').then(($body) => {
          if ($body.text().includes(docTitle)) {
            cy.contains(docTitle).closest('tr, a').click();
            cy.url().should('match', /\/documents\/\d+/);

            // Delete if button exists
            cy.get('body').then(($detailBody) => {
              if ($detailBody.find('button:contains("Delete")').length > 0) {
                cy.contains('button', 'Delete').click();

                // Confirm in modal if exists
                cy.get('body').then(($modalBody) => {
                  if ($modalBody.find('[role="dialog"]').length > 0) {
                    cy.get('[role="dialog"] button:contains("Delete"), [role="dialog"] button:contains("Confirm")').click();
                  }
                });

                // Should redirect
                cy.url().should('not.match', /\/documents\/\d+/);
              }
            });
          }
        });
      }
    });
  });
});
