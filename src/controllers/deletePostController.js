const { Publicacao } = require('../models/Publicacao');

const deletePost = async (req, res) => {
  const { postId } = req.params;  // Pega o ID da publicação da URL
  const usuarioId = req.usuarioId;  // ID do usuário autenticado

  try {
    // Verifica se o ID do usuário está presente
    if (!usuarioId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Encontra a publicação pelo ID
    const publicacao = await Publicacao.findOne({ where: { id: postId } });

    if (!publicacao) {
      return res.status(404).json({ message: 'Publicação não encontrada' });
    }

    // Verifica se a publicação pertence ao usuário autenticado
    if (publicacao.usuarioId !== usuarioId) {
      return res.status(403).json({ message: 'Você não tem permissão para deletar esta publicação' });
    }

    // Deleta a publicação
    await publicacao.destroy();

    return res.status(200).json({ message: 'Publicação deletada com sucesso' });
  } catch (error) {
    console.error("Erro ao deletar publicação:", error); // Log do erro para depuração
    return res.status(500).json({ message: 'Erro ao deletar a publicação', error: error.message });
  }
};

module.exports = { deletePost };
