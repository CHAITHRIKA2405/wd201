const express = require("express");
const { Todo } = require("./models");
const app = express();

app.use(express.json());

// GET /todos - returns a list of all todos
app.get("/todos", async function (request, response) {
  try {
    const allTodos = await Todo.findAll();
    response.json(allTodos);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error fetching todos");
  }
});

// DELETE /todos/:id - deletes a todo by id
app.delete("/todos/:id", async function (request, response) {
  try {
    const todoId = request.params.id;

    // Try to delete the todo by its ID
    const deleted = await Todo.destroy({
      where: { id: todoId }
    });

    // If `deleted` is 1, that means one row was deleted (success)
    if (deleted === 1) {
      return response.json(true); // Return true if the deletion was successful
    } else {
      return response.json(false); // Return false if the todo with the given ID was not found
    }
  } catch (error) {
    console.error(error);
    response.status(500).send("Error deleting todo");
  }
});

module.exports = app;
