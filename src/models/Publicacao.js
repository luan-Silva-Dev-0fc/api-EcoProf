module.exports = (sequelize, DataTypes) => {
  const Publicacao = sequelize.define('Publicacao', {
    texto: {
      type: DataTypes.STRING,
      allowNull: true, // Pode ser nulo
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true, // Pode ser nulo
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true, // Pode ser nulo
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true, // Pode ser nulo
    }
  });

  return Publicacao;
};
