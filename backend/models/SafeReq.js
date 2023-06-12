const mongoose = require('mongoose')

const Saldo = mongoose.model('User', {
    idUser: String,
    saldoUser: Number
})

module.exports = Saldo