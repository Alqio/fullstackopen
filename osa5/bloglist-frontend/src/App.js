import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from "./components/Login";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetch()
    }, [])

    if (user === null) {
        return (
            <div>
                <Login setUser={setUser}/>
            </div>
        )
    }
    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </div>
    )
}

export default App