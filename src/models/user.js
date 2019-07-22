const mongoose = require('mongoose')
var Schema = mongoose.Schema

const guid = require('guid')
const uuidV1 = require('uuid/v1')
const moment = require('moment-timezone')
const dateSaoPaulo = moment.tz(Date.now(), "America/Sao_Paulo")

const UserSchema = new Schema({
    id: {
        type: String,
        default: uuidV1()
    },
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    senha: {
        type: String,
        require: true,
        select: false
    },
    telefone: {
        numero: {
            type: String,
            require: true
        },
        ddd: {
            type: String,
            require: true
        },
    },
    data_criacao: {
        type: Date,
        default: dateSaoPaulo
    },
    data_autualizacao: {
        type: Date
    },
    ultimo_login: {
        type: Date,
        default: dateSaoPaulo
    },
    token: {
        type: String,
        default: guid.create()
    }
})

const User = mongoose.model('users', UserSchema)

module.exports = User