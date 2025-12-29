// ***********************************************************
// This support file is processed and loaded automatically before
// your test files.
// ***********************************************************

import './commands';

// Prevent TypeScript errors
declare global {
  interface Window {
    localStorage: Storage;
  }
}

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // We'll log it instead for debugging
  console.log('Uncaught exception:', err.message);
  return false;
});

// Clear localStorage before each test
beforeEach(() => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

export {};
