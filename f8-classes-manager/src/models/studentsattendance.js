"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudentsAttendance extends Model {
    static associate(models) {
      // N - 1 với Class
      StudentsAttendance.belongsTo(models.Class, { foreignKey: "classId" });

      // N - 1 với User (Student)
      StudentsAttendance.belongsTo(models.User, { foreignKey: "studentId" });
    }
  }
  StudentsAttendance.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dateLearning: DataTypes.DATE,
      statusId: DataTypes.INTEGER,
      classId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      studentId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "StudentsAttendance",
    }
  );
  return StudentsAttendance;
};
