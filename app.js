const express = require('express')
const Image  = require('./models/Image')
const authRouter = require('./routes/auth')
const imageRouter = require('./routes/image')
const app_config = require('./utils/app_config')
const categoryRouter = require('./routes/category')
const dashboardRouter = require('./routes/dashboard')
const { authenticatedMiddleware } = require('./utils/middlewares')

const app = express()
app_config(app)

app.use('/auth', authRouter)
app.use('/images', imageRouter)
app.use('/categories', categoryRouter)
app.use('/dashboard', authenticatedMiddleware, dashboardRouter)

app.get('/', async (req, res) => {
  res.render('index.ejs', { images: await Image.find().sort('-updatedAt').limit(6) })
})





module.exports = app