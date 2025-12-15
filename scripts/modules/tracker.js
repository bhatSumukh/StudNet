let taskInput = document.getElementById("task-input");
const taskList = document.querySelector(".task-list");

const addTaskBtn = document.getElementById("add-task");


function addTask() {
    let inputText = document.getElementById("task-input").value;

    if(inputText !== ''){

       const newList = document.createElement("li");

       newList.innerText = inputText;

       taskList.appendChild(newList);

       taskInput.value = '';
    }
}