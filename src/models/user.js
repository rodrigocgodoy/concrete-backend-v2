const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    // id_guid: String,
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
    }
    // telefones: {
    //     numero: Number,
    //     ddd: Number
    // }
})

const User = mongoose.model('User', UserSchema)
console.log("Entrou model user")
module.exports = User