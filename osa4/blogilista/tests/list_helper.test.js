const listHelper = require('../utils/list_helper')
const blogs = require('./helper').blogs

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})




describe('favorite blog', () => {

    test('returns undefined if no blogs provided', () => {
        const b = listHelper.favoriteBlog([])
        expect(b).toEqual(undefined)
    })

    test('finds the correct blog', () => {
        const b = listHelper.favoriteBlog(blogs)
        expect(b).toEqual({
            author: blogs[2].author,
            likes: blogs[2].likes,
            title: blogs[2].title
        })
    })
})
describe('total likes', () => {

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
    test('when list has only one blog equal the likes of that', () => {
        const b = blogs[0]
        expect(listHelper.totalLikes([b])).toBe(b.likes)
    })
    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })
})

describe('most blogs', () => {
    test('of a bigger list is calculated right', () => {
        const res = listHelper.mostBlogs(blogs)
        expect(res).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('most likes', () => {
    test('of a bigger list is calculated right', () => {
        const res = listHelper.mostLikes(blogs)
        expect(res).toEqual({
            'key': 'Edsger W. Dijkstra',
            'likes': 17
        })
    })
})