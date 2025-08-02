const { Publicacao } = require('../models/Publicacao');

exports.deletarPublicacao = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const postId = req.params.postId;

    const publicacao = await Publicacao.findOne({
      where: {
        id: postId,
        usuarioId: usuarioId
      }
    });

    if (!publicacao) {
      return res.status(404).json({ erro: 'Publicação não encontrada ou não pertence a você' });
    }

    await publicacao.destroy();

    res.status(200).json({ mensagem: 'Publicação deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar publicação:', err);
    res.status(500).json({ erro: 'Erro ao deletar publicação' });
  }
};
