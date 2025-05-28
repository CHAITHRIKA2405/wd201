"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    markAsCompleted() {
      this.completed = true;
      return this.save();
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATE,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );

  return Todo;
};
