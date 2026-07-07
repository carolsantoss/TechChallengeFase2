
require('dotenv').config({ path: '.env' });
const request = require('supertest');
const app = require('../src/app');
const authCheck = require('../src/auth/authCheck');

describe('Teste de validação dos tokens', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { headers: {} };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

  test('Sem token - 401', () => {
    authCheck(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Acesso negado!' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Token errado - 401', () => {
    req.headers['access_token'] = 'TOKEN_ERRADO';

    authCheck(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token incorreto' });
    expect(next).not.toHaveBeenCalled();
  });

  test('Token correto - next()', () => {
    req.headers.authorization = 'PROFFIAP';

    authCheck(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});