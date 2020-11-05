const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('', async (request, response) => {
    const users = await User.find({})
    const mapped = users.map(user => {
        return {
            username: user.username,
            name: user.name
        }
    })

    response.json(mapped)
})

router.post('', async (request, response, next) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = router
