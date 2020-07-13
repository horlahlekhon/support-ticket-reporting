import {apiUri} from "../settings";
import "cypress-localstorage-commands";

describe('Support request', () => {
    before(  () => {
        cy.loginWithPerm("customer")
        cy.login()
        cy.saveLocalStorage()
        // await User.dropCollection()
    })
    beforeEach( () => {
        cy.restoreLocalStorage()
    })

    it('should Create a new support request at /api/support-requests',  () =>  {
        cy.getLocalStorage('tokenNonGetUser')
            .then((token) => {
                const opts = {
                    method: 'POST',
                    url: `${apiUri}/support-requests`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: {
                        title: 'API throws Quantum entanglement error',
                        description: 'How weird!!'
                    }
                }
                cy.request(opts)
                    .then((response) => {
                        expect(response).property('status').to.equal(201)
                        expect(response.body).property('title').to.equal(opts.body.title)
                        expect(response.body).property('requestStatus').to.equal('PENDING')
                    })
            })
    });

    it('should Reject support creation from a support agent or an admin', function () {
        cy.getLocalStorage('token')
            .then((token) => {
                const opts = {
                    method: 'POST',
                    failOnStatusCode: false,
                    url: `${apiUri}/support-requests`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: {
                        title: 'Get allows data posting',
                        description: 'creepy at least'
                    }
                }
                cy.request(opts)
                    .then((response) => {
                        expect(response).property('status').to.equal(403)
                        expect(response.body).property('message').to.equal('Forbidden please ensure you have the required permission to access the resource')
                    })
            })
    });

    it('should Fetch all support requests on the system given user with right permission',  () => {
        cy.getLocalStorage('token')
            .then((token) => {
                const opts = {
                    method: 'GET',
                    url: `${apiUri}/support-requests`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                cy.request(opts)
                    .then((response) => {
                        expect(response).property('status').to.equal(200)
                        expect(response.body).to.be.a('Array')
                    })
            })
    });

    it('should Reject fetching all requests for a non permitted login',  () => {
        cy.getLocalStorage('tokenNonGetUser')
            .then((token) => {
                const opts = {
                    failOnStatusCode: false,
                    method: 'GET',
                    url: `${apiUri}/support-requests`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                cy.request(opts)
                    .then((response) => {
                        expect(response).property('status').to.equal(403)
                        expect(response.body).property('message').to.be.equal('Forbidden please ensure you have the required permission to access the resource')
                    })
            })
    });

    it('should Get a single support request at /api/support-request/:requestId',  () => {
        cy.getLocalStorage('tokenNonGetUser')
            .then((token) => {
                const opts = {
                    failOnStatusCode: false,
                    method: 'GET',
                    url: `${apiUri}/support-requests/`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                cy.request(opts)
                    .then((response) => {
                        expect(response).property('status').to.equal(403)
                        expect(response.body).property('message').to.be.equal('Forbidden please ensure you have the required permission to access the resource')
                    })
            })
    })

})