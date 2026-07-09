const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

class AuthService {

  async login(email, senha) {

    const usuario = await userRepository.findByEmail(email);

    if (!usuario) {
      throw new Error('Usuário ou senha inválidos');
    }


    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );


    if (!senhaValida) {
      throw new Error('Usuário ou senha inválidos');
    }


    const token = jwt.sign(
      {
        id: usuario.id,
        role: usuario.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h'
      }
    );


    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role
      }
    };
  }

}

module.exports = new AuthService();