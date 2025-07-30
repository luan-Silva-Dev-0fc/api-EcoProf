const Usuario = require('../models/Usuario');

exports.deletarPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId);

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    await usuario.destroy();

    res.status(200).json({ mensagem: 'Perfil deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar perfil:', err);
    res.status(500).json({ erro: 'Erro ao deletar perfil' });
  }
};
