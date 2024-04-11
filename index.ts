#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";

let todoList: string[] = [];
let conditions = true;

// Print welcome message with ASCII art and colorful gradient
console.log(
  gradient.instagram(figlet.textSync("Code with Abdul Waheed", { horizontalLayout: "full" }))
);

let main = async () => {
  while (conditions) {
    let option = await inquirer.prompt({
      name: "choice",
      type: "list",
      message: "Select an option you want to do",
      choices: [
        "Add Task",
        "Delete Task",
        "Update Task",
        "View Todo-List",
        "Exit",
      ],
    });

    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "Delete Task") {
      await deleteTask();
    } else if (option.choice === "Update Task") {
      await updateTask();
    } else if (option.choice === "View Todo-List") {
      await viewTask();
    } else if (option.choice === "Exit") {
      conditions = false;
    }
  }
};

// Function to add new task to the list
let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: "Enter your new task :",
    },
  ]);
  todoList.push(newTask.task);
  console.log(`\n ${newTask.task} task added successfully in Todo-List`);
};

// Function to delete a task from the list
let deleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the 'index no.' of the task you want to delete :",
    },
  ]);
  let deletedTask = todoList.splice(taskIndex.index - 1, 1);
  console.log(
    `\n ${deletedTask} this task has been deleted successfully from your Todo-List`
  );
};

// Function to update a task
let updateTask = async () => {
  await viewTask();
  let updateTaskInput = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "Enter the 'index no.' of the task you want to update :",
    },
    {
      name: "new_task",
      type: "input",
      message: "Enter the new task name :",
    },
  ]);
  todoList[updateTaskInput.index - 1] = updateTaskInput.new_task;
  console.log(
    `\n Task at index no. ${
      updateTaskInput.index
    } updated successfully [for updated list check option: "View Todo-List"]`
  );
};

// Function to view all Todo-List Tasks
let viewTask = () => {
  console.log("\n Your Todo-List: \n");
  todoList.forEach((task, index) => {
    console.log(`${index + 1}: ${task}`);
  });
};

main();
