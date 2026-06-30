const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const sequelize = require('./config/database');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(express.json());

sequelize.sync({ alter: true })
  .then(() => console.log('Banco de dados sincronizado!'))
  .catch((err) => console.error('Erro ao sincronizar banco:', err));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.redirect('/docs');
});

app.use(postRoutes);

module.exports = app;