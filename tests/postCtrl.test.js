const postController = require('../src/controllers/postController');
const postService = require('../src/services/postService');

jest.mock('../src/services/postService');

describe('PostController - unitario', () => {
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


  test('Criar post', async () => {
    req.body = { title: 'teste' };

    postService.createPost.mockResolvedValue({ id: 1 });

    await postController.create(req, res);

    expect(postService.createPost).toHaveBeenCalledWith(req.body, req.user.id);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });

  test('Criar post - erro do service - 400', async () => {
    req.body = { title: 'teste' };

    postService.createPost.mockRejectedValue(new Error('dados inválidos'));

    await postController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'dados inválidos' });
  });


  test('GET /:id sucesso', async () => {
    req.params = { id: 1 };

    postService.getPostById.mockResolvedValue({ id: 1 });

    await postController.getById(req, res);

    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });

  // GET BY ID (erro)
  test('GET /:id inexistente - 404', async () => {
    req.params = { id: 1 };

    postService.getPostById.mockRejectedValue(new Error('not found'));

    await postController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'not found' });
  });

  test('UPDATE sucesso', async () => {
    req.params = { id: 1 };
    req.body = { title: 'novo' };

    postService.updatePost.mockResolvedValue({
      id: 1,
      title: 'novo'
    });

    await postController.update(req, res);

    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      title: 'novo'
    });
  });


  test('UPDATE inexistente - 404', async () => {
    req.params = { id: 1 };
    req.body = { title: 'novo' };

    postService.updatePost.mockRejectedValue(new Error('not found'));

    await postController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'not found'
    });
  });

  test('DELETE sucesso', async () => {
    req.params = { id: 1 };

    postService.deletePost.mockResolvedValue();

    await postController.delete(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'Postagem deletada com sucesso.'
    });
  });

  test('DELETE inexistente - 404', async () => {
    req.params = { id: 1 };

    postService.deletePost.mockRejectedValue(new Error('not found'));

    await postController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'not found'
    });
  });

  test('SEARCH sem term - 400', async () => {
    req.query = {};

    await postController.search(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Palavra-chave é obrigatório'
    });
  });

  test('SEARCH com term', async () => {
    req.query = { term: 'teste' };

    postService.searchPosts.mockResolvedValue([{ id: 1 }]);

    await postController.search(req, res);

    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

});