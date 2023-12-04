"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LoginToken extends Model {
    static associate(models) {
      // N - 1 với User
      LoginToken.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  LoginToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "LoginToken",
    }
  );
  return LoginToken;
};
