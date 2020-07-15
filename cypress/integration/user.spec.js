const apiUri = require('../settings')
require("cypress-localstorage-commands")


describe('POST or GET /api/users/ Get all users in the system given a role type that can do so and also',  () =>  {
    before(  () => {
        cy.loginWithPerm("customer")
        cy.login()
        cy.saveLocalStorage()
        // await User.dropCollection()
    })
    beforeEach( () => {
        cy.restoreLocalStorage()
    })
    it('should Get all users when called with GET and no body', function () {
        cy.getLocalStorage('token')
            .then((token) => {
                const opts = {
                    method: 'GET',
                    url: `${apiUri}/users`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                cy.request(opts)
                    .then((response) => {
                        const body = response.body
                        expect(body).to.be.a('Array')
                    })
            })
    });

    it('should reject users request if no auth is given',  () => {
        const opts = {
            method: 'GET',
            failOnStatusCode: false,
            url: `${apiUri}/users`
        }
        cy.request(opts)
            .then((response) => {
                expect(response).property('status').to.equal(401)
                expect(response.body).property('message').to.equal('Please authenticate')
            })
    });
    it('should reject users request for users that dont have acess to users list',  () => {
        cy.getLocalStorage('tokenNonGetUser')
            .then((tokenNonGetUser) => {
                const opts = {
                    method: 'GET',
                    failOnStatusCode: false,
                    url: `${apiUri}/users`,
                    headers: {
                        Authorization: `Bearer ${tokenNonGetUser}`
                    }
                }
                cy.request(opts)
                    .then((response) => {
                        expect(response).property('status').to.equal(403)
                        expect(response.body).property('message').to.equal('Forbidden please ensure you have the required permission to access the resource')
                    })
            })
    });

    it('should Get a valid user given a valid userId',  () =>  {
        cy.getLocalStorage('token')
            .then((token) => {
                cy.getLocalStorage('userId')
                    .then((userId) => {
                        const opts = {
                            method: 'GET',
                            url: `${apiUri}/users/${userId}`,
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                        cy.request(opts)
                            .then((response) => {
                                expect(response.body).property('_id').to.equal(userId)
                            })
                    })

            })
    });
});

