const request = require("supertest");
const app = require("../app");
const db = require("../models");

let server;

beforeAll(async () => {
  // Start the server if needed (optional)
  // server = app.listen(4000);
  // Sync database and clear Todos table
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  // Close DB connection and server if started
  await db.sequelize.close();
  // if (server) server.close();
});

test("Creates a todo using POST /todos", async () => {
  const response = await request(app)
    .post("/todos")
    .send({ title: "Test todo", dueDate: new Date(), completed: false });
  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("id");
  expect(response.body.title).toBe("Test todo");
  expect(response.body.completed).toBe(false);
});

test("Gets list of all todos using GET /todos", async () => {
  const response = await request(app).get("/todos");
  expect(response.statusCode).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
  // At least one todo exists (created above)
  expect(response.body.length).toBeGreaterThan(0);
});

test("Marks a todo as complete using PATCH /todos/:id/markComplete", async () => {
  // Create a new todo (initially incomplete)
  const newTodoResponse = await request(app)
    .post("/todos")
    .send({ title: "Incomplete todo", dueDate: new Date(), completed: false });
  expect(newTodoResponse.statusCode).toBe(200);

  const todoId = newTodoResponse.body.id;

  // Mark it complete
  const response = await request(app).patch(`/todos/${todoId}/markComplete`);
  expect(response.statusCode).toBe(200);
  expect(response.body.completed).toBe(true);
});

test("Deletes a todo using DELETE /todos/:id", async () => {
  // Create a new todo to delete
  const newTodoResponse = await request(app)
    .post("/todos")
    .send({ title: "Todo to delete", dueDate: new Date(), completed: false });
  expect(newTodoResponse.statusCode).toBe(200);

  const todoId = newTodoResponse.body.id;

  // Delete the todo
  const deleteResponse = await request(app).delete(`/todos/${todoId}`);
  expect(deleteResponse.statusCode).toBe(200);
  expect(deleteResponse.body).toBe(true);

  // Attempt to delete again should return false
  const secondDelete = await request(app).delete(`/todos/${todoId}`);
  expect(secondDelete.statusCode).toBe(200);
  expect(secondDelete.body).toBe(false);
});
