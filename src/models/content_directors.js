'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content_directors extends Model {
    static associate(models) {
      content_directors.belongsTo(models.contents, {
        foreignKey: 'content_id'
      })
      content_directors.belongsTo(models.directors, {
        foreignKey: 'director_id'
      })
    }
  };
  content_directors.init({
    director_id: DataTypes.INTEGER,
    content_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    modelName: 'content_directors',
  });
  return content_directors;
};