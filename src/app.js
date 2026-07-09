const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const sequelize = require('./config/database');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.redirect('/docs');
});

app.use(postRoutes);
app.use(userRoutes);
app.use(authRoutes);
module.exports = app;


