const router = require('express').Router()
const Transacao = require('../models/Transacao.js')

//Rotas da API - Criacao de dados
router.post('/', async (req, res) => {

    const {idUser, name, valor, tipo, data} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatorio'})
        return
    }

    const dataTransferencia = {
        idUser,
        name,
        valor,
        tipo,
        data
      }
    

    //Criar dados na base
    try {
        
        await Transacao.create(dataTransferencia)

        return res.status(201).json({message: 'Transação efetuada com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Rotas da API - Criar dados

// Consultar
router.get('/consultarTransacao', async (req, res) => {
    try {
        const transacao = await Transacao.find()

        return res.status(200).json(transacao)

    } catch (error) {
        res.status(500).json({error: error})
    }
})


// Pegar o usuario pela ID
router.get('/consultarTransacao/:id', async (req, res)=>{
    const id = req.params.id

    try {
        const transacao = await Transacao.findOne({_id: id})

        return res.status(200).json(transacao)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Pegar por topico
router.get('/consultarTransacao', async (req, res) => {
    const tipo_consulta = req.query.tipo;

    // Parametro consulta http://localhost:3000/noticias/consulta?topic=Desenvolvimento
    try {
        const transacao = await Transacao.find({ tipo: tipo_consulta});

        return res.status(200).json(transacao);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Minhas transções
router.get('/minhastrasacoes', async (req, res) => {
    const idusuario = req.params.idUser;

    // Parametro consulta http://localhost:3000/noticias/consulta?topic=Desenvolvimento
    try {
        const transacao = await Transacao.find({ idUser: idusuario});

        return res.status(200).json(transacao);
    } catch (error) {
        res.status(500).json({ error });
    }
});

//Rotas da API - Ler dados

module.exports = router