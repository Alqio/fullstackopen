import React, {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
    const [blogs, setBlogsInner] = useState([])
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)
    const [notificationColor, setNotificationColor] = useState('green')

    const toggleRef = useRef()

    const clearNotification = () => setTimeout(() => setNotificationMessage(null), 3000)

    const createNotification = (message, color) => {
        setNotificationColor(color)
        setNotificationMessage(message)
        clearNotification()
    }

    const setBlogs = (newBlogs) => {
        const sorted = newBlogs.sort((a, b) => b.likes - a.likes)
        setBlogsInner(sorted)
    }

    const likeBlog = async (blog) => {
        const newBlog = {
            ...blog,
            likes: blog.likes + 1
        }
        const createdBlog = await blogService.update(newBlog, user.token)

        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs.concat(newBlog))

    }

    const createBlog = async (event, blog, setBlog) => {
        event.preventDefault()

        try {
            const createdBlog = await blogService.create(blog, user.token)

            setBlog({
                title: '',
                author: '',
                url: ''
            })

            setBlogs(blogs.concat(createdBlog))
            createNotification('a new blog ' + createdBlog.title + ' by ' + createdBlog.author + ' added', 'green')
            toggleRef.current.toggleVisibility()
        } catch (e) {
            createNotification(JSON.stringify(e), 'red')
        }
    }

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
                <Notification message={notificationMessage} color={notificationColor}/>
                <Login setUser={setUser} createNotification={createNotification}/>
            </div>
        )
    }
    return (
        <div>
            <Notification message={notificationMessage} color={notificationColor}/>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <Logout setUser={setUser}/>
            <Togglable buttonLabel='new blog' buttonId='new-blog' ref={toggleRef}>
                <AddBlog
                    createBlog={createBlog}
                />
            </Togglable>
            <div id="blogs">
                {blogs.map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        likeBlog={likeBlog}
                        blogs={blogs}
                        setBlogs={setBlogs}
                    />
                )}
            </div>

        </div>
    )
}

export default App
