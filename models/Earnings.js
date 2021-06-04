const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema 

const earningsSchema = new Schema({
    purchase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase'
    },

    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BagItem'
        }
    ],

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    

},  { timestamps: true })

module.exports = mongoose.model('Earnings', earningsSchema) 