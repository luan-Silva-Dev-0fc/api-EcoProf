const multer = require('multer');
const path = require('path');
const Publicacao = require('../models/Publicacao');
const Usuario = require('../models/Usuario');

// Configuração do Multer para upload de imagens e vídeos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pasta para armazenar os arquivos
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Nome do arquivo será baseado no timestamp
  },
});

const upload = multer({ storage: storage });

exports.criarPublicacao = [
  upload.single('arquivo'), // Aceitar 1 arquivo (foto ou vídeo)
  async (req, res) => {
    try {
      const { conteudo, tipo, usuarioId } = req.body;

      // Verificar se o tipo é "video" e se o arquivo é do YouTube
      let arquivoUrl = '';
      if (tipo === 'video') {
        const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
        if (!youtubeRegex.test(conteudo)) {
          return res.status(400).json({ erro: 'Somente vídeos do YouTube são permitidos.' });
        }
        arquivoUrl = conteudo; // Armazenar o link do vídeo
      } else {
        arquivoUrl = req.file ? `/uploads/${req.file.filename}` : ''; // Se não for vídeo, usar o caminho do arquivo
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
