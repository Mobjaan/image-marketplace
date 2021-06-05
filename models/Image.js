const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema 

const imageSchema = new Schema({
    title: String,
    price: Number,
    description: String, 
    upload_path: String,
    categories: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
        }
    ],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},  { timestamps: true })

module.exports = mongoose.model('Image', imageSchema) 