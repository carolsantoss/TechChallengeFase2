const Usuario = require('../models/userModel');

class UserRepository {

  async findAll() {
    return await Usuario.findAll();
  }

  async findById(id) {
    return await Usuario.findByPk(id);
  }


  async findByEmail(email) {
    return await Usuario.findOne({
      where: {
        email
      }
    });
  }


  async create(usuarioData) {
    return await Usuario.create(usuarioData);
  }


  async update(id, updatedData) {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return null;
    }

    return await usuario.update(updatedData);
  }


  async delete(id) {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return false;
    }

    await usuario.destroy();

    return true;
  }

  async existsByEmail(email) {
    const usuario = await Usuario.findOne({
      where: {
        email
      }
    });

    return !!usuario;
  }

}

module.exports = new UserRepository();