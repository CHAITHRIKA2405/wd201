const request = require("supertest");
const app = require("../app");
const db = require("../models");

beforeAll(async () => {
  await db.sequelize.sync({ force: true }); // clean DB before tests
});

afterAll(async () => {
  await db.sequelize.close();
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
  expect(response.body.length).toBeGreaterThan(0);
});

test("Marks a todo as complete using PATCH /todos/:id/markComplete", async () => {
  const newTodo = await request(app)
    .post("/todos")
    .send({ title: "Incomplete todo", dueDate: new Date(), completed: false });
  const todoId = newTodo.body.id;

  const response = await request(app).patch(`/todos/${todoId}/markComplete`);
  expect(response.statusCode).toBe(200);
  expect(response.body.completed).toBe(true);
});

test("Deletes a todo using DELETE /todos/:id", async () => {
  const newTodo = await request(app)
    .post("/todos")
    .send({ title: "Todo to delete", dueDate: new Date(), completed: false });
  const todoId = newTodo.body.id;

  const deleteResponse = await request(app).delete(`/todos/${todoId}`);
  expect(deleteResponse.statusCode).toBe(200);
  expect(deleteResponse.body).toBe(true);

  // Deleting again returns false
  const secondDelete = await request(app).delete(`/todos/${todoId}`);
  expect(secondDelete.statusCode).toBe(200);
  expect(secondDelete.body).toBe(false);
});
