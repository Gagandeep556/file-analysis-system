const { Task } = require("../model/index");

async function checkTask() {
  const task = await Task.findAll({});

  const taskArray = ["countWords", "countUniqueWords", "findTopKWords"];

  if (!task.length) {
    for (const taskName of taskArray) {
      await Task.create({ task: taskName });
    }
  }
  return true;
}

module.exports = checkTask;
