require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.set("strictQuery", false);

app.use(cors());

// configuração

const DB_USER = "userAPI";
const DB_PASSWORD = "userapiteste123.";

//Configuração para ler o JSON //
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//Rotas api //
const userRouter = require("./backend/router/userRouter");
const uploadFoto = require("./backend/router/uploadRouter");

app.use("/usuarios", userRouter);
app.use("/fotos", uploadFoto);

//Configuração para ler o JSON //

mongoose
.connect(
  `mongodb+srv://kanaeldev:tsxNPEiNMsnDkz7c@kanael0.yuazcu9.mongodb.net/`
)
.then(() => {
  console.log("Conectado com sucesso");
  app.listen(3001);
})
.catch((err) => console.log(err));
