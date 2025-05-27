const request = require("supertest");
const db = require("../models/index");
const app = require("../app");

let server;

beforeAll(async () => {
  await db.sequelize.sync({ force: true }); // Reset the DB before tests
  server = app.listen(4000); // Start server on a test port
});

afterAll(async () => {
  await db.sequelize.close(); // Close DB connection after tests
  server.close(); // Stop the server
});

test("Creates a todo using POST /todos", async () => {
  const response = await request(app).post("/todos").send({
    title: "Test todo",
    dueDate: new Date().toISOString(),
    completed: false,
  });

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("id");
  expect(response.body.title).toBe("Test todo");
});

test("Gets list of all todos using GET /todos", async () => {
  const response = await request(app).get("/todos");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});

test("Deletes a todo using DELETE /todos/:id", async () => {
  // Create a todo to be deleted
  const createResponse = await request(app).post("/todos").send({
    title: "Todo to be deleted",
    dueDate: new Date().toISOString(),
    completed: false,
  });

  const todoId = createResponse.body.id;

  // Delete the todo
  const deleteResponse = await request(app).delete(`/todos/${todoId}`);
  expect(deleteResponse.statusCode).toBe(200);
  expect(deleteResponse.body).toBe(true);

  // Attempt to delete again
  const secondDelete = await request(app).delete(`/todos/${todoId}`);
  expect(secondDelete.statusCode).toBe(200);
  expect(secondDelete.body).toBe(false);
});
