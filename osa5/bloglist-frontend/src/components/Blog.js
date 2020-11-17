import React, {useState} from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({blog, setBlogs, blogs, user, likeBlog}) => {

    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const remove = async () => {
        if (window.confirm('Remove blog ' + blog.title + ' by ' + blog.author)) {
            await blogService.remove(blog, user.token)
            const newBlogs = blogs.filter(b => b.id !== blog.id)

            setBlogs(newBlogs)
        }
    }

    const removeButton = () => {
        if (blog.user && user.username === blog.user.username) {
            return <button onClick={remove}>remove</button>
        } else {
            return null
        }
    }

    if (visible) {
        return (
            <div style={blogStyle}>
                <p>Title: {blog.title}
                    <button onClick={() => setVisible(!visible)}>hide</button>
                </p>
                <p>URL: <a href={blog.url}>{blog.url}</a></p>
                <p>Likes: {blog.likes}
                    <button onClick={() => likeBlog(blog)}>like</button>
                </p>
                <p>Author: {blog.author}</p>
                <br/>

                {removeButton()}

            </div>
        )
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={() => setVisible(!visible)}>view</button>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired,
    likeBlog: PropTypes.func.isRequired,
}


export default Blog
