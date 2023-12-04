"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      // N - 1 với User
      UserRole.belongsTo(models.User, { foreignKey: "userId" });

      // N - 1 với Role
      UserRole.belongsTo(models.Role, { foreignKey: "roleId" });
    }
  }
  UserRole.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserRole",
    }
  );
  return UserRole;
};
