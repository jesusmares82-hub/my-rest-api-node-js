'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contents extends Model {
    static associate(models) {
      contents.hasMany(models.content_genres, {
        foreignKey: 'content_id'
      });
      contents.hasMany(models.content_actors, {
        foreignKey: 'content_id'
      });
      contents.hasMany(models.content_directors, {
        foreignKey: 'content_id'
      })
    }
  };
  contents.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'contents',
  });
  return contents;
};