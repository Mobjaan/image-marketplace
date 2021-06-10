require('dotenv').config()
const paypal = require('paypal-rest-sdk')
const stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET)


paypal.configure({
    'mode': (process.env.DEBUG) ? 'sandbox' : 'live', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});


module.exports = {
    makeStripePayment: async (amount) => {
        return await stripe.paymentIntents.create({
            amount: amount * 100, 
            currency: 'usd', 
            metadata: {integration_check: 'accept_a_payment'}, 
        })
    }
}