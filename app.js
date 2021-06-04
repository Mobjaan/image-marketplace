const express = require('express')
const authRouter = require('./routes/auth')
const app_config = require('./utils/app_config')

const app = express()
app_config(app)

app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.render('index.ejs')
})



module.exports = app