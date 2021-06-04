require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const expressLayouts = require('express-ejs-layouts')

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
    
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json()) 
    app.use(express.json())

    app.use(morgan('combined'))

    app.set('view engine', 'ejs')
    app.use(expressLayouts)
    app.set('views', './views')

    app.use(express.static('statics'))

}