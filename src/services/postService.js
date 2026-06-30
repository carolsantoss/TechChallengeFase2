const postRepository = require('../repositories/postRepository');

class PostService {
  async getAllPosts() {
    return await postRepository.findAll();
  }

  async getPostById(id) {
    const post = await postRepository.findById(id);
    if (!post) {
      throw new Error('Postagem não encontrada.');
    }
    return post;
  }

  async createPost(postData) {
    if (!postData.title || !postData.content || !postData.author) {
      throw new Error('Título, conteúdo e autor são campos obrigatórios.');
    }
    return await postRepository.create(postData);
  }

  async updatePost(id, updatedData) {
    await this.getPostById(id); // Garante que existe
    return await postRepository.update(id, updatedData);
  }

  async deletePost(id) {
    await this.getPostById(id); // Garante que existe
    return await postRepository.delete(id);
  }

  async searchPosts(term) {
    if (!term) {
      return await postRepository.findAll();
    }
    return await postRepository.search(term);
  }
}

module.exports = new PostService();