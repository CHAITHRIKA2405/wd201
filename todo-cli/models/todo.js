"use strict";
const { Model, Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list\n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      overdueItems.forEach((item) => console.log(item.displayableString()));
      console.log("\n");

      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      dueTodayItems.forEach((item) => console.log(item.displayableString()));
      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      dueLaterItems.forEach((item) => console.log(item.displayableString()));
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().split("T")[0],
          },
          completed: false,
        },
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: new Date().toISOString().split("T")[0],
          completed: false,
        },
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().split("T")[0],
          },
          completed: false,
        },
      });
    }

    static async markAsComplete(id) {
      return await Todo.update({ completed: true }, { where: { id } });
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let formattedDate = this.dueDate;
      const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

      // If due today, omit the date
      if (this.dueDate === today) {
        formattedDate = "";
      }

      // Return string based on whether the due date should be included
      return formattedDate
        ? `${this.id}. ${checkbox} ${this.title.trim()} ${formattedDate}`.trim()
        : `${this.id}. ${checkbox} ${this.title.trim()}`.trim();
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
    },
  );

  return Todo;
};
