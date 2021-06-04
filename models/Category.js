const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema 

const categorySchema = new Schema({
    title: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
},  { timestamps: true })

module.exports = mongoose.model('Category', categorySchema) 