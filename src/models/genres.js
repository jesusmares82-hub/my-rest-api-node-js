'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genres extends Model {
    static associate(models) {
      genres.belongsTo(models.content_genres, {
        foreignKey: 'genre_id'
      });
    }
  };
  genres.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    modelName: 'genres',
  });
  return genres;
};