"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LearningStatus extends Model {
    static associate(models) {
      // N - 1 với StudentsClasses
      LearningStatus.hasMany(models.StudentsClass, { foreignKey: "statusId" });
    }
  }
  LearningStatus.init(
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
      modelName: "LearningStatus",
    }
  );
  return LearningStatus;
};
