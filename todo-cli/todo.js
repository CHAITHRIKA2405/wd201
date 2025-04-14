const todoList = () => {
  let all = [];

  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => todo.dueDate < today);
  };

  const dueToday = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => todo.dueDate === today);
  };

  const dueLater = () => {
    const today = formattedDate(new Date());
    return all.filter((todo) => todo.dueDate > today);
  };

  const toDisplayableList = (list) => {
    const today = formattedDate(new Date());
    return list
      .map((todo, index) => {
        const checkbox = todo.completed ? "[x]" : "[ ]";
        
        // Always include the index + 1 as the ID
        // For items due today, don't show the date
        if (todo.dueDate === today) {
          return `${index + 1}. ${checkbox} ${todo.title}`;
        } 
        // For overdue or future items, show the date
        else {
          return `${index + 1}. ${checkbox} ${todo.title} ${todo.dueDate}`;
        }
      })
      .join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

// #######################################
// DO NOT CHANGE ANYTHING BELOW THIS LINE
// #######################################

const todos = todoList();

const dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(dateToday.setDate(dateToday.getDate() - 1)),
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 2)),
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
const overdues = todos.overdue();
console.log(todos.toDisplayableList(overdues));
console.log("\n");

console.log("Due Today");
const itemsDueToday = todos.dueToday();
console.log(todos.toDisplayableList(itemsDueToday));
console.log("\n");

console.log("Due Later");
const itemsDueLater = todos.dueLater();
console.log(todos.toDisplayableList(itemsDueLater));
console.log("\n");

module.exports = todoList;