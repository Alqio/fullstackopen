import React, {useState} from 'react'

const Blog = ({blog}) => {

    const [visible, setVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    if (visible) {
        return (
            <div style={blogStyle}>
                {blog.title}
                <br/>
                {blog.url}
                <br/>
                {blog.likes} <button>like</button>
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
