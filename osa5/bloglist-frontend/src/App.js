import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddBlog from "./components/AddBlog";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }

        if (localStorage.getItem('user')) {
            const u = JSON.parse(localStorage.getItem('user'))
            setUser(u)
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
            <Logout setUser={setUser}/>
            <AddBlog blogs={blogs} setBlogs={setBlogs} user={user}/>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}

        </div>
    )
}

export default App