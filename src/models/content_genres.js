'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content_genres extends Model {
    static associate(models) {
      content_genres.hasMany(models.genres, {
        foreignKey: 'genre_id'
      })
      content_genres.belongsTo(models.contents, {
        foreignKey: 'content_id'
      })
    }
  };
  content_genres.init({
    genre_id: DataTypes.INTEGER,
    content_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    modelName: 'content_genres',
  });
  return content_genres;
};