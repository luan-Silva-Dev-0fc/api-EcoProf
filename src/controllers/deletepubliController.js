const { Publicacao } = require('../models/Publicacao');
const Usuario = require('../models/Usuario');  

const deletarPubli = async (req, res) => {
  try {
    const publicacaoId = req.params.id;  // Pega o ID da publicação
    const usuarioId = req.usuarioId;    // Pega o ID do usuário autenticado do token

    // Verificar se o usuário existe
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Verificar se a publicação existe e se o usuário é o dono
    const publicacao = await Publicacao.findOne({
      where: { id: publicacaoId, usuarioId: usuarioId }
    });

    if (!publicacao) {
      return res.status(404).json({ error: 'Publicação não encontrada ou você não tem permissão para deletar.' });
    }

    // Deletar a publicação
    await publicacao.destroy();
    return res.status(200).json({ message: 'Publicação deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar publicação:', error);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

module.exports = { deletarPubli };
