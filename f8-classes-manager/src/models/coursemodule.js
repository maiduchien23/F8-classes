"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseModule extends Model {
    static associate(models) {
      // N - 1 với Course
      CourseModule.belongsTo(models.Course, { foreignKey: "courseId" });
    }
  }
  CourseModule.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      courseId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "CourseModule",
    }
  );
  return CourseModule;
};
