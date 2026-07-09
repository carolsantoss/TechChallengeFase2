require('dotenv').config({ path: '.env' });
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const postService = require('../src/services/postService');
const userRepository = require('../src/repositories/userRepository');

jest.mock('../src/services/postService');
jest.mock('../src/repositories/userRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
const token = jwt.sign({ id: 1, email: 'jest@teste.com' }, JWT_SECRET);

describe('Teste dos métodos - Posts (integração - dados mockados)', () => {

  beforeEach(() => {
    // usuário que o roleCheck vai "encontrar" no banco (mockado)
    userRepository.findById.mockResolvedValue({
      id: 1,
      email: 'jest@teste.com',
      role: 'docente'
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /posts - cria post', async () => {
    postService.createPost.mockResolvedValue({
      id: 1,
      title: 'Teste Jest',
      content: 'Usando Jest para teste',
      author: 'Jest'
    });

    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Teste Jest',
        content: 'Usando Jest para teste',
        author: 'Jest'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  test('POST /posts - sem token - 401', async () => {
    const res = await request(app)
      .post('/posts')
      .send({ title: 'Sem auth' });

    expect(res.statusCode).toBe(401);
    expect(postService.createPost).not.toHaveBeenCalled();
  });

  test('GET /posts - retorna lista de posts', async () => {
    postService.getAllPosts.mockResolvedValue([{ id: 1, title: 'Post 1' }]);

    const res = await request(app).get('/posts');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /post (rota inexistente) - 404', async () => {
    const res = await request(app).get('/post');

    expect(res.statusCode).toBe(404);
  });

  test('GET /posts/:id - retorna post pelo ID', async () => {
    postService.getPostById.mockResolvedValue({ id: 1, title: 'Post 1' });

    const res = await request(app).get('/posts/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  test('GET /posts/:id inexistente - 404', async () => {
    postService.getPostById.mockRejectedValue(new Error('not found'));

    const res = await request(app).get('/posts/0');

    expect(res.statusCode).toBe(404);
  });

  test('PUT /posts/:id - atualiza post', async () => {
    postService.updatePost.mockResolvedValue({
      id: 1,
      title: 'Atualizado',
      content: 'Atualizado',
      author: 'Jest'
    });

    const res = await request(app)
      .put('/posts/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Atualizado',
        content: 'Atualizado',
        author: 'Jest'
      });

    expect(res.statusCode).toBe(200);
  });

  test('DELETE /posts/:id - deleta post', async () => {
    postService.deletePost.mockResolvedValue();

    const res = await request(app)
      .delete('/posts/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});