"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      // Mối quan hệ 1-N với User
      Type.hasMany(models.User, { foreignKey: "typeId" });
    }
  }
  Type.init(
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
      modelName: "Type",
    }
  );
  return Type;
};
