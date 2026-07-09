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

  async createPost(postData, userId) {
  if (!postData.title || !postData.content ) {
    throw new Error('Título e conteúdo são campos obrigatórios.');
  }

  return await postRepository.create({
    title: postData.title,
    content: postData.content,
    userId: userId,
  });
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