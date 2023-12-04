"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersColumn extends Model {
    static associate(models) {
      // N - 1 với User
      UsersColumn.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  UsersColumn.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: DataTypes.INTEGER,
      featureName: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      position: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UsersColumn",
    }
  );
  return UsersColumn;
};
