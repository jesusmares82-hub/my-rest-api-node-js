'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      
    }
  };
  users.init({
    first_name: {
      type: DataTypes.STRING, 
      validate: {
        len: [0, 50],
        allowNull:false,
        notEmpty: true,
        isAlpha: true,
      }
    },
    last_name: {
      type: DataTypes.STRING, 
      validate: {
        len: [0, 50],
        allowNull:false,
        notEmpty: true,
        isAlpha: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    reset_token: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    modelName: 'users',
  });
  return users;
};