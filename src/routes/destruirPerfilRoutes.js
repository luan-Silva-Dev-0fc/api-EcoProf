const express = require('express');
const router = express.Router();
const controller = require('../controllers/destruirPerfilController'); 
const autenticarUsuario = require('../middleware/auth');

router.delete('/', autenticarUsuario, controller.deletarPerfil); 

module.exports = router;
