"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // N - 1 với Class
      Comment.belongsTo(models.Class, { foreignKey: "classId" });

      // N - 1 với User (Student)
      Comment.belongsTo(models.User, { foreignKey: "studentId" });
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      classId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      parentId: DataTypes.INTEGER,
      studentId: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
