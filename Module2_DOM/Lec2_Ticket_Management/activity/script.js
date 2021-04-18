let allFilterTags = document.querySelectorAll(".ticket-filters div");
let ticketContainer = document.querySelector(".tickets-container");
//console.log(ticketContainer);
let obj = {
    "red" : "#ff0707",
    "blue": "#008cfc",
    "green": "#00ff15",
    "black": "#191919"
}


//console.log(ticketContainer);

for(let i=0;i<allFilterTags.length;i++){
    allFilterTags[i].addEventListener("click", chooseFilter);
}

function chooseFilter(e){
    //console.log(e);
    let filter = e.target.classList[1];
    let filterCode = obj[filter];
    ticketContainer.style.background = filterCode;
    //console.log(filter);
}










