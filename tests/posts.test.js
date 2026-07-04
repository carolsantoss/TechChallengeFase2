
require('dotenv').config({ path: '.env' });
const request = require('supertest');
const app = require('../src/app');

const API = 'http://localhost:3000';

let createdId;

//integração
describe('Teste do metodos - Posts ', () => {

  test('POST /posts - cria post', async () => {
    const res = await request(API)
      .post('/posts')
      .set('access_token', 'PROFFIAP')
      .send({
        title: "Teste Jest",
        content: "Usando Jest para teste",
        author: "Jest"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');

    createdId = res.body.id;
  });


  test('GET /posts - retorna post', async () => {
    const res = await request(API).get('/posts');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

 test('GET /posts - Rota Não encontrada', async () => {
    const res = await request(API).get('/post');

    expect(res.statusCode).toBe(404);
  });

 
  test('GET /posts/:id - retorna post pelo ID', async () => {
    const res = await request(API).get(`/posts/${createdId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
  });


  test('PUT /posts/:id - atualiza post', async () => {
    const res = await request(API)
      .put(`/posts/${createdId}`)
      .set('access_token', 'PROFFIAP')
      .send({
        title: "Atualizado",
        content: "Atualizado",
        author: "Jest"
      });

    expect(res.statusCode).toBe(200);
  });


test('DELETE /posts/:id - deleta post', async () => {
  const res = await request(API)
    .delete(`/posts/${createdId}`)
    .set('access_token', 'PROFFIAP');

  expect(res.statusCode).toBe(200);
});


  test('GET /posts/:id inexistente - retorna 404', async () => {
  const res = await request(API).get('/posts/0');

  expect(res.statusCode).toBe(404);
});

});