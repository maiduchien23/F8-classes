"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // N - M với Users qua UserRole
      Role.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: "roleId",
      });

      // N - M với Permissions qua RolePermission
      Role.belongsToMany(models.Permission, {
        through: models.RolePermission,
        foreignKey: "roleId",
      });
    }
  }
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
