

const userRepository = require('../repositories/userRepository');

 
const roleCheck = (...perfilPermitido) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          message: 'Usuário não autenticado.',
        });
      }

      const usuario = await userRepository.findById(req.user.id);

      if (!usuario) {
        return res.status(401).json({
          message: 'Usuário não encontrado.',
        });
      }

      if (!perfilPermitido.includes(usuario.role)) {
        return res.status(403).json({
          message: 'Apenas docente podemos realizar essa ação!',
        });
      }

      req.user = usuario;

      next();
    } catch (error) {
      return res.status(500).json({
        message: 'Valide suas permissões',
      });
    }
  };
};

module.exports = roleCheck;