import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const AddBlog = ({ createBlog }) => {

    const [blog, setBlog] = useState({
        title: '',
        author: '',
        url: ''
    })

    const handleOnChange = async (event) => {
        const target = event.target
        const n = target.name

        setBlog({
            ...blog,
            [n]: target.value
        })
    }

    const handleSubmit = (event) => {
        createBlog(event, blog, setBlog)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title
                    <input
                        id="title"
                        type="text"
                        value={blog.title}
                        name="title"
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    author
                    <input
                        id="author"
                        type="text"
                        value={blog.author}
                        name="author"
                        onChange={handleOnChange}
                    />
                </div>
                <div>
                    url
                    <input
                        id="url"
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

AddBlog.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default AddBlog