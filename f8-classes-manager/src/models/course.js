"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // 1 - N với CourseModules
      Course.hasMany(models.CourseModule, { foreignKey: "courseId" });

      // 1 - N với Classes
      Course.hasMany(models.Class, { foreignKey: "course_id" });
    }
  }
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      teacherId: DataTypes.INTEGER,
      tryLearn: DataTypes.BOOLEAN,
      quantity: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );
  return Course;
};
