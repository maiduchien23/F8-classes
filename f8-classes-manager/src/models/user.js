"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // 1 - 1 với UserOTP
      User.hasOne(models.UserOtp, { foreignKey: "userId" });

      // 1 - N với LoginTokens
      User.hasMany(models.LoginToken, { foreignKey: "userId" });

      // 1 - N với UserSocials
      User.hasMany(models.UserSocial, { foreignKey: "userId" });

      // N - M với Roles qua UserRole
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: "userId",
      });

      // N - M với Permissions qua UserPermission
      User.belongsToMany(models.Permission, {
        through: models.UserPermission,
        foreignKey: "userId",
      });

      // N - M với Classes qua StudentsClasses
      User.belongsToMany(models.Class, {
        through: models.StudentsClass,
        foreignKey: "studentId",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
      firstLogin: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
