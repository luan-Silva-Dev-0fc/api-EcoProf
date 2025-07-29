const express = require('express');
const router = express.Router();
const controller = require('../controllers/publicacaoController');

router.post('/', controller.criarPublicacao);
router.get('/', controller.listarPublicacoes);

module.exports = router;
