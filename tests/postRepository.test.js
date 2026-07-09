
const postRepository = require('../src/repositories/postRepository');
const Post = require('../src/models/postModel');

jest.mock('../src/models/postModel');

test('repository - buscar por id', async () => {
  Post.findByPk.mockResolvedValue({ id: 1 });

  const result = await postRepository.findById(1);

  expect(result.id).toBe(1);
});

test('repository - busca por id inexistente', async () => {
  Post.findByPk.mockResolvedValue(null);

  const result = await postRepository.findById(0);

  expect(result).toBeNull();
});

test('repository - exclui post existente', async () => {
  const destroy = jest.fn().mockResolvedValue();

  Post.findByPk.mockResolvedValue({
    id: 1,
    destroy
  });

  const result = await postRepository.delete(1);

  expect(result).toBe(true);
  expect(destroy).toHaveBeenCalled();
});

test('repository - atualiza post existente', async () => {
  const postAtualizado = {
    id: 1,
    title: 'Novo título'
  };

  const update = jest.fn().mockResolvedValue(postAtualizado);

  Post.findByPk.mockResolvedValue({
    id: 1,
    update
  });

  const result = await postRepository.update(1, {
    title: 'Novo título'
  });

  expect(result).toEqual(postAtualizado);
  expect(update).toHaveBeenCalledWith({
    title: 'Novo título'
  });
});

test('delete - post inexistente', async () => {
  Post.findByPk.mockResolvedValue(null);

  const result = await postRepository.delete(999);

  expect(result).toBe(false);
});

test('atualiza - post inexistente', async () => {
  Post.findByPk.mockResolvedValue(null);

  const result = await postRepository.update(999, {
    title: 'qualquer'
  });

  expect(result).toBeNull();
});

test('cria post', async () => {
  Post.create.mockResolvedValue({
    id: 1,
    title: 'FASE 2',
    author: 'PROF GUSTAVO'
  });

  const result = await postRepository.create({
    title: 'FASE 2',
    author: 'PROF GUSTAVO'
  });

  expect(result.id).toBe(1);
});

test('lista todos', async () => {
  Post.findAll.mockResolvedValue([{ id: 1, title: 'Post 1' }]);

  const result = await postRepository.findAll();

  expect(result).toHaveLength(1);
});


test('procurar posts', async () => {
  Post.findAll.mockResolvedValue([{ id: 1, title: 'Post teste' }]);

  const result = await postRepository.search('Post teste');

  expect(Post.findAll).toHaveBeenCalled();
  expect(result).toHaveLength(1);
});