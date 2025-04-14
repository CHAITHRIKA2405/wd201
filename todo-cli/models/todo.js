"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo-list\n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      overdueItems.forEach((todo) => console.log(todo.displayableString()));
      console.log("\n");

      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      dueTodayItems.forEach((todo) => console.log(todo.displayableString()));
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      dueLaterItems.forEach((todo) => console.log(todo.displayableString()));
      console.log("\n");
    }

    static async overdue() {
      const today = new Date().toISOString().split("T")[0];
      return await Todo.findAll({
        where: {
          dueDate: { [Op.lt]: today },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async dueToday() {
      const today = new Date().toISOString().split("T")[0];
      return await Todo.findAll({
        where: {
          dueDate: today,
        },
        order: [["id", "ASC"]],
      });
    }

    static async dueLater() {
      const today = new Date().toISOString().split("T")[0];
      return await Todo.findAll({
        where: {
          dueDate: { [Op.gt]: today },
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
      }
    }

   displayableString() {
  const checkbox = this.completed ? "[x]" : "[ ]";
  const displayDate =
    this.dueDate === new Date().toISOString().split("T")[0]
      ? "" // No date for tasks due today
      : this.dueDate;
  return `${this.id}. ${checkbox} ${this.title.trim()}${displayDate ? " " + displayDate.trim() : ""}`;
}


  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
