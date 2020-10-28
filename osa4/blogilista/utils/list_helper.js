const lodash = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => blog.likes)
    return likes.reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
    let favoriteBlog
    let likes = -1
    for (const blog of blogs) {
        if (blog.likes > likes) {
            favoriteBlog = blog
            likes = blog.likes
        }
    }
    if (!favoriteBlog) {
        return
    }
    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes,
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return

    const grouped = lodash.groupBy(blogs, 'author')
    const keys = Object.keys(grouped)
    const mapped = keys.map((key) => ({
        author: key,
        blogs: grouped[key].length,
    }))
    const sorted = lodash.sortBy(mapped, lodash.property(['blogs']))
    return sorted[sorted.length - 1]
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return

    const grouped = lodash.groupBy(blogs, 'author')
    const keys = Object.keys(grouped)

    const mapped = keys.map(key => {
        const blogsByAuthor = grouped[key]
        const likes = blogsByAuthor.map(blog => blog.likes).reduce((a, b) => a + b, 0)
        return {
            key,
            likes
        }
    })

    const sorted = lodash.sortBy(mapped, lodash.property(['likes']))
    return sorted[sorted.length - 1]
}

module.exports = {
    dummy,
    mostBlogs,
    mostLikes,
    totalLikes,
    favoriteBlog,
}
