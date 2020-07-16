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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import {apiUri} from '../settings'
const users = [
  {
    name: "Olalekan",
    password: "password1",
    email:"Olalekan.adebariTest@gmail.com",
    role: "admin"
  },
  {
    name: "Lekan",
    password: "password1",
    email:"horlahlekhonTest@gmail.com",
    role: "customer"
  },
  {
    name: "Oluwaseun",
    password: "password1",
    email:"adebari.olalekan.oluwaseunTest@gmail.com",
    role: "support-agent"
  }
]
Cypress.Commands.add('seedUsers', () => {
  users.forEach(e =>
    cy.request({
      method: 'POST',
      url: `${apiUri}/auth/register`,
      failOnStatusCode: false,
      body: e
    })
  )
})
Cypress.Commands.add('login', () => {
      const user = users.find(e => e.role === "admin")
        cy.request({
            method: 'POST',
            url: `${apiUri}/auth/login`, //get from cypress.env.json
            body: {
                email: user.email,
                password: user.password
            },
        }).then(data => {
            cy.setLocalStorage("token", data.body.tokens.access.token);
        });

});
Cypress.Commands.add('loginWithPerm', (role) => {
  const user = users.find(e => e.role === role)
        cy.request({
            method: 'POST',
            url: `${apiUri}/auth/login`,
            body: {
              email: user.email,
              password: user.password
            },
        }).then(data => {
            cy.log(`datatatata: ${data}`)
            cy.setLocalStorage("tokenNonGetUser", data.body.tokens.access.token);
            cy.setLocalStorage('userId', data.body.user._id)
        });

});

Cypress.Commands.add('loginSupportAgent', () => {
  const user = users.find(e => e.role === "support-agent")
  cy.request({
            method: 'POST',
            url: `${apiUri}/auth/login`,
            body: {
              email: user.email,
              password: user.password
            },
        }).then(data => {
            cy.setLocalStorage("tokenSupportAgent", data.body.tokens.access.token);
        });
});
