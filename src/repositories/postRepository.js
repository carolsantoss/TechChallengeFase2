const { Op } = require('sequelize');
const Post = require('../models/postModel');

class PostRepository {
  async findAll() {
    return await Post.findAll({
      include: [{ association: 'autor', attributes: ['nome'] }],
    });
  }

  async findById(id) {
    return await Post.findByPk(id, {
      include: [{ association: 'autor', attributes: ['nome'] }],
    });
  }

  async create(postData) {
    return await Post.create(postData);
  }

  async update(id, updatedData) {
    const post = await Post.findByPk(id);
    if (!post) return null;

    return await post.update(updatedData);
  }

  async delete(id) {
    const post = await Post.findByPk(id);
    if (!post) return false;

    await post.destroy();
    return true;
  }

  async search(term) {
    return await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${term}%` } },   
          { content: { [Op.iLike]: `%${term}%` } }
        ]
      },
      include: [{ association: 'autor', attributes: ['id', 'nome', 'email', 'role'] }],
    });
  }
}

module.exports = new PostRepository();