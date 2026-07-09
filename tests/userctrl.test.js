const userController = require('../src/controllers/userController');
const userService = require('../src/services/userService');

jest.mock('../src/services/userService');

describe('UserController - unitario', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
      user: { id: 1 } ///// simula usuário autenticado
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });


  test('Criar user', async () => {
    req.body = {
      nome: 'teste',
      email: 'teste@gmail.com',
      senha: '123456',
      role: 'docente'
    };

    userService.createUser.mockResolvedValue({ id: 1 });

    await userController.create(req, res);

    expect(userService.createUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });


  test('GET /:id sucesso', async () => {
    req.params = { id: 1 };

    userService.getUserById.mockResolvedValue({ id: 1 });

    await userController.getById(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });

  test('GET /:id inexistente - 404', async () => {
    req.params = { id: 1 };

    userService.getUserById.mockRejectedValue(new Error('not found'));

    await userController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'not found' });
  });

  test('UPDATE sucesso', async () => {
    req.params = { id: 1 };
    req.body = {
      nome: 'tese novo',
      email: 'testenovo@gmail',
      senha: '123456',
      role: 'docente'
    };

    userService.updateUser.mockResolvedValue({
      id: 1,
      nome: 'tese novo',
      email: 'testenovo@gmail',
      senha: '123456',
      role: 'docente'
    });

    await userController.update(req, res);

    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      nome: 'tese novo',
      email: 'testenovo@gmail',
      senha: '123456',
      role: 'docente'
    });
  });


  test('UPDATE inexistente - 404', async () => {
    req.params = { id: 1 };
    req.body = { email: 'novo' };

    userService.updateUser.mockRejectedValue(new Error('not found'));

    await userController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'not found'
    });
  });

  test('DELETE sucesso', async () => {
    req.params = { id: 1 };

    userService.deleteUser.mockResolvedValue();

    await userController.delete(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario deletado com sucesso.'
    });
  });


});