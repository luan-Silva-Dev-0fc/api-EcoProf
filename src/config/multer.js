const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Usuario = require('../models/Usuario');
const Publicacao = require('../models/Publicacao');

// Configuração de armazenamento do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

// Configuração do Multer para uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|avi/;
    const isValidType = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const isValidMimeType = allowedTypes.test(file.mimetype);
    if (isValidMimeType && isValidType) {
      return cb(null, true);
    } else {
      return cb(new Error('Apenas imagens e vídeos são permitidos.'));
    }
  }
});

// Endpoint para atualizar a foto do usuário
exports.atualizarFotoUsuario = [
  upload.single('foto'),
  async (req, res) => {
    try {
      const usuarioId = req.usuarioId;
      const fotoUrl = req.file ? `/uploads/${req.file.filename}` : '';

      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      usuario.foto = fotoUrl;
      await usuario.save();

      res.status(200).json(usuario);
    } catch (err) {
      console.error('Erro ao atualizar foto do usuário:', err);
      res.status(500).json({ erro: 'Erro ao atualizar foto do usuário' });
    }
  }
];

// Endpoint para criar uma nova publicação
exports.criarPublicacao = [
  upload.single('arquivo'),
  async (req, res) => {
    try {
      const { conteudo, tipo } = req.body;
      const usuarioId = req.usuarioId;

      let arquivoUrl = '';

      if (tipo === 'video') {
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
        if (youtubeRegex.test(conteudo)) {
          arquivoUrl = conteudo;
        } else if (req.file) {
          arquivoUrl = `/uploads/${req.file.filename}`;
        } else {
          return res.status(400).json({ erro: 'Nenhum vídeo fornecido.' });
        }
      } else {
        arquivoUrl = req.file ? `/uploads/${req.file.filename}` : '';
      }

      const novaPublicacao = await Publicacao.create({
        conteudo,
        tipo,
        arquivoUrl,
        usuarioId
      });

      res.status(201).json(novaPublicacao);
    } catch (err) {
      console.error('Erro ao criar publicação:', err);
      res.status(500).json({ erro: 'Erro ao criar publicação' });
    }
  }
];
