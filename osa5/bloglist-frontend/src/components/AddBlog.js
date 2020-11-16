import React, {useState} from 'react'
import blogService from "../services/blogs";

const AddBlog = ({user, blogs, setBlogs, createNotification, togglable}) => {

    const [blog, setBlog] = useState({
        title: "",
        author: "",
        url: ""
    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const createdBlog = await blogService.create(blog, user.token)

            setBlog({
                title: "",
                author: "",
                url: ""
            })

            setBlogs(blogs.concat(createdBlog))
            createNotification('a new blog ' + createdBlog.title + ' by ' + createdBlog.author + ' added', 'green')
            togglable.current.toggleVisibility()
        } catch (e) {
            createNotification(JSON.stringify(e), 'red')
        }

    }

    const handleOnChange = async (event) => {
        const target = event.target;
        const n = target.name;

        setBlog({
            ...blog,
            [n]: target.value
        })
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title
                    <input
                        type="text"
                        value={blog.title}
                        name="title"
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={blog.author}
                        name="author"
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={blog.url}
                        name="url"
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AddBlog