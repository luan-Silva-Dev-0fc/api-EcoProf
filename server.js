require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const publicacaoRoutes = require('./src/routes/publicacaoRoutes');
const sequelize = require('./src/config/database');



const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/usuario', usuarioRoutes);
app.use('/publicacao', publicacaoRoutes);

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Banco sincronizado com sucesso');
  } catch (err) {
    console.error('Erro ao sincronizar o banco:', err);
  }
};

syncDatabase();

const PORT = process.env.PORT || 4028;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
