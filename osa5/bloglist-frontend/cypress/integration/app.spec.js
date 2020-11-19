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

    describe('When logged in', function () {
        beforeEach(function () {
            cy.fixture('user').then((user) => {
                cy.login({
                    username: user.username,
                    password: user.password
                })
            })
        })

        it('A blog can be created', function () {
            cy.fixture('blog').then((blog) => {
                cy.get('#new-blog').click()

                cy.get('#title').type(blog.title)
                cy.get('#author').type(blog.author)
                cy.get('#url').type(blog.url)

                cy.get('#create-blog').click()

                cy.contains(blog.title + ' ' + blog.author)
            })
        })

        it('A blog can be liked', function () {
            cy.fixture('blog').then(blog => {
                cy.createBlog(blog)
                cy.contains('view').click()

                cy.contains('like').click()
                cy.wait(200)
                cy.contains('like').click()
                cy.wait(200)
                cy.contains('like').click()

                cy.contains('Likes: 3')
            })
        })

        it('A blog can be removed', function () {
            cy.fixture('blog').then(blog => {
                cy.createBlog(blog)
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.contains(blog.title + ' ' + blog.author).should('not.exist')
            })
        })

        it('Blogs are sorted by their likes', function () {
            cy.fixture('blogs').then(blogs => {
                cy.createBlog(blogs[0])
                cy.createBlog(blogs[1])
                cy.get('#blogs').children().then(elements => {

                    const blog = elements[1]
                    cy.wrap(blog).contains('view').click()
                    cy.wrap(blog).contains('like').click()
                })
                cy.get('#blogs').children().then(elements => {
                    const blog = elements[1]
                    cy.wrap(blog).contains('Title: ' + blogs[1].title)
                })
                cy.get('#blogs').children().then(elements => {

                    const blog = elements[0]
                    cy.wrap(blog).contains('view').click()
                    cy.wait(200)
                    cy.wrap(blog).contains('like').click()
                    cy.wait(200)
                    cy.wrap(blog).contains('like').click()
                    cy.wait(200)
                    cy.wrap(blog).contains('like').click()

                })
                cy.get('#blogs').children().then(elements => {
                    const blog = elements[0]
                    cy.wrap(blog).contains('Title: ' + blogs[0].title)
                })
            })
        })

    })
})