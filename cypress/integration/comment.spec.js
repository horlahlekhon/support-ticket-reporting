const apiUri = require('../settings')
require("cypress-localstorage-commands")


describe('Comments on a Support request', () => {
    before(() => {
        // cy.loginWithPerm("customer")
        // cy.loginSupportAgent()
        // cy.saveLocalStorage()
        // await User.dropCollection()

    })
    beforeEach(() => {
        cy.loginWithPerm("customer")
        cy.loginSupportAgent()
        cy.saveLocalStorage()
        cy.getLocalStorage('tokenNonGetUser')
            .then((token) => {
                const opts = {
                    method: 'POST',
                    url: `${apiUri}/support-requests`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: {
                        title: `API throws Quantum entanglement error : #${Math.round(Math.random() * 100000)}`,
                        description: 'How weird!!'
                    }
                }
                cy.request(opts)
                    .then((response) => {
                        cy.setLocalStorage('supportRequest', response.body._id)
                        cy.saveLocalStorage()
                    })
            })
        cy.restoreLocalStorage()
    })
    afterEach(() => {
        cy.clearLocalStorage()
    })

    it('should Create a new comment given a support agent is the first person commenting',  () => {
        cy.getLocalStorage('tokenSupportAgent')
            .then((token) => {
                cy.getLocalStorage('supportRequest')
                    .then((supportRequest) => {
                        const opts = {
                            method: 'POST',
                            url: `${apiUri}/support-requests/${supportRequest}/comments`,
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            body: {
                                comment: 'Ok, fanboy... are you just coming out from a Wormhole ? *smirk*',
                            }
                        }
                        cy.request(opts)
                            .then((response) => {
                                expect(response).property('status').to.equal(201)
                                expect(response.body).property('supportRequest').to.equal(supportRequest)
                                expect(response.body).property('fromCustomer').to.equal(false)
                            })
                    })
            })
    });

    it('should Not allow the customer to comment first on a support request',  () =>  {
        cy.getLocalStorage('tokenNonGetUser')
            .then((token) => {
                cy.getLocalStorage('supportRequest')
                    .then((supportRequest) => {
                        const opts = {
                            failOnStatusCode: false,
                            method: 'POST',
                            url: `${apiUri}/support-requests/${supportRequest}/comments`,
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            body: {
                                comment: 'To make the issue clearer.... isnt it the fact that only quantum particles can be entangled as we know now.?',
                            }
                        }
                        cy.request(opts)
                            .then((response) => {
                                expect(response).property('status').to.equal(400)
                                expect(response.body).property('message').to.equal('Please allow the support agent to comment before commenting.')
                            })
                    })
            })
    });

    it('should Not allow comment on support request that is closed', function () {
        cy.getLocalStorage('tokenNonGetUser')
            .then((token) => {
                cy.getLocalStorage('supportRequest')
                    .then((supportRequest) => {
                        const opts = {
                            failOnStatusCode: false,
                            method: 'PATCH',
                            url: `${apiUri}/support-requests/${supportRequest}`,
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            body: {
                                requestStatus: 'CLOSED',
                            }
                        }
                        cy.request(opts)
                            .then((response) => {
                                expect(response.body).property('requestStatus').to.equal(opts.body.requestStatus)
                                const nOpts = {
                                    failOnStatusCode: false,
                                    method: 'POST',
                                    url: `${apiUri}/support-requests/${supportRequest}/comments`,
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    },
                                    body: {
                                        comment: 'this shouldnt work',
                                    }
                                }
                                cy.request(nOpts)
                                    .then((nResponse) => {
                                        cy.log(`message: ${nResponse.body}`)
                                        expect(nResponse).property('status').to.equal(400)
                                    })
                            })
                    })
            })
    });

    it('should Get all Comments given a support request',  () => {
        it('should Not allow comment on support request that is closed', function () {
            cy.getLocalStorage('tokenNonGetUser')
                .then((token) => {
                    cy.getLocalStorage('supportRequest')
                        .then((supportRequest) => {
                            const opts = {
                                method: 'GET',
                                url: `${apiUri}/support-requests/${supportRequest}/comments`,
                                headers: {
                                    Authorization: `Bearer ${token}`
                                },
                            }
                            cy.request(opts)
                                .then((response) => {
                                    expect(response).property('status').to.equal(200)
                                    expect(response.body).to.be.a('Array')
                                })
                        })
                })
            })
    });

    it('should Get a single comment', function () {
        cy.getLocalStorage('tokenSupportAgent')
            .then((token) => {
                cy.getLocalStorage('supportRequest')
                    .then((supportRequest) => {
                        const opts = {
                            method: 'POST',
                            url: `${apiUri}/support-requests/${supportRequest}/comments`,
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            body: {
                                comment: 'Ok, fanboy... are you just coming out from a Wormhole ? *smirk*',
                            }
                        }
                        cy.request(opts)
                            .then((response) => {
                                expect(response).property('status').to.equal(201)
                                expect(response.body).property('supportRequest').to.equal(supportRequest)
                                const commentId = response.body._id
                                const nOpts = {
                                    method: 'GET',
                                    url: `${apiUri}/support-requests/${supportRequest}/comments/${commentId}`,
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                                cy.request(nOpts)
                                    .then((nResponse) => {
                                        expect(nResponse).property('status').to.equal(200)
                                        expect(nResponse.body).property('_id').to.equal(commentId)
                                    })
                            })
                        })
                    })
            });
    })
