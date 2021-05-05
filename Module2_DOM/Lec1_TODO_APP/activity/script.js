let todoInput = document.querySelector(".todo-input");
let addTodoButton = document.querySelector(".add-todo");
let todosList = document.querySelector(".todos-list");
let deleteBtn = document.querySelector(".delete-task");

function addToDo(){
    let todo = todoInput.value;
    //"", 0, false, undefined
    if(todo){
        let listItem = document.createElement("li");// creates a element
        listItem.classList.add("todo-item");
        //<li class = "todo-item"></li>

        let pTag = document.createElement("p");
        pTag.classList.add("todo");
        pTag.innerHTML = todo;
        // <p class="todo">Learn HTML !!!</p>
        
        let deleteBtn = document.createElement("i");
        deleteBtn.classList.add("fas");
        deleteBtn.classList.add("fa-minus-circle");
        deleteBtn.classList.add("icon-large");
        // <i class="fas fa-minus-circle"></i>

        deleteBtn.addEventListener("click", function(event){
            //console.log(event);
            event.target.parentNode.remove();
        });

        listItem.append(pTag);
        listItem.append(deleteBtn);

        todosList.append(listItem);
        todoInput.value = "";
    }
    todoInput.value = "";
}

addTodoButton.addEventListener("click", function(e){
    addToDo();
});

todoInput.addEventListener("keypress", function(e){
    //console.log(e);
    if(e.key == 'Enter'){
        addToDo();
    }
});



/*
<li class = "todo-item">
<p class = "todo"></p>
<button class = "delete-task">DELETE</button>
</li>
*/