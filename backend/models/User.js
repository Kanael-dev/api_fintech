const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    login: String,
    password: String,
    URI: String
})

module.exports = User