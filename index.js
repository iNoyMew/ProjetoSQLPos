const express = require('express');
const sequelize = require('./config/database');
const CursoRoutes = require('./src/routes/CursoRoutes');
const UsuarioRoutes = require('./src/routes/UsuarioRoutes');
const AuthRoutes = require('./src/routes/AuthRoutes');
const authMiddleware = require('./src/middlewares/authMiddleware');
const CursoController = require('./src/controllers/CursoController');
const router = express.Router();

require('dotenv').config();

const app = express();
app.use(express.json());


//router.get('/:idUsuario', authMiddleware, CursoController.listarCursosInscritos());
app.use('/cursos', CursoRoutes);
app.use('/usuarios', UsuarioRoutes);
app.use('/login', AuthRoutes);

sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado com sucesso!");
    app.listen(3000, ()=> console.log("Servidor rodando na porta 3000"));
}).catch(err => console.error("Erro ao conectar com banco de dados", err));