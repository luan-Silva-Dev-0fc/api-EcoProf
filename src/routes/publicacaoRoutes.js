const express = require('express');
const router = express.Router();
const controller = require('../controllers/publicacaoController');
const autenticarUsuario = require('../middleware/auth'); 

router.post('/', autenticarUsuario, controller.criarPublicacao);
router.get('/', controller.listarPublicacoes);

module.exports = router;
