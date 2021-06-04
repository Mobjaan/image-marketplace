const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema 

const purchaseSchema = new Schema({
    gateway: {
        type: String,
        enum: ['STRIPE', 'PAYPAL']
    },

    transaction_id: String
    
},  { timestamps: true })

module.exports = mongoose.model('Purchase', purchaseSchema) 