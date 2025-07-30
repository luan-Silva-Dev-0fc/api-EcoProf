const Usuario = require('../models/Usuario');

exports.getPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId, {
      attributes: ['nome', 'foto']
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (err) {
    console.error('Erro ao buscar perfil:', err);
    res.status(500).json({ erro: 'Erro ao buscar perfil' });
  }
};
