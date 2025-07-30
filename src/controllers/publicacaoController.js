const multer = require('multer');
const path = require('path');
const Publicacao = require('../models/Publicacao');
const Usuario = require('../models/Usuario');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

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

      const nova = await Publicacao.create({
        conteudo,
        tipo,
        arquivoUrl,
        usuarioId
      });

      res.status(201).json(nova);
    } catch (err) {
      console.error('Erro ao criar publicação:', err);
      res.status(500).json({ erro: 'Erro ao criar publicação' });
    }
  }
];

exports.listarPublicacoes = async (req, res) => {
  try {
    const publicacoes = await Publicacao.findAll({
      include: {
        model: Usuario,
        attributes: ['nome', 'foto']
      },
      order: [['createdAt', 'DESC']]
    });

    res.json(publicacoes);
  } catch (err) {
    console.error('Erro ao listar publicações:', err);
    res.status(500).json({ erro: 'Erro ao buscar publicações' });
  }
};
