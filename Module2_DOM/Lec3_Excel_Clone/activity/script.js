let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;

cellsContent.addEventListener("scroll", function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;
    //console.log(e);
    topRow.style.top = top+"px";
    topLeftCell.style.top =top+"px";
    topLeftCell.style.left =left+"px";
    leftCol.style.left =left+"px";
})

for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click", function(e){
        let rowId = Number(e.target.getAttribute("rowid"));
        let colId = Number(e.target.getAttribute("colid"));
        let cellObject = db[rowId][colId];
        let address = String.fromCharCode(65 + colId)+(rowId + 1)+"";
        addressInput.value = address;
        formulaInput.value = cellObject.formula;
    })

    allCells[i].addEventListener("blur", function(e){
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        let rowId = e.target.getAttribute("rowid");
        let colId = e.target.getAttribute("colid"); 
        let cellObject = db[rowId][colId];

        if(cellObject.value == cellValue){
            return;
        }

        if(cellObject.formula){
            removeFormula(cellObject);
            formulaInput.value = "";
        }

        cellObject.value = cellValue;

        //update it's children value as well
        updateChildren(cellObject);
    })

    allCells[i].addEventListener("keydown", function(e){
        if(e.key == "Backspace"){
            let cell = e.target;
            let {rowId, colId} = getRowIdColIdFromElement(cell);
            let cellObject = db[rowId][colId];
            if(cellObject.formula){
                cell.textContent="";
                cellObject.formula = "";
                removeFormula(cellObject);
                formulaInput.value = "";
            }
            //updateChildren(cellObject);
        }
    })
}

formulaInput.addEventListener("blur", function(e){
    let formula = e.target.value;
    if(formula){
        let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];

        if(cellObject.formula){
            removeFormula(cellObject);
        }
        let computedValue = solveFormula(formula, cellObject);
        //formula update
        cellObject.formula = formula;
        //db update
        db[rowId][colId].value = computedValue;
        //ui update
        lastSelectedCell.textContent = computedValue;
        //children update
        updateChildren(cellObject);
        console.log(db);
    }
})





