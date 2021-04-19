let addBtn = document.querySelector(".add-btn-class");
let inputBox = document.querySelector(".give-input");
let ulTag = document.querySelector(".items-list");

// let inputValue = input.value;
// console.log(inputValue);

addBtn.addEventListener("click", function(e){
    let inputValue = inputBox.value;
    if(inputValue){
        createAndAddListItem(inputValue);
    }
});

inputBox.addEventListener("keypress", function(e){
    //console.log(e);
    let inputValue = inputBox.value;
    if(e.key == "Enter"){
        if(inputValue){
            createAndAddListItem(inputValue);
        }
    }
});


function createAndAddListItem(inputValue){
    let li = document.createElement("li");
    li.classList.add("Any-list-item");

    let p = document.createElement("p");
    p.classList.add("p-ki-class");
    p.innerHTML = inputValue;

    let i = document.createElement("i");
    i.classList.add("fas");
    i.classList.add("fa-minus-circle");

    i.addEventListener("click" , function(e){
        e.target.parentNode.remove();
        console.log(e);
    })

    li.append(p);
    li.append(i);

    ulTag.append(li);
    inputBox.value = "";
}

{/* <li class="Any-list-item">
                    <p class="p-ki-class">Learn HTML</p>
                    <i class="i-ki-class">Delete</i>
                </li> */}