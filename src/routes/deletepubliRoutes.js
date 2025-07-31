const express = require('express');
const router = express.Router();
const { deletarPublicacao } = require('../controllers/publicacaoController');
const authMiddleware = require('../middleware/auth'); 


router.delete('/:id', authMiddleware, deletarPublicacao); 

module.exports = router;
