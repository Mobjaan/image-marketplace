const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema 

const salesSchema = new Schema({
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    quantity: Number,
},  { timestamps: true })

module.exports = mongoose.model('BagItem', salesSchema) 