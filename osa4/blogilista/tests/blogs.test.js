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

describe('/api/blogs', () => {
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

afterAll(() => {
    mongoose.connection.close()
})