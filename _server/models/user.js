'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id:{
      type: DataTypes.UUID,
      allownull: false,
      primarykey: true,
      defaultvalue: uuidv4(),
    }
  }, {
    username: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
