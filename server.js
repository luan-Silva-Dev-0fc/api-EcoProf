require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const publicacaoRoutes = require('./src/routes/publicacaoRoutes');
const perfilRoutes = require('./src/routes/perfilRoutes');
const destruirPerfilRoutes = require('./src/routes/destruirPerfilRoutes');
const atualizarPerfilRoutes = require('./src/routes/atualizarPerfilRoutes');
const linkRoutes = require('./src/routes/linkRoutes');
const deletePostRoutes = require('./src/routes/deletePostRoutes');

const sequelize = require('./src/config/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/usuario', usuarioRoutes);
app.use('/publicacao', publicacaoRoutes);
app.use('/perfil', perfilRoutes); 
app.use('/destruir-perfil', destruirPerfilRoutes);
app.use('/atualizar-perfil', atualizarPerfilRoutes);
app.use('/link', linkRoutes);
app.use('/deletar-post', deletePostRoutes);


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
