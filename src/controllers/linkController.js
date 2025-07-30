const Link = require('../models/Link');
const Usuario = require('../models/Usuario');

exports.criarLink = async (req, res) => {
  try {
    const { arquivoUrl } = req.body;
    const usuarioId = req.usuarioId;

    // Aceitar qualquer link de vídeo do YouTube
    if (!arquivoUrl || !arquivoUrl.match(/youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\//)) {
      return res.status(400).json({ mensagem: 'Somente links de vídeos do YouTube são permitidos.' });
    }

    const link = await Link.create({ arquivoUrl, usuarioId });
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao criar link' });
  }
};

exports.listarLinks = async (req, res) => {
  try {
    const links = await Link.findAll({
      include: {
        model: Usuario,
        attributes: ['nome', 'foto'],
      },
      order: [['createdAt', 'DESC']],
    });

    res.json(links);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar links' });
  }
};

exports.deletarLink = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;

    const link = await Link.findOne({ where: { id, usuarioId } });

    if (!link) {
      return res.status(404).json({ mensagem: 'Link não encontrado' });
    }

    await link.destroy();
    res.json({ mensagem: 'Link deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao deletar link' });
  }
};
