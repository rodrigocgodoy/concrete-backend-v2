const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:admin@cluster0-zzwsc.mongodb.net/concrete-backend', { useMongoClient: true }).then(() => {
    console.log("Banco de dados conectado")
}).catch((err) => {
    console.log("Erro ao conectar no banco de dados " + err)
})
mongoose.Promise = global.Promise

module.exports = mongoose