let allFilterTags = document.querySelectorAll(".ticket-filters div");
let ticketContainer = document.querySelector(".tickets-container");
let openModalBtn = document.querySelector(".open-modal");
let closeModalBtn = document.querySelector(".close-modal");
//let ticketDelete = document.querySelector(".ticket-delete");
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
        ticketContainer.innerHTML = "";
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        for(let i=0;i<allTickets.length;i++){
            let {ticketId, ticketFilter, ticketContent} = allTickets[i];
            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("realTicketBox");
            ticketDiv.innerHTML = `<div class="ticket-header ${ticketFilter}"></div>
                <div class="ticket-info">
                    <div class="realTextBoxID">#${ticketId}</div>
                    <div class="ticket-delete">
                        <i class="fas fa-trash-alt" id=${ticketId}></i>
                    </div>
                </div>
                <div class="realText">${ticketContent}</div>`;

            ticketDiv.querySelector(".ticket-header").addEventListener("click", toggleTicketFilter);
            ticketDiv.querySelector(".ticket-delete i").addEventListener("click", handleTicketDelete);
            ticketContainer.append(ticketDiv);
        }
    }
}
loadTickets();

openModalBtn.addEventListener("click", handleOpenModal);
closeModalBtn.addEventListener("click", handleCloseModal);
//ticketDelete.addEventListener("click", handleTicketDelete);

function toggleTicketFilter(e){
    let filters = ["red", "blue", "green", "black"];
    let currFilter = e.target.classList[1];
    let idx = filters.indexOf(currFilter);
    idx++;
    idx = idx%filters.length;
    let currTicketHeader = e.target;
    currTicketHeader.classList.remove(currFilter);
    currTicketHeader.classList.add(filters[idx]);

    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    let id = currTicketHeader.nextElementSibling.children[0].textContent.split(#)[1];
    console.log(id);

    for(let i=0;i<allTickets.length;i++){
        if(allTickets[i].ticketId == id){
            allTickets[i].ticketFilter = filters[idx];
        }
    }

    localStorage.setItem("allTickets", JSON.stringify(allTickets));
}

function handleTicketDelete(e){
    //console.log(e.target.id);
    let ticketToBeDeleted = e.target.id;
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    let filteredTickets = allTickets.filter(function(curTicketObj){
        return curTicketObj.ticketId != ticketToBeDeleted;
    })
    localStorage.setItem("allTickets", JSON.stringify(filteredTickets));
    loadTickets();
}

function handleCloseModal(){
    if(document.querySelector(".ticket-box")){
        document.querySelector(".ticket-box").remove();
    }
}

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

    document.querySelector(".colours.active-filter").classList.remove("active-filter");

    e.target.classList.add("active-filter");
}

function addTicket(e){
    if(e.key == "Enter"){
        let modalText = e.target.textContent;
        let ticketId = uid();

        let ticketDiv = document.createElement("div");
        ticketDiv.classList.add("realTicketBox");
        ticketDiv.innerHTML = `<div class="ticket-header ${selectedFilter}"></div>
                <div class="ticket-info">
                    <div class="realTextBoxID">#${ticketId}</div>
                    <div class="ticket-delete">
                        <i class="fas fa-trash-alt" id=${ticketId}></i>
                    </div>
                </div>
            <div class="realText">${modalText}</div>`;
        ticketDiv.querySelector(".ticket-header").addEventListener("click", toggleTicketFilter);
        ticketDiv.querySelector(".ticket-delete i").addEventListener("click", handleTicketDelete);
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

    if(e.target.classList.contains("active-filter")){
        e.target.classList.remove("active-filter");
        loadTickets();
        return;
    }

    if(document.querySelector(".filter.active-filter")){
        document.querySelector(".filter.active-filter").classList.remove("active-filter");
    }

    e.target.classList.add("active-filter");
    //console.log("Active filter added");

    let ticketFilter = e.target.classList[1];
    loadSelectedTickets(ticketFilter);

    //console.log(e);
    //let filter = e.target.classList[1];
    //let filterCode = obj[filter];
    //ticketContainer.style.background = filterCode;
    //console.log(filter);
}

function loadSelectedTickets(ticketFilter){
    if(localStorage.getItem("allTickets")){
        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        let filteredTickets = allTickets.filter( function(currFilterObj){
            return currFilterObj.ticketFilter == ticketFilter;
        })

        ticketContainer.innerHTML = "";

        for(let i=0;i<filteredTickets.length;i++){
            let {ticketId, ticketFilter, ticketContent} = filteredTickets[i];
            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("realTicketBox");
            ticketDiv.innerHTML = `<div class="ticket-header ${ticketFilter}"></div>
                    <div class="ticket-info">
                        <div class="realTextBoxID">#${ticketId}</div>
                        <div class="ticket-delete">
                            <i class="fas fa-trash-alt" id=${ticketId}></i>
                        </div>
                    </div>
                <div class="realText">${ticketContent}</div>`;
            ticketDiv.querySelector(".ticket-header").addEventListener("click", toggleTicketFilter);
            ticketDiv.querySelector(".ticket-delete i").addEventListener("click", handleTicketDelete);
            ticketContainer.append(ticketDiv);
        }

        //console.log(filteredTickets);
    }
}