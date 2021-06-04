const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema 

const withdrawSchema = new Schema({
    amount: Number,
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    withdrawn_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    transaction_id: String
}, { timestamps: true })

module.exports = mongoose.model('Withdraw', withdrawSchema) 