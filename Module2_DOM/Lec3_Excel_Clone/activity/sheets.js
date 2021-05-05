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
})

sheetsList.addEventListener("click", function(e){
    let selectedSheetDiv = e.target;
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    //if clicked element already has active class
    if(selectedSheetDiv.classList.contains("active-sheet")){
        return;
    }
    //if it doesn't have any
    selectedSheetDiv.classList.add("active-sheet");
})