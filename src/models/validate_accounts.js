'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class validate_accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  validate_accounts.init({
    hash: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    modelName: 'validate_accounts',
  });
  return validate_accounts;
};