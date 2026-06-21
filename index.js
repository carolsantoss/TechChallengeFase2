const app = require('./src/app');
const sequelize = require('./src/config/database');
const PORT = 3000;

async function startServer() {
  try {

    await sequelize.authenticate();
    console.log('✅ Conexão com o PostgreSQL estabelecida com sucesso!');

    await sequelize.sync({ alter: true });
    console.log('📊 Tabelas sincronizadas com o banco de dados.');

    app.listen(PORT, () => {
      console.log(`Servidor MVC rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

startServer();