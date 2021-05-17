'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class content_actors extends Model {
    static associate(models) {
      content_actors.belongsTo(models.contents, {
        foreignKey: 'content_id'
      })
      content_actors.belongsTo(models.actors, {
        foreignKey: 'actor_id'
      })
    }
  };
  content_actors.init({
    actor_id: DataTypes.INTEGER,
    content_id: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    modelName: 'content_actors',
  });
  return content_actors;
};