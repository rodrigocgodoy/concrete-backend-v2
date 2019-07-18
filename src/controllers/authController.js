const express = require('express')

const User = require('../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {
    try{
        console.log("entrou")
        const user = await User.create(req.body)

        return res.send({ user })
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
})
router.get('/', (req, res) => {
    return res.json({ message: 'concluido'})
})

module.exports = app => app.use('/auth', router)