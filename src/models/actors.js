'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class actors extends Model {
    static associate(models) {
      actors.hasMany(models.content_actors, {
        foreignKey: 'actor_id'
      })
    }
  };
  actors.init({
    first_name: {
      type: DataTypes.STRING, 
      validate: {
        notEmpty: true,
        
      }
    },
    last_name: {
      type: DataTypes.STRING, 
      validate: {
        notEmpty: true,
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
    modelName: 'actors',
  });
  return actors;
};