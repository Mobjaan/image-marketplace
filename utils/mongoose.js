require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MOGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true }) 

module.exports = mongoose