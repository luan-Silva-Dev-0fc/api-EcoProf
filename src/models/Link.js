const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Link = sequelize.define('Link', {
  arquivoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'links',
});

Usuario.hasMany(Link, { foreignKey: 'usuarioId' });
Link.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Link;
