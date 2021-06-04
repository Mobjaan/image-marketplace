const express = require('express')
const app_config = require('./utils/app_config')

const app = express()
app_config(app)

app.get('/', (req, res) => {
  res.render('index.ejs')
})



module.exports = app