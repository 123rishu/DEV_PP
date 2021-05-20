let addSheetBtn = document.querySelector(".add-sheet");
let sheetsList = document.querySelector(".sheets-list");
let sheetId=0;

//<div class="sheet" sheetid="1">Sheet2</div>
addSheetBtn.addEventListener("click", function(){
    sheetId++;
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    let sheetDiv = document.createElement("div");
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    sheetDiv.setAttribute("sheetid", sheetId);
    sheetDiv.innerHTML = `Sheet ${sheetId+1}`;
    sheetsList.append(sheetDiv);
    //UI should be new
    initUI();

    //create new sheet db
    //overallDB me newsheetdb add
    //active db = new sheet db
    initDB();
    //console.log(sheetsDB);  
})

function initUI(){
    for(let i=0 ; i<visitedCells.length ; i++){
        let {rowId , colId} = visitedCells[i];
        //console.log(rowId, colId);
        let cell = document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`);
        cell.innerHTML = "";
        cell.style = "";
    }
}

sheetsList.addEventListener("click", function(e){
    let selectedSheetDiv = e.target;
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    //if clicked element already has active class
    if(selectedSheetDiv.classList.contains("active-sheet")){
        return;
    }
    //if it doesn't have any
    selectedSheetDiv.classList.add("active-sheet");

    initUI();

    //set current db to active sheet db
    let sheetId = selectedSheetDiv.getAttribute("sheetid");
    db = sheetsDB[sheetId].db;
    visitedCells = sheetsDB[sheetId].visitedCells;

    //set UI according to the db
    setUI();
})

function setUI(){
    // for(let i=0;i<100;i++){
    //     for(let j=0;j<26;j++){
    //         let currCellObject = db[i][j];
    //         document.querySelector(`div[rowid="${i}"][colid="${j}"]`).textContent = currCellObject.value;
    //     }
    // }
    for(let i=0 ; i<visitedCells.length ; i++){
        let {rowId , colId} = visitedCells[i];
        let currCellObject = db[rowId][colId];
        document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).innerHTML = currCellObject.value;
    }
}

