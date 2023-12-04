"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {
      // N - 1 với Role
      RolePermission.belongsTo(models.Role, { foreignKey: "roleId" });

      // N - 1 với Permission
      RolePermission.belongsTo(models.Permission, {
        foreignKey: "permissionId",
      });
    }
  }
  RolePermission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      permissionId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "RolePermission",
    }
  );
  return RolePermission;
};
