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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}