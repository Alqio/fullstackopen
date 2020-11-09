const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const blogs = require('./helper').blogs
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    let noteObject = new Blog(blogs[0])
    await noteObject.save()

    noteObject = new Blog(blogs[1])
    await noteObject.save()
})

describe('GET /api/blogs', () => {
    test('returns json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })
    test('returns blogs with id field, not _id', async () => {
        const res = await api.get('/api/blogs')

        const b = res.body

        expect(b[0].id).toBeDefined()
        expect(b[1].id).toBeDefined()
        expect(b[0]._id).not.toBeDefined()
        expect(b[1]._id).not.toBeDefined()

    })
    test('returns correct blogs', async () => {
        const res = await api.get('/api/blogs')

        const contents = res.body.map(r => r.id)
        expect(contents[0]).toEqual('5a422a851b54a676234d17f7')
        expect(contents[1]).toEqual('5a422aa71b54a676234d17f8')

    })
})

describe('POST /api/blogs', () => {

    beforeEach(async () => {
        await Blog.deleteMany({title: 'Test blog'})
    })

    const blog = {
        title: 'Test blog',
        author: 'Meikä mandoliini',
        url: 'google.com',
    }

    test('returns json', async () => {
        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

    })
    test('adds a new blog', async () => {
        const initalBlogs = await Blog.find({})

        await api.post('/api/blogs').send(blog)

        const blogsAfter = await Blog.find({})

        expect(blogsAfter.length).toEqual(initalBlogs.length + 1)

    })
    test('adds correct blog', async () => {
        await api.post('/api/blogs').send(blog)
        const addedBlog = await Blog.findOne({title: 'Test blog'})
        expect(addedBlog).toBeDefined()

    })
    test('adding a blog without likes should set them to 0', async () => {
        await api.post('/api/blogs').send(blog)
        const addedBlog = await Blog.findOne({title: 'Test blog'})
        expect(addedBlog.likes).toEqual(0)

    })
    test('adding a blog without url or title should respond 400', async () => {
        await api
            .post('/api/blogs')
            .send({
                title: 'jou',
                author: 'google.com'
            })
            .expect(400)

        await api
            .post('/api/blogs')
            .send({
                author: 'jou',
                url: 'google.com'
            })
            .expect(400)
    })
})

describe('DELETE /api/blogs', () => {

    const blog = {
        title: 'Test blog',
        author: 'Meikä mandoliini',
        url: 'google.com',
    }
    let id

    beforeEach(async () => {
        await Blog.deleteMany({})
        const blogObject = new Blog(blog)
        await blogObject.save()
        const b = await Blog.findOne({title: 'Test blog'})
        id = b.id

    })

    test('returns json', async () => {
        const url = '/api/blogs/' + id
        await api
            .delete(url)
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })
    test('deletes a blog', async () => {
        const initalBlogs = await Blog.find({})

        await api.delete('/api/blogs/' + id)

        const blogsAfter = await Blog.find({})

        expect(blogsAfter.length).toEqual(initalBlogs.length - 1)

    })
    test('deletes correct blog', async () => {
        await api.delete('/api/blogs/' + id)
        const deletedBlog = await Blog.findOne({title: 'React patterns'})
        expect(deletedBlog).toBeNull()

    })
})

describe('PUT /api/blogs', () => {

    const blog = {
        title: 'Test blog',
        author: 'Meikä mandoliini',
        url: 'google.com',
    }
    const updatedBlog = {
        title: 'Actual blog',
        author: 'Teikä mandoliini',
        url: 'amazon.com',
    }
    let id

    beforeEach(async () => {
        await Blog.deleteMany({})
        const blogObject = new Blog(blog)
        await blogObject.save()
        const b = await Blog.findOne({title: 'Test blog'})
        id = b.id

    })

    test('returns json', async () => {
        const url = '/api/blogs/' + id
        await api
            .put(url)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })
    test('updates blog', async () => {
        const initalBlogs = await Blog.find({})

        await api.put('/api/blogs/' + id).send(updatedBlog)

        const blogsAfter = await Blog.find({})

        expect(blogsAfter.length).toEqual(initalBlogs.length)

        const modified = await Blog.findOne({title: 'Actual blog'})
        expect(modified).toBeDefined()
        expect(modified.url).toEqual('amazon.com')
    })
})

afterAll(() => {
    mongoose.connection.close()
})