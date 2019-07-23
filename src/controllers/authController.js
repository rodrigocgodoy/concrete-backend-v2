const express = require('express')
const mongoose = require('../database')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('myTotalySecretKey')

const User = require('../models/User')

const router = express.Router()

router.route('/signup')
    .post((req, res) => {
        if (req.body.nome && req.body.email && req.body.senha && req.body.telefone.numero && req.body.telefone.ddd) {
            User.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        res.status(400)
                            .json({ mensagem: 'E-mail já existente' })
                    } else {
                        const user = new User();

                        user.nome = req.body.nome
                        user.email = req.body.email
                        user.senha = cryptr.encrypt(req.body.senha)
                        user.telefone.numero = req.body.telefone.numero;
                        user.telefone.ddd = req.body.telefone.ddd;
                        user.save()
                            .then((user) => {
                                res.redirect('search_guid/' + user.id)
                                // res.status(200)
                                //     .json(User.findOne({ id: user.id}))
                            })
                            .catch((err) => {
                                res.status(400)
                                    .json({ mensagem: 'O registro falhou, por favor, informe no formato json desejado ' })
                            })
                    }
                })
        } else {
            res.status(400)
                .json({ mensagem: 'O registro falhou, por favor, informe no formato json desejado ' })
        }
    })
router.route("/signin")
    .post((req, res) => {
        if (req.body.email && req.body.senha) {
            User.findOne({ email: req.body.email })
                .then((user) => {
                    if (user) {
                        const senhaCompare = (req.body.senha === cryptr.decrypt(user.senha))
                        if (senhaCompare) {
                            res.status(200)
                                .json(user)
                        }
                        else {
                            res.status(400)
                                .send({ mensagem: "Usuário e/ou senha inválidos" });
                        }
                    } else {
                        res.status(400)
                            .send({ mensagem: "Usuário e/ou senha inválidos" });
                    }
                })
                .catch((err) => {
                    res.status(400)
                        .json({ mensagem: "Usuário e/ou senha inválidos" })
                })
        }
        else {
            res.status(400)
                .json({ mensagem: "Por favor, informe o usuário e senha" })
        }
    })

router.route('/search_guid/:user_guid')
    .get((req, res) => {
        console.log(req.headers['x-access-token'])
        // var tokeValidation = User.findOne({ token: req})
        // User.findOne({ id: req.params.user_guid })
        //     .then((user) => {
        //         return (req)
        //         if (user.token) {

        //         } else {
        //             res.json({ mensagem: 'Não Autorizado' })
        //         }
        //         res.status(200)
        //             .json(user)
        //     })
        //     .catch((err) => {
        //         res.status(400)
        //             .json({ mensagem: 'Por um motivo não foi possivel retornar o usuário desejado.' })
        //     })
    })

router.route('/search')
    .get((req, res) => {
        User.find()
            .then((users) => {
                res.status(200)
                    .json(users)
            })
            .catch((err) => {
                res.status(400)
                    .json({ mensagem: 'Por um motivo não foi possivel retornar todos usuários.' })
            })
    })

router.route('/search_id/:user_id')
    .get((req, res) => {
        User.findById(req.params.user_id)
            .then((user) => {
                res.status(200)
                    .json(user)
            })
            .catch((err) => {
                res.status(400)
                    .json({ mensagem: 'Por um motivo não foi possivel retornar o usuário desejado.' })
            })
    })

module.exports = app => app.use('/api/user', router)