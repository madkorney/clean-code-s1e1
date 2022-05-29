// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput = document.querySelector(".todo-app__add-item-input"); 
var addButton = document.querySelector(".todo-app__add-item-button"); 
var incompleteTaskHolder = document.querySelector(".todo-app__list_type_incomplete-tasks");
var completedTasksHolder = document.querySelector(".todo-app__list_type_completed-tasks");

// New task list item
var createNewTaskElement=function(taskString){

    const listItem = document.createElement('li');
    listItem.className = 'todo-app__list-item';

    // create listItem components
    // input (checkbox)
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'todo-app__list-item-checkbox';
    // label
    const label = document.createElement('label');
    label.innerText = taskString;
    label.className = 'todo-app__task-item'; 
    // input (text)
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'todo-app__list-item-input'; 
    // button.edit
    const editButton = document.createElement("button");
    editButton.innerText = 'Edit';  // innerText encodes special characters, HTML does not.
    editButton.className = 'todo-app__edit-button todo-app__edit-button_state_edit';

    //button.delete
    const deleteButton = document.createElement('button'); // delete button
    const deleteButtonImg = document.createElement('img'); // delete button image
    deleteButton.className = 'todo-app__delete-button';  
    deleteButtonImg.className = 'todo-app__delete-button-icon';  
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.alt = 'Delete button icon';
    deleteButton.appendChild(deleteButtonImg); // append img into delete-buton

    // append components into listItem
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    return listItem;
}

var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;

    var listItem = createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";

}

// Edit an existing task.
var editTask = function() {
    console.log('Edit Task...');
    console.log('Change "edit" to "save"');


    var listItem = this.parentNode;
    var editInput = listItem.querySelector('.todo-app__list-item-input');
    var label = listItem.querySelector('.todo-app__task-item');
    var editBtn = listItem.querySelector('.todo-app__edit-button');
    var containsClass =  listItem.classList.contains('todo-app__list-item_mode_edit');
    // If class of the parent is .todo-app__list-item_mode_edit
    if (containsClass) {
        // switch to .editmode
        // label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText =  'Edit';
        editBtn.classList.remove('todo-app__edit-button_state_save');
        editBtn.classList.add('todo-app__edit-button_state_edit');
    }else{
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
        editBtn.classList.remove('todo-app__edit-button_state_edit');
        editBtn.classList.add('todo-app__edit-button_state_save');
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle('todo-app__list-item_mode_edit'); 
};

// Delete task.
var deleteTask=function(){
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

// Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");
    // Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}

// Mark task incomlete
var taskIncomplete=function(){
    console.log("Incomplete Task...");
    // Mark task as incomplete.
    // When the checkbox is unchecked
    // Append the task list item to the #incompleteTasks.
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

// ajax request to update page
var ajaxRequest=function(){
    console.log("AJAX Request");
}

// The glue to hold it all together.

// Set the click handler to the addTask function.
addButton.onclick = addTask;  // why?? for IE <9?
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    // select ListItems children
    var checkBox = taskListItem.querySelector('.todo-app__list-item-checkbox');
    var editButton = taskListItem.querySelector('.todo-app__edit-button');
    var deleteButton = taskListItem.querySelector('.todo-app__delete-button');

    // Bind editTask to edit button.   
    editButton.onclick = editTask;
    // Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    // Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}

// cycle over incompleteTaskHolder ul list items to bind listeners
for (let i = 0; i < incompleteTaskHolder.children.length; i += 1){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
// cycle over completedTasksHolder ul list items to bind listeners
for (let i = 0; i < completedTasksHolder.children.length; i += 1){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

// prevent creation of empty tasks. 
// Change edit to save when you are in edit mode.