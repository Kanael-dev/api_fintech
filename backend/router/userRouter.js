const router = require('express').Router()
// const Person = require('.../models/Person')
const User = require('../models/User.js')

//Rotas da API - Criacao de dados

router.post('/', async (req, res) => {

    const {name, login, password, URI} = req.body

    if(!name){
        res.status(422).json({error: 'O nome é obrigatorio'})
        return
    }

    const dataUser = {
        name,
        login,
        password,
        URI
      }
    

    //Criar dados na base
    try {
        
        await User.create(dataUser)

        return res.status(201).json({message: 'Criado com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Rotas da API - Criar dados

// Consultar
router.get('/consultaruser', async (req, res) => {
    try {
        const usuarios = await User.find()

        return res.status(200).json(usuarios)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// Autenticar user
router.get('/consultaruserAPI', async (req, res) => {
    const login = req.body.login;
    const senhausuario = req.body.pass;
    // Parametro consulta http://localhost:3000/noticias/consulta?topic=Desenvolvimento
    try {
        const usuarios = await User.find({ login: login, password: senhausuario });

        return res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error });
    }
});


// Pegar o usuario pela ID
router.get('/consultaruser/:id', async (req, res)=>{
    const id = req.params.id

    try {
        const usuarios = await User.findOne({_id: id})

        return res.status(200).json(usuarios)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Rotas da API - Ler dados

module.exports = router