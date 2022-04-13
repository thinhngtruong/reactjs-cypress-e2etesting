// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const LOCAL_STORAGE_APP_USER_KEY = "loggedBlogappUser";
const BASE_API_URL = "http://localhost:8080";
const BASE_FE_URL = "http://localhost:3000";

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", BASE_API_URL + "/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem(LOCAL_STORAGE_APP_USER_KEY, JSON.stringify(body));
    cy.visit(BASE_FE_URL);
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  cy.request({
    url: BASE_API_URL + "/api/blogs",
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP_USER_KEY)).token
      }`,
    },
  });

  cy.visit(BASE_FE_URL);
});
