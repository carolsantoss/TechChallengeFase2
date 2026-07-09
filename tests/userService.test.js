const userService = require('../src/services/userService');
const userRepository = require('../src/repositories/userRepository');

jest.mock('../src/repositories/userRepository');

describe('UserService - Testes Unitários', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers - deve retornar todos os usuários', async () => {
    userRepository.findAll.mockResolvedValue([
      {
        nome: 'teste',
        email: 'teste@gmail',
        senha: '123456',
        role: 'docente'
      }
    ]);

    const result = await userService.getAllUsers();

    expect(result).toHaveLength(1);
    expect(result[0].nome).toBe('teste');
    expect(result[0].email).toBe('teste@gmail');
    expect(result[0].senha).toBe('123456');
    expect(result[0].role).toBe('docente');

    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
  });

  test('getUserById - deve retornar um usuario', async () => {
    userRepository.findById.mockResolvedValue({
      id: 1,
      nome: 'teste',
      email: 'teste@gmail',
      senha: '123456',
      role: 'docente'
    });

    const result = await userService.getUserById(1);

    expect(result.id).toBe(1);
    expect(result.nome).toBe('teste');
    expect(result.email).toBe('teste@gmail');
    expect(result.senha).toBe('123456');
    expect(result.role).toBe('docente');

    expect(userRepository.findById).toHaveBeenCalledWith(1);
  });

  test('getUserById - usuário não encontrado', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(
      userService.getUserById(999)
    ).rejects.toThrow('Usuário não encontrado.');

    expect(userRepository.findById).toHaveBeenCalledWith(999);
  });

  test('createUser - deve criar um usuario', async () => {
    userRepository.create.mockResolvedValue({
      id: 1,
      nome: 'teste novo',
      email: 'testenovo@gmail',
      senha: 'senhaCriptografada',
      role: 'docente'
    });

    const result = await userService.createUser({
      nome: 'teste novo',
      email: 'testenovo@gmail',
      senha: '123456',
      role: 'docente'
    });

    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        nome: 'teste novo',
        email: 'testenovo@gmail',
        role: 'docente',
        senha: expect.any(String)
      })
    );

    expect(result.id).toBe(1);
    expect(result.nome).toBe('teste novo');
  });

  test('updateUser - atualiza um usuario', async () => {
    userRepository.findById.mockResolvedValue({
      id: 1
    });

    userRepository.update.mockResolvedValue({
      id: 1,
      nome: 'teste atualizado',
      email: 'testenovo@gmail',
      senha: '123456',
      role: 'docente'
    });

    const result = await userService.updateUser(1, {
      nome: 'teste atualizado',
      email: 'testenovo@gmail',
      senha: '123456',
      role: 'docente'
    });

    expect(userRepository.findById).toHaveBeenCalledWith(1);

    expect(userRepository.update).toHaveBeenCalledWith(1, {
      nome: 'teste atualizado',
      email: 'testenovo@gmail',
      senha: '123456',
      role: 'docente'
    });

    expect(result.nome).toBe('teste atualizado');
  });

  test('updateUser - usuario não existe', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(
      userService.updateUser(999, { nome: 'novo' })
    ).rejects.toThrow('Usuário não encontrado.');

    expect(userRepository.update).not.toHaveBeenCalled();
  });

  test('deleteUser - exclui usuario', async () => {
    userRepository.findById.mockResolvedValue({
      id: 1
    });

    userRepository.delete.mockResolvedValue(true);

    const result = await userService.deleteUser(1);

    expect(userRepository.findById).toHaveBeenCalledWith(1);
    expect(userRepository.delete).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  test('deleteUser - erro ao excluir usuario', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(
      userService.deleteUser(50)
    ).rejects.toThrow('Usuário não encontrado.');

    expect(userRepository.delete).not.toHaveBeenCalled();
  });

});