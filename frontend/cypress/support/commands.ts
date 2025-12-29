/// <reference types="cypress" />

// Custom commands for KBase testing

// Authentication commands
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.window().its('localStorage.token').should('exist');
  });
});

Cypress.Commands.add('loginAsAdmin', () => {
  cy.login(Cypress.env('adminEmail'), Cypress.env('testPassword'));
});

Cypress.Commands.add('loginAsOwner', () => {
  cy.login(Cypress.env('ownerEmail'), Cypress.env('testPassword'));
});

Cypress.Commands.add('loginAsUser', () => {
  cy.login(Cypress.env('userEmail'), Cypress.env('testPassword'));
});

Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('token');
    win.localStorage.removeItem('user');
  });
  cy.visit('/login');
});

// API helper commands
Cypress.Commands.add('apiLogin', (email: string, password: string) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/auth/login`,
    body: { email, password },
  }).then((response) => {
    expect(response.status).to.eq(200);
    const token = response.body.data?.accessToken || response.body.result?.accessToken;
    cy.window().then((win) => {
      win.localStorage.setItem('token', token);
      win.localStorage.setItem('user', JSON.stringify(response.body.data || response.body.result));
    });
    return token;
  });
});

// UI helper commands
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add('shouldBeVisible', { prevSubject: true }, (subject) => {
  cy.wrap(subject).should('be.visible');
});

// Form helper commands
Cypress.Commands.add('fillInput', (selector: string, value: string) => {
  cy.get(selector).clear().type(value);
});

Cypress.Commands.add('selectOption', (selector: string, value: string) => {
  cy.get(selector).select(value);
});

// Wait for API response
Cypress.Commands.add('waitForApi', (alias: string) => {
  cy.wait(alias).its('response.statusCode').should('be.oneOf', [200, 201]);
});

// Check toast/alert message
Cypress.Commands.add('checkAlert', (type: 'success' | 'error', message?: string) => {
  const alertSelector = type === 'success' ? '.alert-success, [role="alert"]' : '.alert-error, [role="alert"]';
  cy.get(alertSelector).should('be.visible');
  if (message) {
    cy.get(alertSelector).should('contain', message);
  }
});

// Type definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      loginAsAdmin(): Chainable<void>;
      loginAsOwner(): Chainable<void>;
      loginAsUser(): Chainable<void>;
      logout(): Chainable<void>;
      apiLogin(email: string, password: string): Chainable<string>;
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      shouldBeVisible(): Chainable<JQuery<HTMLElement>>;
      fillInput(selector: string, value: string): Chainable<void>;
      selectOption(selector: string, value: string): Chainable<void>;
      waitForApi(alias: string): Chainable<void>;
      checkAlert(type: 'success' | 'error', message?: string): Chainable<void>;
    }
  }
}

export {};
