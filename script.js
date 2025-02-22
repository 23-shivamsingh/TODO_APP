let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if(text){
        tasks.push({text:text, completed:false});
        taskInput.value="";
        updateTaskslist();
        updateStatus();
    }
};

const toggleTaskcomplete =   (index) => {
    tasks[index].completed = !tasks[index].completed; 
    updateTaskslist();
    updateStatus();
};

const DeleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskslist();
    updateStatus();
};

const EditTask = (index) => {
    const taskInput  = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    
    tasks.splice(index,1);
    updateTaskslist();
    updateStatus();
};

const updateStatus = () => {
    const completedTasks = tasks.filter((task)=> task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks/totalTasks)*100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById("numerbs").innerHTML = `${completedTasks} / ${totalTasks}`;
};

const updateTaskslist = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) =>{
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
        <p>${task.text}</p>
        </div>
        <div class="icons">
        <img src="./images/Edit_options.png" onClick="EditTask(${index})"/>
        <img src="./images/Delete_options.png" onClick="DeleteTask(${index})"/>
        </div>
        `;
        listItem.addEventListener("change", () => toggleTaskcomplete(index));
        taskList.append(listItem);
    });
};

document.getElementById("newTask").addEventListener("click",function(e){
    e.preventDefault();
    addTask();
}); 