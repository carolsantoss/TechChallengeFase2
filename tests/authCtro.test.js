const authController = require('../src/controllers/authController');
const authService = require('../src/services/authService');

jest.mock('../src/services/authService');


test('login com sucesso', async () => {

  const req = {
    body: {
      email: 'teste@email.com',
      senha: '123456'
    }
  };

  const res = {
    json: jest.fn()
  };

  authService.login.mockResolvedValue({
    token: 'tokenmockado'
  });

  await authController.login(req, res);
  expect(authService.login)
    .toHaveBeenCalledWith(
      'teste@email.com',
      '123456'
    );

  expect(res.json)
    .toHaveBeenCalledWith({
      token: 'tokenmockado'
    });

});