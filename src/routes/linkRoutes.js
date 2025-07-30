const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');
const autenticar = require('../middleware/auth');  // Importando o middleware de autenticação

router.post('/', autenticar, linkController.criarLink);
router.get('/', linkController.listarLinks);
router.delete('/:id', autenticar, linkController.deletarLink);

module.exports = router;
