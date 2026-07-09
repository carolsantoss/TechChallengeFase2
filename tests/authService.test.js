const authService = require('../src/services/authService');
const userRepository = require('../src/repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../src/repositories/userRepository');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

process.env.JWT_SECRET = 'test_secret';


describe('AuthService login', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('login com sucesso', async () => {

    userRepository.findByEmail.mockResolvedValue({
      id: 1,
      nome: 'João',
      email: 'teste@email.com',
      senha: 'hash',
      role: 'docente'
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('token_mock');

    const resultado = await authService.login(
      'teste@email.com',
      '123456'
    );


    expect(jwt.sign).toHaveBeenCalledWith(
      {
        id: 1,
        role: 'docente'
      },
      'test_secret',
      {
        expiresIn: '1h'
      }
    );


    expect(resultado).toEqual({
      token: 'token_mock',
      usuario: {
        id: 1,
        nome: 'João',
        email: 'teste@email.com',
        role: 'docente'
      }
    });

  });


  it('senha errada', async () => {

    userRepository.findByEmail.mockResolvedValue({
      id: 1,
      nome: 'João',
      email: 'teste@email.com',
      senha: 'senha',
      role: 'docente'
    });

    bcrypt.compare.mockResolvedValue(false);
    await expect(
      authService.login(
        'teste@email.com',
        'senhaerrada'
      )
    )
    .rejects
    .toThrow('Usuário ou senha inválidos');


    expect(jwt.sign).not.toHaveBeenCalled();

  });

});