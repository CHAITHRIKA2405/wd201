const todoList = require("../todo");

const formattedDate = (d) => d.toISOString().split("T")[0];
let dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);

describe("Todo List Test Suite", () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  test("should add new todo", () => {
    expect(todos.all.length).toBe(0);
    todos.add({ title: "Test todo", dueDate: today, completed: false });
    expect(todos.all.length).toBe(1);
  });

  test("should mark a todo as complete", () => {
    todos.add({ title: "Complete this", dueDate: today, completed: false });
    expect(todos.all[0].completed).toBe(false);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("should retrieve overdue items", () => {
    todos.add({ title: "Overdue task", dueDate: yesterday, completed: false });
    const overdueItems = todos.overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].dueDate).toBe(yesterday);
  });

  test("should retrieve due today items", () => {
    todos.add({ title: "Today's task", dueDate: today, completed: false });
    const dueTodayItems = todos.dueToday();
    expect(dueTodayItems.length).toBe(1);
    expect(dueTodayItems[0].dueDate).toBe(today);
  });

  test("should retrieve due later items", () => {
    todos.add({ title: "Future task", dueDate: tomorrow, completed: false });
    const dueLaterItems = todos.dueLater();
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].dueDate).toBe(tomorrow);
  });
});
