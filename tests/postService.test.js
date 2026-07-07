const postService = require('../src/services/postService');
const postRepository = require('../src/repositories/postRepository');
require('dotenv').config({ path: '.env' });
const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/repositories/postRepository');

test('todos os posts', async () => {
  postRepository.findAll.mockResolvedValue([
    { id: 1, title: 'Teste' }
  ]);

  const result = await postService.getAllPosts();

  expect(result).toHaveLength(1);
  expect(postRepository.findAll).toHaveBeenCalled();
});

test('Get/id Inexistente', async () => {
  postRepository.findById = jest.fn().mockResolvedValue(null);

  await expect(postService.getPostById(1))
    .rejects
    .toThrow('Postagem não encontrada.');
});

test('Metodo PUT - Faltando dados', async () => {
  await expect(postService.createPost({}))
    .rejects
    .toThrow('Título, conteúdo e autor são campos obrigatórios.');
});


test('Método POST - cria um post', async () => {
  postRepository.create.mockResolvedValue({
    id: 2,
    title: 'Aula Inicial Post',
    content: 'Teste',
    author: 'Prof Gustavo'
  });

  const result = await postService.createPost({
    title: 'Aula Inicial Post',
    content: 'Teste',
    author: 'Prof Gustavo'
  });

  expect(result.id).toBe(2);
  expect(result.title).toBe('Aula Inicial Post');
});

test('Método PUT - Atualiza post', async () => {
  postRepository.findById.mockResolvedValue({
    id: 1
  });

  postRepository.update.mockResolvedValue({
    id: 1,
    title: 'Aula Inicial Post - atualizado',
    content: 'Teste',
    author: 'Prof Gustavo'
  });

  const result = await postService.updatePost(1, {
    title: 'Aula Inicial Post - atualizado',
    content: 'Teste',
    author: 'Prof Gustavo'
  });

  expect(result.id).toBe(1);
  expect(result.title).toBe('Aula Inicial Post - atualizado');
  expect(result.content).toBe('Teste');
  expect(result.author).toBe('Prof Gustavo');
});

test('Método DELETE - post inexistente', async () => {
  postRepository.findById.mockResolvedValue(null);

  await expect(postService.deletePost(999))
    .rejects
    .toThrow('Postagem não encontrada.');
});


test('Método DELETE - post existente', async () => {
  postRepository.findById.mockResolvedValue({ id: 1 });

  postRepository.delete.mockResolvedValue(true);

  const result = await postService.deletePost(1);

  expect(result).toBe(true);
});


test('Método PUT - Atualiza post que não existe', async () => {
  postRepository.findById.mockResolvedValue(null);

  await expect(
    postService.updatePost(1, {
      title: 'título',
      content: 'Texto',
      author: 'Professor'
    })
  ).rejects.toThrow('Postagem não encontrada.');
});


test('Search - com palavra-chave', async () => {
  postRepository.search = jest.fn().mockResolvedValue([
    { id: 1, title: 'Prova de Matemática' }
  ]);

  const result = await postService.searchPosts('Prova');

  expect(result).toHaveLength(1);
  expect(postRepository.search).toHaveBeenCalledWith('Prova');
});


