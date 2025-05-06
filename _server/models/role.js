'use strict';
const {
  Model,
  UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  role.init({
    id:{
      type: DataTypes.UUID,
      allownull: false,
      primarykey: true,
      defaultvalue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};