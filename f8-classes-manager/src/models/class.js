"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      // N - 1 với Course
      Class.belongsTo(models.Course, { foreignKey: "course_id" });

      // N - M với Users qua StudentsClasses
      Class.belongsToMany(models.User, {
        through: models.StudentsClass,
        foreignKey: "classId",
      });

      // N - M với Teachers qua ClassesTeachers
      Class.belongsToMany(models.User, {
        through: models.ClassesTeacher,
        as: "Teachers",
        foreignKey: "class_id",
      });
    }
  }
  Class.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      schedule: DataTypes.BOOLEAN,
      timeLearn: DataTypes.STRING,
      course_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
