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
const apiUri = require('../settings')
Cypress.Commands.add('login', () => {
    const mail = `olalekane.adebari${Math.random() * 10}@ojdemz.com`
    cy.request('POST', `${apiUri}/auth/register`, {
        "name": "Olalekan",
        "email": mail,
        "password": "password1",
        "role": "admin"
    }).then(() => {
        cy.request({
            method: 'POST',
            url: `${apiUri}/auth/login`, //get from cypress.env.json
            body: {
                email: mail,
                password: 'password1'
            },
        }).then(data => {
            cy.setLocalStorage("token", data.body.tokens.access.token);
        });
    })

});


Cypress.Commands.add('loginWithPerm', (role) => {
    const mail = `olalekane.adebar${Math.random() * 80}@ojdemz.com`
    cy.request('POST', `${apiUri}/auth/register`, {
        "name": "Olalekan",
        "email": mail,
        "password": "password1",
        "role": role
    }).then(() => {
        cy.request({
            method: 'POST',
            url: `${apiUri}/auth/login`,
            body: {
                email: mail,
                password: 'password1'
            },
        }).then(data => {
            cy.setLocalStorage("tokenNonGetUser", data.body.tokens.access.token);
            cy.setLocalStorage('userId', data.body.user._id)
        });
    })

});

Cypress.Commands.add('loginSupportAgent', () => {
    const mail = `olalekane.adebari${Math.random() * 10}@ojdemz.com`
    cy.request('POST', `${apiUri}/auth/register`, {
        "name": "Olalekan",
        "email": mail,
        "password": "password1",
        "role": "support-agent"
    }).then(() => {
        cy.request({
            method: 'POST',
            url: `${apiUri}/auth/login`, //get from cypress.env.json
            body: {
                email: mail,
                password: 'password1'
            },
        }).then(data => {
            cy.setLocalStorage("tokenSupportAgent", data.body.tokens.access.token);
        });
    })

});
