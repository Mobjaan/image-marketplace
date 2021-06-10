require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const Image = require('../models/Image')
const Category = require('../models/Category')
const expressLayouts = require('express-ejs-layouts')
const fileupload = require('express-fileupload')


module.exports = (app) => {
    app.set('trust proxy', 1)
    app.use(session({
        name: 'mobjaan.sid',
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        unset: 'destroy',
        store: MongoStore.create({
          mongoUrl: process.env.MOGODB_URI,
          touchAfter: 24 * 3600 // time period in seconds
        }),
        cookie: { secure: false, maxAge: (24 * 1000 * 60 * 100) }
    }))
    
    app.use(fileupload({
      useTempFiles: true
    }))

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json()) 
    app.use(express.json())

    app.use(morgan('combined'))

    app.use(expressLayouts)
    app.set('view engine', 'ejs')
    app.set('views', './views')

    app.use(express.static('statics'))

    app.use(async (req, res, next) => {
      res.locals = {
        current_user: req.session.current_user,
        categories: await Category.find()
      }
      next()
    })

}