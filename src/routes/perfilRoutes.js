const express = require('express');
const router = express.Router();
const controller = require('../controllers/perfilController');
const autenticarUsuario = require('../middleware/auth');

router.get('/', autenticarUsuario, controller.getPerfil);

module.exports = router;
