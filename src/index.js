const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header('Access-Control-Allow-Credentials', "*");
  res.header('Access-Control-Expose-Headers', 'x-access-token'); //essta linha habilita o token no header
  next();
})
require('./controllers/authController')(app)

app.listen(process.env.port || 8000)