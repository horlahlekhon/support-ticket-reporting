import {apiUri} from '../settings'

describe('Provide Authentication for accessing the system', () => {
    it('should register a user successfully',  () =>  {
        const rand = Math.random()
        cy.request('POST', `${apiUri}/auth/register`, {
            "name": "Olalekan",
            "email": `lekan${rand}@example.com`,
            "password": "password1",
            "role": "admin"
        }).then((response) => {
                const body = response.body
                expect(body.user).property('name').to.equal('Olalekan')
                expect(body).property('tokens').to.exist
            })
    });
    it('should reject invalid data for registeration',  () => {
        const rand = Math.random()
        const opts = {
            failOnStatusCode: false,
            method: 'POST',
            url:  `${apiUri}/auth/register`,
            data: {
                "name": "Olalekan",
                "password": "password1",
                "role": "admin"
            },
        }
        cy.request(opts).then((response) => {
            const body = response.body
            expect(body).property('message').to.equal('"email" is required')
            expect(body.code).to.equal(400)
            expect(response).property('status').to.equal(400)
        })
    });
    it('should Log a valid user in successfully',  () => {
        const rand = Math.random()
        cy.request('POST', `${apiUri}/auth/register`, {
            "name": "Olalekan",
            "email": `lekan${rand}@example.com`,
            "password": "password1",
            "role": "admin"
        }).then((response) => {
            cy.request('POST', `${apiUri}/auth/login`,{
                "email": response.body.user.email,
                "password": "password1"
            })
        }).then((loginResponse) => {
            const body = loginResponse.body
            expect(body.user).property('name').to.equal('Olalekan')
            expect(body).property('tokens').to.exist
        })
    });
    it('should return 401 on bad login credentials provided',  () => {
        const opts = {
            failOnStatusCode: false,
            method: 'POST',
            url: `${apiUri}/auth/login`,
            body: {
                "email": "Olalekan@gmail.com",
                "password": "bad pass"
            }
        }
        cy.request(opts).then((loginResponse) => {
            const body = loginResponse.body
            expect(loginResponse).property('status').to.equal(401)
            expect(body).property('code').to.equal(401)
            expect(body).property('message').to.equal('Incorrect email or password')
        })
    });
})
