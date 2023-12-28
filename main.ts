// Import the 'inquirer' library for user prompts
import inquirer from "inquirer";

// Define a type for a single to-do item
interface TodoItem {
    id: number;
    task: string;
    completed: boolean;
}

// Initialize an array to store the to-do items
let todoList: TodoItem[] = [];

// Function to display the current to-do list
const displayTodoList = () => {
    console.log("\n--- To-Do List ---");
    todoList.forEach(item => {
        const status = item.completed ? "[x]" : "[ ]";
        console.log(`${status} ${item.task}`);
    });
    console.log("------------------\n");
};

// Function to add a new to-do item
const addTodoItem = async () => {
    const { newTask } = await inquirer.prompt({
        type: "input",
        name: "newTask",
        message: "Enter a new task:"
    });

    const newTodoItem: TodoItem = {
        id: todoList.length + 1,
        task: newTask,
        completed: false
    };

    todoList.push(newTodoItem);
    console.log(`Task "${newTask}" added to the to-do list.`);
};

// Function to mark a to-do item as completed
const completeTodoItem = async () => {
    const { taskId } = await inquirer.prompt({
        type: "number",
        name: "taskId",
        message: "Enter the ID of the task to mark as completed:"
    });

    const todoItem = todoList.find(item => item.id === taskId);

    if (todoItem) {
        todoItem.completed = true;
        console.log(`Task "${todoItem.task}" marked as completed.`);
    } else {
        console.log("Task not found. Please enter a valid task ID.");
    }
};

// Main function to handle user interactions
const main = async () => {
    while (true) {
        const { userAction } = await inquirer.prompt({
            type: "list",
            name: "userAction",
            choices: ["View To-Do List", "Add Task", "Complete Task", "Exit"],
            message: "What would you like to do?"
        });

        if (userAction === "Exit") {
            console.log("Exiting the to-do list application. Goodbye!");
            break;
        }

        switch (userAction) {
            case "View To-Do List":
                displayTodoList();
                break;
            case "Add Task":
                await addTodoItem();
                break;
            case "Complete Task":
                await completeTodoItem();
                break;
            default:
                console.log("Invalid choice. Please select a valid action.");
                break;
        }
    }
};

// Start the to-do list application
main();
