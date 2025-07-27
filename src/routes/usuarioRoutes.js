const express = require('express');
const multer = require('multer');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuarioController');

// Configuração do multer para upload de arquivos (imagem, vídeo, etc.)
const upload = multer({ 
  dest: 'uploads/', // O diretório onde os arquivos serão salvos
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5 MB para upload de arquivos
  },
  fileFilter: (req, file, cb) => {
    // Permite apenas arquivos de imagem (você pode adicionar mais tipos, como vídeos)
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(file.mimetype);
    const mimetype = fileTypes.test(file.originalname.toLowerCase());

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Apenas arquivos de imagem são permitidos.'));
  }
});

// Rota de cadastro (inclui upload de foto)
router.post('/cadastro', upload.single('foto'), usuarioCtrl.cadastrar);

// Rota de login (não tem upload de arquivo)
router.post('/login', usuarioCtrl.login);

// Rota para buscar um usuário pelo ID
router.get('/:id', usuarioCtrl.buscar);

// Rota para deletar um usuário pelo ID
router.delete('/:id', usuarioCtrl.deletar);

module.exports = router;
