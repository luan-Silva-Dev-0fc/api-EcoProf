const express = require('express');
const router = express.Router();
const { deletarPublicacao } = require('../controllers/deletarPublicacaoController');
const authMiddleware = require('../middleware/auth');  // Middleware de autenticação

// Rota para deletar publicação
router.delete('/:postId', authMiddleware, deletarPublicacao);

module.exports = router;
