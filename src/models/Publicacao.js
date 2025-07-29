const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Publicacao = sequelize.define('Publicacao', {
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING // 'texto', 'foto', 'video'
  },
  arquivoUrl: {
    type: DataTypes.STRING
  }
});

Usuario.hasMany(Publicacao, { foreignKey: 'usuarioId' });
Publicacao.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Publicacao;
