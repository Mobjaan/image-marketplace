const mongoose = require('../utils/mongoose')
const Bcrypt = require('bcrypt')
const Schema = mongoose.Schema 

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
}, { timestamps: true })

userSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = Bcrypt.hashSync(this.password, parseInt(process.env.BCRYPT_SALT_ROUNDS));
    next();
});

userSchema.methods.comparePassword = function(plaintext, callback) {
    return callback(null, Bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model('User', userSchema) 