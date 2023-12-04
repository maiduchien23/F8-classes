"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClassesTeacher extends Model {
    static associate(models) {
      // N - 1 với User (Teacher)
      ClassesTeacher.belongsTo(models.User, { foreignKey: "teacherId" });

      // N - 1 với Class
      ClassesTeacher.belongsTo(models.Class, { foreignKey: "class_id" });
    }
  }
  ClassesTeacher.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      teacherId: DataTypes.INTEGER,
      class_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ClassesTeacher",
    }
  );
  return ClassesTeacher;
};
