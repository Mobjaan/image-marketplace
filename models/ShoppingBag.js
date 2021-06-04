const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema 

const shoppingBag = new Schema({
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BagItem'
        }
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},  { timestamps: true })

module.exports = mongoose.model('ShoppingBag', shoppingBag) 