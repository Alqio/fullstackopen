import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddBlog from "./components/AddBlog";
import Notification from "./components/Notification";


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null);
    const [notificationColor, setNotificationColor] = useState('green')

    const clearNotification = () => setTimeout(() => setNotification(null), 3000);

    const createNotification = (m, c) => {
        setNotificationColor(c);
        setNotification(m);
        clearNotification();
    };

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
                <Login setUser={setUser} createNotification={createNotification}/>
            </div>
        )
    }
    return (
        <div>
            <Notification message={notification} color={notificationColor}/>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <Logout setUser={setUser}/>
            <AddBlog blogs={blogs} setBlogs={setBlogs} user={user} createNotification={createNotification}/>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}

        </div>
    )
}

export default App
