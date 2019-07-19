const express = require('express')
var mongoose = require('mongoose')
const guid = require('guid')

const User = require('../models/User')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@cluster0-zzwsc.mongodb.net/concrete-backend', {
    useNewUrlParser: true
})
// mongoose.connect('mongodb://localhost/concrete-backend', { 
//     // useMongoClient: true,
//     useNewUrlParser: true
// })
    .then(() => {
        console.log("MongoBD conectado com sucesso")
    }).catch((error) => {
        console.log(`Hove um erro ao se conectar ao mongoDB: ${error}`)
    })

const router = express.Router()

router.route('/register')
    .post(function(req, res) {
        if(req.body.nome && req.body.email && req.body.senha && req.body.telefone.numero && req.body.telefone.ddd){
            var user = new User();

            user.id_guid = guid.create()
            user.nome = req.body.nome
            user.email = req.body.email
            user.senha = req.body.senha
            user.telefone.numero = req.body.telefone.numero;
            user.telefone.ddd = req.body.telefone.ddd;
            user.save()
                .then(() => {
                    res.json(user)
                }).catch((err) => {
                    res.status(400).json({ mensagem: 'O registro falhou, por favor, informe no formato json desejado ' })
                })  
        } else {
            res.status(400).json({ mensagem: 'O registro falhou, por favor, informe no formato json desejado ' })
        }
    })
router.route('/:user_id')
    .get(function (req, res) {
        var users = new Users();

        users.findById(req.params.user_id).then(() => {
            res.json(users);
        }).catch((err) => {
            res.json({ mensagem: `Id do User não encontrado: ${err}`})
        })
    })

module.exports = app => app.use('/api/users', router)