const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://admin:admin@cluster0-zzwsc.mongodb.net/concrete-backend', { useMongoClient: true })
mongoose.connect('mongodb://localhost/concrete-backend', { 
    useMongoClient: true,
    useNewUrlParser: true
})
.then(() => {
    console.log("Banco de dados conectado")
}).catch((err) => {
    console.log("Erro ao conectar no banco de dados " + err)
})
mongoose.Promise = global.Promise

module.exports = mongoose