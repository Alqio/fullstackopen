const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs)
})

router.post('', async (request, response) => {
    if (!request.body.title || !request.body.url) {
        response.status(400).send('No title or url provided')
    } else {

        const token = request.token

        if (!token || !token.id) {
            const e = new Error('token missing or invalid')
            e.name = 'Unauthorized'
            throw e
        }

        const user = await User.findById(token.id)

        const blog = new Blog({
            ...request.body,
            user
        })

        const result = await blog.save()

        response.status(201).json(result)
    }

})

router.put('/:id', async (request, response) => {
    const likes = request.body.likes
    const title = request.body.title
    const author = request.body.author
    const url = request.body.url

    await Blog.findOneAndUpdate({'_id': request.params.id}, {likes, title, author, url}, {runValidators: true})

    response.send({
        likes,
        title,
        author,
        url,
        id: request.params.id
    })

})

router.delete('/:id', async (request, response) => {

    const token = request.token

    const blog = await Blog.findById(request.params.id)

    if (!token || !token.id) {
        const e = new Error('token missing or invalid')
        e.name = 'Unauthorized'
        throw e
    }
    const user = await User.findById(token.id)

    if (blog.user.toString() !== user.id) {
        const e = new Error('')
        e.name = 'Unauthorized'
        throw e
    }

    await Blog.findByIdAndRemove(request.params.id)

    response.status(200).json(blog)

})

module.exports = router
