const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha, confirmarSenha, genero } = req.body;
    if (!nome || !email || !senha || !confirmarSenha || !genero) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    }
    if (senha !== confirmarSenha) {
      return res.status(400).json({ erro: 'Senhas diferentes' });
    }
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ erro: 'E-mail já cadastrado' });
    }
    const foto = req.file ? `/uploads/${req.file.filename}` : null;
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      foto,
      genero
    });
    res.status(201).json({ id: novoUsuario.id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno ao cadastrar usuário' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
    }
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);
    res.json({ token, id: usuario.id });
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno ao fazer login' });
  }
};

exports.buscar = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
      attributes: ['id', 'nome', 'email', 'foto', 'genero']
    });
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno ao buscar usuário' });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }
    await usuario.destroy(); 
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ erro: 'Erro interno ao deletar usuário' });
  }
};
