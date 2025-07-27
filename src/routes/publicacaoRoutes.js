const express = require('express');
const publicacaoController = require('../controllers/publicacaoController');

const router = express.Router();

// Definindo rotas
router.post('/', publicacaoController.criar);  // Rota para criar publicação
router.get('/', publicacaoController.listar);  // Rota para listar publicações
router.delete('/:id', publicacaoController.deletar);  // Rota para deletar publicação

module.exports = router;
