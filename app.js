const express = require('express')
const authRouter = require('./routes/auth')
const app_config = require('./utils/app_config')
const imageRouter = require('./routes/image')
const categoryRouter = require('./routes/category')
const dashboardRouter = require('./routes/dashboard')
const { authenticatedMiddleware } = require('./utils/middlewares')

const app = express()
app_config(app)

app.use('/auth', authRouter)
app.use('/images', authenticatedMiddleware, imageRouter)
app.use('/categories', authenticatedMiddleware, categoryRouter)
app.use('/dashboard', authenticatedMiddleware, dashboardRouter)

app.get('/', (req, res) => {
  res.render('index.ejs')
})





module.exports = app