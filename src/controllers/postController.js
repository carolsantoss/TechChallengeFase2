const postService = require('../services/postService');

class PostController {
  getAll = async (req, res) => {
    try {
      const { term } = req.query;
      if (term) {
        const posts = await postService.searchPosts(term);
        return res.json(posts);
      }
      
      const posts = await postService.getAllPosts();
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  getById = async (req, res) => {
    try {
      const post = await postService.getPostById(req.params.id);
      return res.json(post);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

   create = async (req, res) => {
    try {
      const newPost = await postService.createPost(req.body, req.user.id);
      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  update = async (req, res) => {
    try {
      const updatedPost = await postService.updatePost(req.params.id, req.body);
      return res.json(updatedPost);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  delete = async (req, res) => {
    try {
      await postService.deletePost(req.params.id);
      return res.json({ message: 'Postagem deletada com sucesso.' });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  
  //search
  search = async (req, res) => {
  try {
    const { term } = req.query;

    if (!term) {
      return res.status(400).json({ error: 'Palavra-chave é obrigatório' });
    }

    const posts = await postService.searchPosts(term);
    return res.json(posts);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

}

module.exports = new PostController();