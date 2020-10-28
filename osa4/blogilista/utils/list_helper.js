const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    return likes.reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
    let favoriteBlog;
    let likes = -1;
    for (let blog of blogs) {
        if (blog.likes > likes) {
            favoriteBlog = blog
            likes = blog.likes
        }
    }
    if (!favoriteBlog) {
        return;
    }
    return {
        title: favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return;

    const grouped = lodash.groupBy(blogs, 'author')
    const keys = Object.keys(grouped)
    console.log(grouped)
    console.log(keys)
    const mapped = keys.map(key => {
        return {
            author: key,
            blogs: grouped[key].length
        }
    })
    const sorted = lodash.sortBy(mapped, lodash.property(['blogs']))
    return sorted[sorted.length - 1]
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return;

    const grouped = lodash.groupBy(blogs, 'author')
    const keys = Object.keys(grouped)
    console.log(grouped)
    console.log(keys)

    

    const sorted = lodash.sortBy(mapped, lodash.property(['blogs']))
    return sorted[sorted.length - 1]
}

module.exports = {
    dummy,
    mostBlogs,
    mostLikes,
    totalLikes,
    favoriteBlog
}