const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

class UserService {
  async getAllUsers() {
    return await userRepository.findAll();
  }

  async getUserById(id) {
    const usuario = await userRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado.');
    }
    return usuario;
  }

  async createUser(userData) {
    if (!userData.nome || !userData.email || !userData.senha) {
      throw new Error('Informe os campos: nome, email e senha.');
    }

    const senhaHash = await bcrypt.hash(userData.senha, 10);

    const usuario = await userRepository.create({
      nome: userData.nome,
      email: userData.email,
      senha: senhaHash,
      role: userData.role || 'aluno'
    });

    const { senha, ...usuarioSemSenha } = usuario.toJSON ? usuario.toJSON() : usuario;
    return usuarioSemSenha;
  }

  async updateUser(id, updatedData) {
    await this.getUserById(id); // Garante que existe

    const usuario = await userRepository.update(id, updatedData);
    const { senha, ...usuarioSemSenha } = usuario.toJSON ? usuario.toJSON() : usuario;
    return usuarioSemSenha;
  }

  async deleteUser(id) {
    await this.getUserById(id); // Garante que existe
    return await userRepository.delete(id);
  }

}

module.exports = new UserService();