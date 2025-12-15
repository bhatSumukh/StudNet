let taskInput = document.getElementById("task-input");
const taskList = document.querySelector(".task-list");

const addTaskBtn = document.getElementById("add-task");


function addTask() {
    let inputText = document.getElementById("task-input").value;

    if(inputText !== ''){

       const newList = document.createElement("li");

       const checkCompleteBtn = document.createElement("input");
       checkCompleteBtn.type = 'checkbox';
       checkCompleteBtn.classList.add("complete-task-checkbox");

       const taskText = document.createElement("span");
       taskText.textContent = inputText;
       taskText.classList.add("task-content");

       const deleteTaskBtn = document.createElement("button");
       deleteTaskBtn.classList.add("dlt-task-btn");
       deleteTaskBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

       newList.appendChild(checkCompleteBtn);
       newList.appendChild(taskText);
       newList.appendChild(deleteTaskBtn);

       taskList.appendChild(newList);

       taskInput.value    = '';

       checkCompleteBtn.addEventListener('change', function () {
        if(this.checked){
            taskText.style.textDecoration = 'line-through';
        }
        else{
            taskText.style.textDecoration = 'none';
        }
       });

       deleteTaskBtn.addEventListener('click', function() {
            newList.remove();
       });

    }else{
        alert("Add A Task..!");
    }
}