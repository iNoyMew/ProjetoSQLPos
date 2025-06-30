const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', UsuarioController.cadastrar);
router.get('/perfil', authMiddleware, UsuarioController.buscarPerfil);

module.exports = router;