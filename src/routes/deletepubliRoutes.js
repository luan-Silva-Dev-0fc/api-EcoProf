const express = require('express');
const router = express.Router();
const { deletarPubli } = require('../controllers/deletepubliController');
const authMiddleware = require('../middleware/auth');


router.delete('/:id', authMiddleware, deletarPubli);

module.exports = router;
