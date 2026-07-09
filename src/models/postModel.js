const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./userModel');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255), 
    allowNull: false,
    validate: {
      notEmpty: true
    }
    
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
 
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'posts',
  timestamps: true
});

////// Um post pertence a um usuário 
Post.belongsTo(Usuario, {
  foreignKey: 'userId',
  as: 'autor'
});

///// Um usuário pode ter vários posts
Usuario.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts'
});

module.exports = Post;