const express = require('express');
const router = express.Router();
const { deletarPublicacao } = require('../controllers/postController'); // Usando o novo nome do controller
const authMiddleware = require('../middleware/auth');  // Middleware de autenticação

// Rota para deletar publicação
router.delete('/:postId', authMiddleware, deletarPublicacao);

module.exports = router;
// APROVADO