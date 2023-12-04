"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserOtp extends Model {
    static associate(models) {
      // 1 - 1 với User
      UserOtp.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  UserOtp.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      otp: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      expires: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserOtp",
    }
  );
  return UserOtp;
};
