#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

interface todoItem {
    task: string;
    completed: boolean;
}

const todoList: todoItem[] = [];

async function mainMenu() {
    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: ['Add Task', 'View List', 'Mark as Completed', 'Delete Task', 'Exit']
        });

        switch (action) {
            case 'Add Task':
                await addtask();
                break;
            case 'View List':
                viewlist();
                break;
            case 'Mark as Completed':
                await markascompleted();
                break;
            case 'Delete Task':
                await deletetask();
                break;
            case 'Exit':
                console.log('Goodbye!');
                return;
        }
    }
}

async function addtask() {
    let { task } = await inquirer.prompt({
        type: 'input',
        name: 'task',
        message: 'Enter the task',
    });

    todoList.push({ task, completed: false });
    console.log(chalk.green("Task Added successfully"));
}

function viewlist() {
    console.log(chalk.blue("**** To Do List ****"));
    todoList.forEach((item, index) => {
        console.log(`${index + 1}.[${item.completed ? 'x' : ''}] ${item.task} `);
    });
    console.log(chalk.blue("***********************"));
}

async function markascompleted() {
    let { index } = await inquirer.prompt({
        type: 'number',
        name: 'index',
        message: 'Which task do you want to mark as completed?'
    });
    if (index < 1 || index > todoList.length) {
        console.log(chalk.red("Invalid task number. Please try again."));
        return;
    }
    todoList[index - 1].completed = true;
    console.log(chalk.green("Task marked as completed"));
}

async function deletetask() {
    let { index } = await inquirer.prompt({
        type: 'number',
        name: 'index',
        message: 'Which task do you want to delete?'
    });
    if (index < 1 || index > todoList.length) {
        console.log(chalk.red("Invalid task number. Please try again."));
        return;
    }
    todoList.splice(index - 1, 1);
    console.log(chalk.green("Task deleted successfully"));
}

mainMenu();
