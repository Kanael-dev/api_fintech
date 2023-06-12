const mongoose = require('mongoose')

const Transacao = mongoose.model('Transacao', {
    idUser: String,
    name: String,
    valor: Number,
    tipo: Number,
    data: String
})

module.exports = Transacao