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

    if (visible) {
        return (
            <div style={blogStyle}>
                {blog.title}
                <br/>
                {blog.url}
                <br/>
                {blog.likes} <button onClick={likeBlog}>like</button>
                <br/>
                {blog.author}
                <br/>
                <button onClick={() => setVisible(!visible)}>hide</button>
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
