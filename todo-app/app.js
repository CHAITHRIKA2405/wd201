const express = require("express");
const app = express();
const { Todo } = require("./models");

app.use(express.json());

// GET /todos
app.get("/todos", async function (request, response) {
  try {
    const todos = await Todo.findAll(); // Fetch all todos
    return response.json(todos);
  } catch (error) {
    console.error(error);
    return response.status(500).send("Error retrieving todos");
  }
});

// DELETE /todos/:id
app.delete("/todos/:id", async function (request, response) {
  try {
    const todoId = request.params.id;
    const deleted = await Todo.destroy({
      where: { id: todoId },
    });

    if (deleted) {
      return response.json(true);
    } else {
      return response.json(false);
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json(false);
  }
});

module.exports = app;
