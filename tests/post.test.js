require('dotenv').config({ path: '.env' });
const request = require('supertest');
const app = require('../src/app');

describe('Testes de Integração - API de Posts', () => {
  it('GET /posts deve retornar status 200', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});