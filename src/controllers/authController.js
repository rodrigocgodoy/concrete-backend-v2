const express = require('express')
const mongoose = require('../database')
const Bcrypt = require("bcryptjs")

const User = require('../models/User')

const router = express.Router()

router.route('/register')
    .post((req, res) => {
        if (req.body.nome && req.body.email && req.body.senha && req.body.telefone.numero && req.body.telefone.ddd) {
            User.findOne({ email: req.body.email })
                .then(user => {
                    if (user) {
                        res.status(400)
                            .json({ mensagem: 'E-mail já existente' })
                    } else {
                        // res.json({ mensagem: 'email não existe ainda' })
                        Bcrypt.hashSync(req.body.senha, 3)
                            .then(hash => {
                                const encreypedSenha = hash
                                const user = new User();

                                user.nome = req.body.nome
                                user.email = req.body.email
                                user.senha = encreypedSenha
                                // user.senha = Bcrypt.hash(req.body.senha, 10)
                                // user.senha = req.body.senha
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
                            })
                            .catch(err => {
                                res.status(400)
                                    .json({ mensagem: err })
                            })
                    }
                })
        } else {
            res.status(400)
                .json({ mensagem: 'O registro falhou, por favor, informe no formato json desejado ' })
        }
    })
router.route("/login")
    .post((req, res) => {
        if (req.body.email && req.body.senha) {
            User.findOne({ email: req.body.email })
                .then((user) => {
                    console.log('teste')
                    if (user) {
                        
                        const senhaCompare = Bcrypt.compareSync(req.body.senha, user.senha)
                        if (senhaCompare){
                            res.status(200)
                            .json(user)
                        }
                        else {
                            res.status(400)
                            .send({ mensagem: "Usuário e/ou senha inválidos 2" });
                        }
                    } else {
                        res.status(400)
                            .send({ mensagem: "Usuário e/ou senha inválidos 1" });
                    }
                })
                .catch((err) => {
                    res.status(400)
                        .json({ mensagem: "Usuário e/ou senha inválidos 3 " + err })
                })
        }
        else {
            res.status(400)
                .json({ mensagem: "Por favor, informe o usuário e senha" })
        }
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

router.route('/search_guid/:user_guid')
    .get((req, res) => {
        User.findOne({ id: req.params.user_guid })
            .then((user) => {
                res.status(200)
                    .json(user)
            })
            .catch((err) => {
                res.status(400)
                    .json({ mensagem: 'Por um motivo não foi possivel retornar o usuário desejado.' })
            })
    })

module.exports = app => app.use('/api/users', router)