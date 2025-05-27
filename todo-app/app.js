const express = require("express");
const app = express();
const { Todo } = require("./models");

app.use(express.json());

// POST /todos — create a new todo
app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      dueDate: req.body.dueDate,
      completed: false
    });
    return res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    return res.status(422).json(error);
  }
});

// GET /todos — return all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    return res.json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// DELETE /todos/:id — delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
  try {
    const deleted = await Todo.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.json(true);  // Deletion successful
    } else {
      return res.json(false); // No such todo to delete
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = app;
