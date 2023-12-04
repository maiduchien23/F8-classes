"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      // N - M với Roles qua RolePermission
      Permission.belongsToMany(models.Role, {
        through: models.RolePermission,
        foreignKey: "permissionId",
      });

      // N - M với Users qua UserPermission
      Permission.belongsToMany(models.User, {
        through: models.UserPermission,
        foreignKey: "permissionId",
      });
    }
  }
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      values: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Permission",
    }
  );
  return Permission;
};
