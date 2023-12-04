"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExerciseSubmit extends Model {
    static associate(models) {
      // N - 1 với User (Student)
      ExerciseSubmit.belongsTo(models.User, { foreignKey: "studentId" });

      // N - 1 với Exercise
      ExerciseSubmit.belongsTo(models.Exercise, { foreignKey: "exerciseId" });
    }
  }
  ExerciseSubmit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      studentId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      attachment: DataTypes.STRING,
      exerciseId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "ExerciseSubmit",
    }
  );
  return ExerciseSubmit;
};
