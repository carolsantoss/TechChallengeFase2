const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger');
const postController = require('./controllers/postController');

const app = express();
app.use(express.json());

// ==========================================
//    MUDE DE '/' PARA '/docs' (Evita conflito)
// ==========================================
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota opcional: Se alguém acessar a raiz pura '/', joga o usuário para o /docs automaticamente
app.get('/', (req, res) => {
  res.redirect('/docs');
});

// Suas rotas funcionais de posts continuam normais
app.get('/posts', postController.getAll);
app.get('/posts/:id', postController.getById);
app.post('/posts', postController.create);
app.put('/posts/:id', postController.update);
app.delete('/posts/:id', postController.delete);

module.exports = app;