const request = require("supertest");
const db = require("../models");
const app = require("../app");

describe("Todo DELETE endpoint", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Deletes a todo with the given ID if it exists and sends a boolean response", async () => {
    // Create a todo to delete
    const response = await request(app).post("/todos").send({
      title: "Sample todo",
      dueDate: new Date().toISOString(),
      completed: false,
    });

    const todoID = response.body.id;

    // Delete the created todo
    const deleteResponse = await request(app).delete(`/todos/${todoID}`);
    expect(deleteResponse.body).toBe(true);

    // Try deleting the same todo again
    const deleteAgain = await request(app).delete(`/todos/${todoID}`);
    expect(deleteAgain.body).toBe(false);
  });
});
