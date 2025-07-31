const Publicacao = require('../models/Publicacao');

exports.deletarPublicacao = async (req, res) => {
  const { id } = req.params;  // Pega o id da publicação
  const usuarioId = req.usuarioId;  // Pega o ID do usuário logado

  try {
    // Verifica se a publicação existe e pertence ao usuário
    const publicacao = await Publicacao.findOne({ where: { id, usuarioId } });

    if (!publicacao) {
      console.log(`Publicação com id ${id} não encontrada ou não pertence ao usuário ${usuarioId}`);
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
