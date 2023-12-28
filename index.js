import inquirer from "inquirer";
// Define an enum for user actions
var UserAction;
(function (UserAction) {
    UserAction["View"] = "View To-Do List";
    UserAction["Add"] = "Add Task";
    UserAction["Complete"] = "Complete Task";
    UserAction["Edit"] = "Edit Task";
    UserAction["Delete"] = "Delete Task";
    UserAction["Exit"] = "Exit";
})(UserAction || (UserAction = {}));
// Initialize an array to store the to-do items
let todoList = [];
// Function to display the current to-do list
const displayTodoList = () => {
    console.log("\n--- To-Do List ---");
    todoList.forEach(item => {
        const status = item.completed ? "[x]" : "[ ]";
        console.log(`${status} ${item.id}. ${item.task}`);
    });
    console.log("------------------\n");
};
// Function to add a new to-do item
const addTodoItem = async () => {
    const { newTask } = await inquirer.prompt({
        type: "input",
        name: "newTask",
        message: "Enter a new task:",
    });
    const newTodoItem = {
        id: todoList.length + 1,
        task: newTask,
        completed: false,
    };
    todoList.push(newTodoItem);
    console.log(`Task "${newTask}" added to the to-do list.`);
};
// Function to mark a to-do item as completed
const completeTodoItem = async () => {
    const { taskId } = await inquirer.prompt({
        type: "number",
        name: "taskId",
        message: "Enter the ID of the task to mark as completed:",
    });
    const todoItem = todoList.find(item => item.id === taskId);
    if (todoItem) {
        todoItem.completed = true;
        console.log(`Task "${todoItem.task}" marked as completed.`);
    }
    else {
        console.log("Task not found. Please enter a valid task ID.");
    }
};
// Function to edit a to-do item
const editTodoItem = async () => {
    const { taskId, newTask } = await inquirer.prompt([
        {
            type: "number",
            name: "taskId",
            message: "Enter the ID of the task to edit:",
        },
        {
            type: "input",
            name: "newTask",
            message: "Enter the new task:",
        },
    ]);
    const todoItem = todoList.find(item => item.id === taskId);
    if (todoItem) {
        todoItem.task = newTask;
        console.log(`Task "${todoItem.task}" updated.`);
    }
    else {
        console.log("Task not found. Please enter a valid task ID.");
    }
};
// Function to delete a to-do item
const deleteTodoItem = async () => {
    const { taskId } = await inquirer.prompt({
        type: "number",
        name: "taskId",
        message: "Enter the ID of the task to delete:",
    });
    const index = todoList.findIndex(item => item.id === taskId);
    if (index !== -1) {
        const deletedTask = todoList.splice(index, 1)[0];
        console.log(`Task "${deletedTask.task}" deleted.`);
    }
    else {
        console.log("Task not found. Please enter a valid task ID.");
    }
};
// Main function to handle user interactions
const main = async () => {
    while (true) {
        const { userAction } = await inquirer.prompt({
            type: "list",
            name: "userAction",
            choices: Object.values(UserAction),
            message: "What would you like to do?",
        });
        if (userAction === UserAction.Exit) {
            console.log("Exiting the to-do list application. Goodbye!");
            break;
        }
        switch (userAction) {
            case UserAction.View:
                displayTodoList();
                break;
            case UserAction.Add:
                await addTodoItem();
                break;
            case UserAction.Complete:
                await completeTodoItem();
                break;
            case UserAction.Edit:
                await editTodoItem();
                break;
            case UserAction.Delete:
                await deleteTodoItem();
                break;
            default:
                console.log("Invalid choice. Please select a valid action.");
                break;
        }
    }
};
// Start the to-do list application
main();
