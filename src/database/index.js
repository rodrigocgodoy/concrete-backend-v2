const mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@cluster0-zzwsc.mongodb.net/concrete-backend', { useNewUrlParser: true })
    .then(() => {
        console.log("MongoBD conectado com sucesso")
    }).catch((error) => {
        console.log(`Hove um erro ao se conectar ao mongoDB: ${error}`)
    })

module.exports = mongoose