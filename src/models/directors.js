'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class directors extends Model {
    static associate(models) {
      directors.hasMany(models.content_directors, {
        foreignKey: 'director_id'
      })
    }
  };
  directors.init({
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
    dob: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      }
     },
    biography: DataTypes.TEXT,
    profile_photo: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    modelName: 'directors',
  });
  return directors;
};