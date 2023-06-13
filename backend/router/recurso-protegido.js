const verificarToken = require('../middlewares/authMiddleware');
const router = require('express').Router()
// const Person = require('.../models/Person')
const jwt = require('jsonwebtoken');


// Rota protegida que requer autenticação
router.get('/recurso-protegido', verificarToken, (req, res) => {
    // Lógica para fornecer acesso ao recurso protegido
    return res.json({ message: 'Acesso concedido ao recurso protegido' });
  });

module.exports = router