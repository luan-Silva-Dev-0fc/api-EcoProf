const Publicacao = require('../models/Publicacao'); // Garanta que o caminho para o modelo está correto

exports.deletarPublicacao = async (req, res) => {
  try {
    // Busca a publicação verificando se o ID da publicação e o ID do usuário logado (req.usuarioId)
    // correspondem, garantindo que apenas o dono da publicação possa deletá-la.
    const publicacao = await Publicacao.findOne({
      where: {
        id: req.params.id,       // ID da publicação vindo da URL
        usuarioId: req.usuarioId // ID do usuário autenticado via JWT
      }
    });

    // Se a publicação não for encontrada (ou não pertencer ao usuário logado), retorna 404
    if (!publicacao) {
      return res.status(404).json({ erro: 'Publicação não encontrada ou você não tem permissão para deletá-la.' });
    }

    // Se a publicação for encontrada e pertencer ao usuário, ela é destruída
    await publicacao.destroy();

    // Retorna uma mensagem de sucesso
    res.status(200).json({ mensagem: 'Publicação deletada com sucesso.' });

  } catch (err) {
    // Loga o erro detalhadamente para depuração
    console.error('Erro ao deletar publicação:', err);
    // Retorna um erro interno do servidor
    res.status(500).json({ erro: 'Erro interno do servidor ao tentar deletar a publicação.' });
  }
};