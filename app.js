const express = require('express');
const cors = require('cors');
const musicaRouter = require('./controllers/MusicaController');
const generoRouter = require('./controllers/GeneroController');
const compositorRouter = require('./controllers/CompositorController');
const compositorRouter = require('./controllers/ArtistaController');
const loginRouter = require('./controllers/LoginController');


// Cria uma instância do servidor Express.
const app = express();

// Aplica o middleware para parsear JSON no corpo das requisições.
app.use(express.json());

// Habilita o CORS para permitir requisições de diferentes origens.
app.use(cors());

// Define a rota "/tarefas" e associa ao router importado.
app.use("/musicas", musicaRouter);
app.use("/generos", generoRouter);
app.use("/compositores", compositorRouter);
app.use("/artistas", compositorRouter);
app.use("/login", loginRouter);

// Define a porta do servidor, com um fallback para a porta 3000 se não estiver definida.
const PORT = process.env.PORT || 3000;

// Inicia o servidor na porta especificada.
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});