const router = require('express').Router();
const publicacaoController = require('../controllers/publicacaoController');
const autenticarUsuario = require('../middleware/auth'); 



router.delete('/publicacao/:id', autenticarUsuario, publicacaoController.deletarPublicacao); 

module.exports = router;