const postService = require('../src/services/postService');
const postRepository = require('../src/repositories/postRepository');

jest.mock('../src/repositories/postRepository');

describe('PostService - Testes Unitários', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllPosts - deve retornar todos os posts', async () => {
    postRepository.findAll.mockResolvedValue([
      { id: 1, title: 'Post 1' }
    ]);

    const result = await postService.getAllPosts();

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Post 1');
    expect(postRepository.findAll).toHaveBeenCalledTimes(1);
  });

  test('getPostById - deve retornar um post', async () => {
    postRepository.findById.mockResolvedValue({
      id: 1,
      title: 'Post Teste'
    });

    const result = await postService.getPostById(1);

    expect(result.id).toBe(1);
    expect(result.title).toBe('Post Teste');
    expect(postRepository.findById).toHaveBeenCalledWith(1);
  });

  test('getPostById - deve lançar erro quando o post não existir', async () => {
    postRepository.findById.mockResolvedValue(null);

    await expect(
      postService.getPostById(999)
    ).rejects.toThrow('Postagem não encontrada.');

    expect(postRepository.findById).toHaveBeenCalledWith(999);
  });

  test('createPost - deve criar um post', async () => {
    postRepository.create.mockResolvedValue({
      id: 1,
      title: 'Novo Post',
      content: 'Conteúdo',
      userId: 1
    });

    const result = await postService.createPost(
      {
        title: 'Novo Post',
        content: 'Conteúdo'
      },
      1
    );

    expect(postRepository.create).toHaveBeenCalledWith({
      title: 'Novo Post',
      content: 'Conteúdo',
      userId: 1
    });

    expect(result.id).toBe(1);
    expect(result.title).toBe('Novo Post');
  });

  test('createPost - deve lançar erro sem título', async () => {
    await expect(
      postService.createPost(
        {
          content: 'Conteúdo'
        },
        1
      )
    ).rejects.toThrow('Título e conteúdo são campos obrigatórios.');
  });

  test('createPost - deve lançar erro sem conteúdo', async () => {
    await expect(
      postService.createPost(
        {
          title: 'Título'
        },
        1
      )
    ).rejects.toThrow('Título e conteúdo são campos obrigatórios.');
  });

  test('updatePost - deve atualizar um post', async () => {
    postRepository.findById.mockResolvedValue({
      id: 1
    });

    postRepository.update.mockResolvedValue({
      id: 1,
      title: 'Atualizado',
      content: 'Novo conteúdo'
    });

    const result = await postService.updatePost(1, {
      title: 'Atualizado',
      content: 'Novo conteúdo'
    });

    expect(postRepository.findById).toHaveBeenCalledWith(1);
    expect(postRepository.update).toHaveBeenCalledWith(1, {
      title: 'Atualizado',
      content: 'Novo conteúdo'
    });

    expect(result.title).toBe('Atualizado');
  });

  test('updatePost - deve lançar erro se o post não existir', async () => {
    postRepository.findById.mockResolvedValue(null);

    await expect(
      postService.updatePost(99, {
        title: 'Teste',
        content: 'Teste'
      })
    ).rejects.toThrow('Postagem não encontrada.');

    expect(postRepository.update).not.toHaveBeenCalled();
  });

  test('deletePost - deve remover um post', async () => {
    postRepository.findById.mockResolvedValue({
      id: 1
    });

    postRepository.delete.mockResolvedValue(true);

    const result = await postService.deletePost(1);

    expect(postRepository.findById).toHaveBeenCalledWith(1);
    expect(postRepository.delete).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
  });

  test('deletePost - deve lançar erro se o post não existir', async () => {
    postRepository.findById.mockResolvedValue(null);

    await expect(
      postService.deletePost(50)
    ).rejects.toThrow('Postagem não encontrada.');

    expect(postRepository.delete).not.toHaveBeenCalled();
  });

  test('searchPosts - deve buscar por termo', async () => {
    postRepository.search.mockResolvedValue([
      {
        id: 1,
        title: 'Node.js'
      }
    ]);

    const result = await postService.searchPosts('Node');

    expect(postRepository.search).toHaveBeenCalledWith('Node');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Node.js');
  });

  test('searchPosts - sem termo deve retornar todos os posts', async () => {
    postRepository.findAll.mockResolvedValue([
      {
        id: 1,
        title: 'Post 1'
      },
      {
        id: 2,
        title: 'Post 2'
      }
    ]);

    const result = await postService.searchPosts('');

    expect(postRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
  });

});