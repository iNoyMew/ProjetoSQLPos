const express = require('express');
const InscricaoController = require('../controllers/InscricaoController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/:idCurso', InscricaoController.inscrever);

module.exports = router;

