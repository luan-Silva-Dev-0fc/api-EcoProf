const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const path = require('path')
const fs = require('fs')

exports.atualizarPerfil = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const usuario = await Usuario.findByPk(req.usuarioId)

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    if (nome) usuario.nome = nome
    if (email) usuario.email = email

    if (senha) {
      const salt = await bcrypt.genSalt(10)
      const senhaHash = await bcrypt.hash(senha, salt)
      usuario.senha = senhaHash
    }

    if (req.file) {
      if (usuario.foto && fs.existsSync(path.join('uploads', usuario.foto))) {
        fs.unlinkSync(path.join('uploads', usuario.foto))
      }
      usuario.foto = `/uploads/${req.file.filename}`
    }

    await usuario.save()

    res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      foto: usuario.foto
    })
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err)
    res.status(500).json({ erro: 'Erro ao atualizar perfil' })
  }
}
