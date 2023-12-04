"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeacherCalendar extends Model {
    static associate(models) {
      // N - 1 với User (Teacher)
      TeacherCalendar.belongsTo(models.User, { foreignKey: "teacherId" });

      // N - 1 với Class
      TeacherCalendar.belongsTo(models.Class, { foreignKey: "class_id" });
    }
  }
  TeacherCalendar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      teacherId: DataTypes.INTEGER,
      class_id: DataTypes.INTEGER,
      scheduleDate: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "TeacherCalendar",
    }
  );
  return TeacherCalendar;
};
