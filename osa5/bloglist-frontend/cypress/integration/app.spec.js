describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        cy.fixture('user').then((json) => {
            cy.request('POST', 'http://localhost:3003/api/users/', json)
        })

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.fixture('user').then((userData) => {
                cy.get('#username').type(userData.username)
                cy.get('#password').type(userData.password)
                cy.get('#login').click()

                cy.contains(userData.name + ' logged in')
            })
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('not a real user')
            cy.get('#password').type('password')
            cy.get('#login').click()

            cy.contains('wrong username or password')
            cy.get('#username').should('not.contain', 'not a real user')
        })
    })
})