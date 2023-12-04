"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentsClass extends Model {
    static associate(models) {
      // N - 1 với User (Student)
      StudentsClass.belongsTo(models.User, { foreignKey: "studentId" });

      // N - 1 với Class
      StudentsClass.belongsTo(models.Class, { foreignKey: "classId" });

      // N - 1 với LearningStatus
      StudentsClass.belongsTo(models.LearningStatus, {
        foreignKey: "statusId",
      });
    }
  }
  StudentsClass.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      studentId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
      completedDate: DataTypes.DATE,
      dropDate: DataTypes.DATE,
      recover: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "StudentsClass",
    }
  );
  return StudentsClass;
};
