const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/user')
const config = require('./config')


mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs/', blogRouter)
app.use('/api/users/', userRouter)
app.use(require('./errorHandler'))
module.exports = app
