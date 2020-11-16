import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, setBlogs, blogs, user}) => {

    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const likeBlog = async () => {

        const newBlog = {
            ...blog,
            likes: blog.likes + 1
        }

        const createdBlog = await blogService.update(newBlog, user.token)

        const newBlogs = blogs.filter(b => b.id !== blog.id)

        setBlogs(newBlogs.concat(createdBlog))
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
                {blog.title}
                <button onClick={() => setVisible(!visible)}>hide</button>
                <br/>
                <a href={blog.url}>{blog.url}</a>
                <br/>
                {blog.likes}
                <button onClick={likeBlog}>like</button>
                <br/>
                {blog.author}
                <br/>

                {removeButton()}

            </div>
        )
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>view</button>
        </div>
    )
}

export default Blog
