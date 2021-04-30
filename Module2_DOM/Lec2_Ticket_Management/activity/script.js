let allFilterTags = document.querySelectorAll(".ticket-filters div");
let ticketContainer = document.querySelector(".tickets-container");
let openModalBtn = document.querySelector(".open-modal");
let selectedFilter = "red";
//console.log(openModalBtn);
//console.log(ticketContainer);
let obj = {
    "red" : "#ff0707",
    "blue": "#008cfc",
    "green": "#00ff15",
    "black": "#191919"
}

function loadTickets(){
    if(localStorage.getItem("allTickets")){
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        for(let i=0;i<allTickets.length;i++){
            let {ticketId, ticketFilter, ticketContent} = allTickets[i];
            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("realTicketBox");
            ticketDiv.innerHTML = `<div class="ticket-header ${ticketFilter}"></div>
                <div class="realTextBoxID">#${ticketId}</div>
                <div class="realText">${ticketContent}</div>`;

            ticketContainer.append(ticketDiv);
        }
    }
}

loadTickets();

openModalBtn.addEventListener("click", handleOpenModal);

function handleOpenModal(){
    let modal = document.querySelector(".ticket-box");

    if(modal){
        return;
    }

    let modalDiv = createModal();

    modalDiv.querySelector(".ticket-textbox")
    .addEventListener("click", clearModalTextBox);

    modalDiv.querySelector(".ticket-textbox")
    .addEventListener("keypress", addTicket);


    let allColoursFilters = modalDiv.querySelectorAll(".colours");

    for(let i=0;i<allColoursFilters.length;i++){
        allColoursFilters[i].addEventListener("click", chooseModalFilter);
    }

    ticketContainer.append(modalDiv);
}

function chooseModalFilter(e){

    //console.log(e.target.classList[1]);
    //console.log(e);
    let currChosenFilter = e.target.classList[1];

    if(e.target.classList[1] == selectedFilter){
        return;
    }

    selectedFilter = currChosenFilter;

    document.querySelector(".active-filter").classList.remove("active-filter");

    e.target.classList.add("active-filter");
}

function addTicket(e){
    if(e.key == "Enter"){
        let modalText = e.target.textContent;
        let ticketId = uid();

        let ticketDiv = document.createElement("div");
        ticketDiv.classList.add("realTicketBox");
        ticketDiv.innerHTML = `<div class="ticket-header ${selectedFilter}"></div>
            <div class="realTextBoxID">#${ticketId}</div>
            <div class="realText">${modalText}</div>`;

        ticketContainer.append(ticketDiv);

        e.target.parentNode.remove();

        //ticket has been appended on the document!!!
        //false, null, undefined, 0, "", NaN
        if(!localStorage.getItem('allTickets')){
            //first time ticket ayegi

            let allTickets = [];

            let ticketObject = {};
            ticketObject.ticketId = ticketId;
            ticketObject.ticketFilter = selectedFilter;
            ticketObject.ticketContent = modalText;
            allTickets.push(ticketObject);
            localStorage.setItem("allTickets", JSON.stringify(allTickets));
        }
        else{
            let allTickets = JSON.parse(localStorage.getItem("allTickets"));
            let ticketObject = {};
            ticketObject.ticketId = ticketId;
            ticketObject.ticketFilter = selectedFilter;
            ticketObject.ticketContent = modalText;
            allTickets.push(ticketObject);
            localStorage.setItem("allTickets", JSON.stringify(allTickets));
        }
        selectedFilter = "red";
    }
}


function clearModalTextBox(e){
    if(e.target.getAttribute("data-typed") == "true"){
        return;
    }

    e.target.innerHTML = "";
    e.target.setAttribute("data-typed" , "true");
}

function createModal(){
    let modalDiv = document.createElement("div");
    modalDiv.classList.add("ticket-box");
    modalDiv.innerHTML = `<div class="ticket-textbox" data-typed="false" contenteditable="true">
                                Enter your task here
                          </div>
                          <div class="ticket-filterbox">
                                <div class="colours red active-filter"></div>
                                <div class="colours blue"></div>
                                <div class="colours green"></div>
                                <div class="colours black"></div>
                          </div>`;
    return modalDiv;
}



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