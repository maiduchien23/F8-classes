"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserSocial extends Model {
    static associate(models) {
      // N - 1 với User
      UserSocial.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  UserSocial.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: DataTypes.INTEGER,
      provider: DataTypes.STRING,
      providerId: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserSocial",
    }
  );
  return UserSocial;
};
