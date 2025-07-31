const Publicacao = require('../models/Publicacao');

exports.deletarPublicacao = async (req, res) => {
  const { id } = req.params;  
  const usuarioId = req.usuarioId;  

  try {
   
    const publicacao = await Publicacao.findOne({ where: { id, usuarioId } });

    if (!publicacao) {
      return res.status(404).json({ erro: 'Publicação não encontrada ou não pertence a este usuário.' });
    }

    // Deleta a publicação
    await publicacao.destroy();

    res.status(200).json({ mensagem: 'Publicação deletada com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar a publicação:', err);
    res.status(500).json({ erro: 'Erro ao deletar a publicação.' });
  }
};
