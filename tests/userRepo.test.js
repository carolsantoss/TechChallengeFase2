
const userRepository = require('../src/repositories/userRepository');
const User = require('../src/models/userModel');

jest.mock('../src/models/userModel');

test('repository - buscar por id', async () => {
  User.findByPk.mockResolvedValue({ id: 1 });

  const result = await userRepository.findById(1);

  expect(result.id).toBe(1);
});

test('repository - busca por id inexistente', async () => {
  User.findByPk.mockResolvedValue(null);

  const result = await userRepository.findById(0);

  expect(result).toBeNull();
});

test('repository - exclui usuari', async () => {
  const destroy = jest.fn().mockResolvedValue();

  User.findByPk.mockResolvedValue({
    id: 1,
    destroy
  });

  const result = await userRepository.delete(1);

  expect(result).toBe(true);
  expect(destroy).toHaveBeenCalled();
});

test('repository - atualiza usuario', async () => {
  const userAtualizado = {
    id: 1,
    nome: 'teste novo',
    email: 'teste@gmail',
    senha: '123456',
    role: 'docente'
  };

  const update = jest.fn().mockResolvedValue(userAtualizado);

  User.findByPk.mockResolvedValue({
    id: 1,
    update
  });

  const result = await userRepository.update(1, {
    nome: 'teste novo',
    email: 'teste@gmail',
    senha: '123456',
    role: 'docente'
  });

  expect(result).toEqual(userAtualizado);
  expect(update).toHaveBeenCalledWith({
    nome: 'teste novo',
    email: 'teste@gmail',
    senha: expect.any(String),
    role: 'docente'
  });
});

test('delete - usuario inexistente', async () => {
  User.findByPk.mockResolvedValue(null);

  const result = await userRepository.delete(999);

  expect(result).toBe(false);
});


test('cria usuario', async () => {
  User.create.mockResolvedValue({
    id: 1,
    nome: 'teste',
    email: 'teste@gmail',
    senha: '123456',
    role: 'docente'
  });

  const result = await userRepository.create({
    nome: 'teste',
    email: 'teste@gmail',
    senha: expect.any(String),
    role: 'docente'
  });

  expect(result.id).toBe(1);
});

test('lista todos', async () => {
  User.findAll.mockResolvedValue([{  id: 1,
    nome: 'teste',
    email: 'teste@gmail',
    senha: '123456',
    role: 'docente' }]);

  const result = await userRepository.findAll();

  expect(result).toHaveLength(1);
});


