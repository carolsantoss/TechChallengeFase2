
require('dotenv').config({ path: '.env' });
const authCheck = require('../src/auth/authCheck');

let req, res, next;

beforeEach(() => {
  req = { headers: {} };
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  next = jest.fn();
});

test('Sem token - 401', () => {
  authCheck(req, res, next);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ message: 'Token não informado.' });
  expect(next).not.toHaveBeenCalled();
});

test('Token errado - 401', () => {
  req.headers.authorization = 'Bearer TOKEN_ERRADO';
  authCheck(req, res, next);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido ou expirado.' });
  expect(next).not.toHaveBeenCalled();
});

test('Token correto - next()', () => {
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET || 'test_secret');
  req.headers.authorization = `Bearer ${token}`;
  authCheck(req, res, next);
  expect(next).toHaveBeenCalled();
});