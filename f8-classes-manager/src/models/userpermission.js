"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    static associate(models) {
      // N - 1 với User
      UserPermission.belongsTo(models.User, { foreignKey: "userId" });

      // N - 1 với Permission
      UserPermission.belongsTo(models.Permission, {
        foreignKey: "permissionId",
      });
    }
  }
  UserPermission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      permissionId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserPermission",
    }
  );
  return UserPermission;
};
