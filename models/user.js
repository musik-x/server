const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { encrypt } = require('../helpers/bcrypt.js')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true      
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },  
})

userSchema.pre('save', function(next) {
    this.password = encrypt(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User