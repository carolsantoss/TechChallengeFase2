const userService = require('../services/userService');

class UserController {

  getAll = async (req, res) => {
    try {
      const usuarios = await userService.getAllUsers();
      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


  getById = async (req, res) => {
    try {
      const usuario = await userService.getUserById(req.params.id);
      return res.json(usuario);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };


  create = async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };


  update = async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(
        req.params.id,
        req.body
      );

      return res.json(updatedUser);

    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };


  delete = async (req, res) => {
    try {
      await userService.deleteUser(req.params.id);

      return res.json({
        message: 'Usuario deletado com sucesso.'
      });

    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  };

}

module.exports = new UserController();