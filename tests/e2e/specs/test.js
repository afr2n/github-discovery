// https://docs.cypress.io/api/table-of-contents

const DEFAULT_WAIT_TIME = 2000;

describe("Coding challenege landing page", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.wait(DEFAULT_WAIT_TIME*2);
    cy.contains(".btn-one span", "VIEW");
  });
});


describe("Login Validation", () => {
  it("Error on Wrong login credetials", () => {
    cy.wait(DEFAULT_WAIT_TIME);
    cy.visit("/login");
    cy.contains("h2", "Sign In");
    cy.get('#email').find("input").type(`tab@gmail.com`);
    cy.get('#password').find("input").type("123Abc123");
    cy.get('button').click();
    cy.wait(500);
    cy.get('.v-toast--top', { force: true }).scrollIntoView().should('have.length', 1);
    cy.get('.v-toast').invoke('text').should('include', 'Email or password incorrect');
    cy.url().should('include', '/login');
  });
});


describe("Sign Up Page", () => {
  it("Visits the Sign up url", () => {
    const uniqueId = new Date().valueOf();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.visit("/signup");
    cy.contains("h2", "Sign Up");
    cy.get('#email').find("input").type(`tab${uniqueId}@gmail.com`);
    cy.get('#password').find("input").type("123Abc123");
    cy.get('#repeatPassword').find("input").type("123Abc123");
    cy.get('button').click();
    cy.wait(DEFAULT_WAIT_TIME*3);
    cy.url().should('include', '/discovery');
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#logout').click();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.url().should('include', '/login');
  });
});

describe("Logged In View", () => {
  it("Visits the Login url", () => {
    cy.wait(DEFAULT_WAIT_TIME);
    cy.visit("/login");
    cy.contains("h2", "Sign In");
    cy.get('#email').find("input").type(`tab@gmail.com`);
    cy.get('#password').find("input").type("123Kdd123");
    cy.get('button').click();
    cy.wait(DEFAULT_WAIT_TIME*2);
    cy.url().should('include', '/discovery');
    cy.get('#userAccname').should('have.text', 'tab');
    cy.wait(DEFAULT_WAIT_TIME);
  });

  it("Visits the discovery url", () => {
    cy.get('#discovery').click();
    cy.url().should('include', '/discovery');
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#discovery').find('.active-primary-button').should('exist');
    cy.contains("h3", "My Bookmarks");
    cy.contains("h3", "Topics");
    cy.get('#vue').click();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#vue').find('.active-secondary-button').should('exist');
    cy.get('#javascript').click();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#javascript').find('.active-secondary-button').should('exist');
    cy.get('#node').find('.active-secodary-button').should('not.exist');
    cy.get('.items-list').should('have.length', 3);
  });
  
  it("Adds Item to bookmark", () => {
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#list-for-vue').find('.card-list-container .cusBtn').eq(0).click();
    cy.get('#list-for-vue').find('.card-list-container .cusBtn').eq(3).click();
    cy.get('#list-for-vue').find('.card-list-container .cusBtn').eq(7).click();
    cy.get('#list-for-javascript').find('.card-list-container .cusBtn').eq(1).click();
    cy.get('#list-for-javascript').find('.card-list-container .cusBtn').eq(3).click();
    cy.get('#list-for-javascript').find('.card-list-container .cusBtn').eq(6).click();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#list-for-bookmarks').find('.card').should('have.length', 6);
  });
  it("Remove Item from bookmark", () => {
    cy.get('#list-for-bookmarks').find('.card-list-container .cusBtn').eq(0).click();
    cy.get('#list-for-bookmarks').find('.card-list-container .cusBtn').eq(1).click();
    cy.get('#list-for-bookmarks').find('.card-list-container .cusBtn').eq(2).click();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#list-for-bookmarks').find('.card').should('have.length', 3);
  });

  it("Visits the Account url", () => {
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#userAccname').click();
    cy.url().should('include', '/account');
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#userAccname').find('.active-primary-button').should('exist');
    cy.contains("h3", "My Account");
    cy.get('#username input').should('be.visible').clear();
    cy.get('#username').find("input").type("tabzz");
    cy.get('#email input').should('be.visible').clear();
    cy.get('#email').find("input").type(`tabzz@gmail.com`);
    cy.get('#saveUserData').click();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#userAccname').should('have.text', 'tabzz');
    cy.wait(DEFAULT_WAIT_TIME);
    cy.get('#logout').click();
    cy.wait(DEFAULT_WAIT_TIME);
    cy.url().should('include', '/login');
  });
});

