const request = require("supertest");
const app = require("../app"); // Adjust the path to your app.js
const { Todo } = require("../models");

describe("Todo API", () => {
  // Before each test, ensure the database is clean
  beforeEach(async () => {
    await Todo.destroy({ where: {} }); // Clear out all todos
  });

  // Test GET /todos
  describe("GET /todos", () => {
    it("should return an empty array when no todos exist", async () => {
      const response = await request(app).get("/todos");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]); // No todos in the database
    });

    it("should return a list of todos", async () => {
      const newTodo = await Todo.create({
        title: "Test Todo",
        description: "This is a test todo"
      });

      const response = await request(app).get("/todos");
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].title).toBe("Test Todo");
    });
  });

  // Test DELETE /todos/:id
  describe("DELETE /todos/:id", () => {
    it("should return true if todo is deleted successfully", async () => {
      const newTodo = await Todo.create({
        title: "Test Todo to Delete",
        description: "This todo will be deleted"
      });

      const response = await request(app).delete(`/todos/${newTodo.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toBe(true); // Successfully deleted
    });

    it("should return false if todo is not found", async () => {
      const response = await request(app).delete("/todos/999999");
      expect(response.status).toBe(200);
      expect(response.body).toBe(false); // Todo with ID 999999 doesn't exist
    });
  });
});
