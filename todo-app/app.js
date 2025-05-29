const express = require("express");
const app = express();
const { Todo } = require("./models");

app.use(express.json());

// GET /todos — return all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST /todos — create a new todo
app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// PATCH /todos/:id/markComplete — mark a todo as complete using model method
app.patch("/todos/:id/markComplete", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    await todo.markAsCompleted();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to mark todo complete" });
  }
});

// DELETE /todos/:id — delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
  try {
    const deleted = await Todo.destroy({ where: { id: req.params.id } });
    res.json(deleted ? true : false);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = app;
