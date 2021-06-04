const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema 

const purchaseSchema = new Schema({
    bag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShoppingBag'
    },

    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    }
},  { timestamps: true })

module.exports = mongoose.model('Purchase', purchaseSchema) 