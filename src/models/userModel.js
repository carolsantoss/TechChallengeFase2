const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      msg: 'Este e-mail já está cadastrado'
    },
    validate: {
      notEmpty: {
        msg: 'O e-mail é obrigatório'
      },
      isEmail: {
        msg: 'Informe um e-mail válido'
      }
    }
  },

  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'A senha é obrigatória'
      },
    }
  },

  role: {
    type: DataTypes.ENUM('aluno', 'docente'),
    allowNull: false,
    defaultValue: 'aluno'
  }

}, {
  tableName: 'usuario',
  timestamps: true
});

module.exports = Usuario;