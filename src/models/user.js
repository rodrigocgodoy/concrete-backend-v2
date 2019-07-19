const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    id_guid: String,
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true
    },
    senha: {
        type: String,
        require: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
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
    }
    // telefones: {
    //     numero: Number,
    //     ddd: Number
    // }
})

const User = mongoose.model('users', UserSchema)

module.exports = User