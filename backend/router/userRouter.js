const verificarToken = require('../middlewares/authMiddleware.js');
const router = require("express").Router();
// const Person = require('.../models/Person')
const User = require("../models/User.js");


//Rotas da API - Criacao de dados

router.post("/", verificarToken, async (req, res) => {
  const { name, login, password, URI } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatorio" });
    return;
  }

  const dataUser = {
    name,
    login,
    password,
    URI,
  };

  //Criar dados na base
  try {
    await User.create(dataUser);

    return res.status(201).json({ message: "Criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Rotas da API - Criar dados

// Consultar
router.get("/consultaruser", verificarToken, async (req, res) => {
  try {
    const usuarios = await User.find();

    return res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Autenticar usuário
router.get('/consultaruserAPI', verificarToken, async (req, res) => {
    const login = req.query.login;
    const senhausuario = req.query.password;
    const chaveSecreta = process.env.SECRET_KEY_JWT;
  
    try {
      const usuarios = await User.find({ login: login, password: senhausuario });
  
      if (usuarios.length === 0) {
        // Usuário não encontrado
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      const usuario = usuarios[0];
  
      // Gerar o token JWT
      const tokenGerado = jwt.sign(usuario.toJSON(), chaveSecreta);
  
      // Salvar o token em um cookie
      res.cookie('token', tokenGerado, { httpOnly: true });
  
      return res.status(200).json({ token: tokenGerado });
    } catch (error) {
      console.log('Erro ao autenticar usuário:', error);
      return res.status(500).json({ error: error.message });
    }
  });


// Pegar o usuario pela ID
router.get("/consultaruser/:id", verificarToken, async (req, res) => {
  const id = req.params.id;

  try {
    const usuarios = await User.findOne({ _id: id });

    return res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Rotas da API - Ler dados

module.exports = router;
