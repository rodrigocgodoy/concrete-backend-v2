const express = require('express')
const guid = require('guid')

const User = require('../models/User')

const router = express.Router()

router.route('/register')
    .post(async (req, res) => {

        var user = new User();

        user.id_guid = guid.create()
        user.nome = req.body.nome
        user.email = req.body.email
        user.senha = req.body.senha

        user.save().then(() => {
            return res.json(user)
        }).catch((err) => {
            return res.json(400).send({ error: 'Registration failed' })

        })            
    })

router.get('/', (req, res) => {
    return res.json({ message: 'concluido' })
})

module.exports = app => app.use('/auth', router)