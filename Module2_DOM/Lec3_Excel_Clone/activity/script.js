let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
let allCells = document.querySelectorAll(".cell");
let addressInput = document.querySelector("#address");
let formulaInput = document.querySelector("#formula");
let lastSelectedCell;

let username = prompt("Enter ");


cellsContent.addEventListener("scroll", function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;
    //console.log(e);
    topRow.style.top = top+"px";
    topLeftCell.style.top =top+"px";
    topLeftCell.style.left =left+"px";
    leftCol.style.left =left+"px";
})

let rowId;
let colId;

for(let i=0;i<allCells.length;i++){
    allCells[i].addEventListener("click", function(e){
        rowId = Number(e.target.getAttribute("rowid"));
        colId = Number(e.target.getAttribute("colid"));
        let cellObject = db[rowId][colId];
        let address = String.fromCharCode(65 + colId)+(rowId + 1)+"";
        addressInput.value = address;
        formulaInput.value = cellObject.formula;

        //add active class
        console.log(lastSelectedCell);
        if(lastSelectedCell){
            lastSelectedCell.classList.remove("active-cell");
            let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
            document.querySelector(`div[tcid="${colId}"]`).classList.remove("cell-selected");
            document.querySelector(`div[crid="${rowId}"]`).classList.remove("cell-selected");
        }
        
        //adding active-class which add green borders on the currently selected cell
        let curSelectedCell = document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`);
        curSelectedCell.classList.add("active-cell");

        //adding cell-selected class on the currently selected cell row header and column header
        let curSelectedTopCell = document.querySelector(`div[tcid="${colId}"]`);
        curSelectedTopCell.classList.add("cell-selected");
        let curSelectedLeftCell = document.querySelector(`div[crid="${rowId}"]`);
        curSelectedLeftCell.classList.add("cell-selected");

        //set bold, underline, italic 
        cellObject.fontStyle.bold 
            ? document.querySelector(".bold").classList.add("active-font-style")
            : document.querySelector(".bold").classList.remove("active-font-style");

        cellObject.fontStyle.italic
            ? document.querySelector(".italic").classList.add("active-font-style")
            : document.querySelector(".italic").classList.remove("active-font-style"); 
            
        cellObject.fontStyle.underline
            ? document.querySelector(".underline").classList.add("active-font-style")
            : document.querySelector(".underline").classList.remove("active-font-style"); 

        //set alignment of currently selected cell
        //1. Remove already selected text align of last cell if exists
        //console.log(lastSelectedCell);
        if(lastSelectedCell){
            document.querySelector(".font-alignment .active-font-style").classList.remove("active-font-style");
        }

        //2. set text align of currently selected cell
        let alignmentValue = cellObject.textAlign;
        document.querySelector(`.${alignmentValue}`).classList.add("active-font-style");
    })

    allCells[i].addEventListener("blur", function(e){
        lastSelectedCell = e.target;
        let cellValue = e.target.textContent;
        //let rowId = e.target.getAttribute("rowid");
        //let colId = e.target.getAttribute("colid"); 
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

        if(cellObject.isVisited){
            return;
        }
        cellObject.isVisited = true;
        visitedCells.push({rowId: rowId, colId: colId});
        //console.log(sheetsDB);
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

        if(cellObject.isVisited){
            return;
        }
        cellObject.isVisited = true;
        visitedCells.push({rowId: rowId, colId: colId});
        console.log(sheetsDB);
        //console.log(db);
    }
})





