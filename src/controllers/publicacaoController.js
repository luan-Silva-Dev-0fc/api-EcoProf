const Publicacao = require('../models/Publicacao'); // Supondo que seu modelo se chame Publicacao
const { Op } = require('sequelize'); // Importando Op para fazer a consulta

// Criar Publicação (livre para texto, vídeo ou ambos)
exports.criar = async (req, res) => {
  const { texto, link, foto, video } = req.body;  // Desestruturando os dados recebidos

  try {
    // Criando a publicação no banco de dados
    const publicacao = await Publicacao.create({
      texto: texto || null,  // Se não houver texto, armazena null
      link: link || null,    // Se não houver link, armazena null
      foto: foto || null,    // Se não houver foto, armazena null
      video: video || null,  // Se não houver vídeo, armazena null
    });

    return res.status(201).json({
      message: 'Publicação criada com sucesso!',
      publicacao,
    });
  } catch (err) {
    console.error('Erro ao criar publicação:', err.message);  // Log do erro no servidor
    return res.status(500).json({
      error: 'Erro ao criar publicação.',
      details: err.message,  // Detalhes do erro
    });
  }
};

// Listar Publicações (somente publicações com conteúdo, sem listar vazias)
exports.listar = async (req, res) => {
  try {
    console.log('Buscando publicações com conteúdo...'); // Log de início da operação

    // Buscando publicações que têm conteúdo (texto ou vídeo)
    const publicacoes = await Publicacao.findAll({
      where: {
        [Op.or]: [
          { texto: { [Op.ne]: null } },  // Verifica se o texto não é nulo
          { video: { [Op.ne]: null } },   // Verifica se o vídeo não é nulo
          { foto: { [Op.ne]: null } },    // Verifica se a foto não é nula
          { link: { [Op.ne]: null } }     // Verifica se o link não é nulo
        ]
      }
    });

    console.log('Publicações encontradas:', publicacoes.length); // Log da quantidade de publicações encontradas

    // Se não houver publicações com conteúdo
    if (publicacoes.length === 0) {
      return res.status(200).json({ message: 'Crie sua primeira publicação!' });
    }

    return res.status(200).json({ publicacoes });
  } catch (err) {
    console.error('Erro ao listar publicações:', err.message); // Log do erro no servidor
    return res.status(500).json({
      error: 'Erro ao listar publicações.',
      details: err.message,  // Detalhes do erro
    });
  }
};

// Deletar Publicação
exports.deletar = async (req, res) => {
  const { id } = req.params;  // Recebe o ID da publicação a ser deletada

  try {
    // Verificando se a publicação existe
    const publicacao = await Publicacao.findByPk(id);
    if (!publicacao) {
      return res.status(404).json({ message: 'Publicação não encontrada.' });
    }

    // Deletando a publicação
    await publicacao.destroy();
    return res.status(200).json({ message: 'Publicação deletada com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar publicação:', err.message);  // Log do erro no servidor
    return res.status(500).json({
      error: 'Erro ao deletar publicação.',
      details: err.message,  // Detalhes do erro
    });
  }
};
