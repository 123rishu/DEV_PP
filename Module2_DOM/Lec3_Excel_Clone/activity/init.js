let cellsContent = document.querySelector(".cells-content");

function initCells(){
    let cells = `<div class="top-left-cell"></div>`;
    cells += `<div class="top-row">`;
    for(let i=0;i<26;i++){
        cells += `<div class="top-row-cell" tcid="${i}">${String.fromCharCode(65+i)}
        </div>`;
    }
    cells += `</div>`;

    cells += `<div class="left-col">`;
    for(let i=0;i<100;i++){
        cells += `<div class="left-col-cell" crid="${i}">${i+1}</div>`;
    }
    cells += `</div>`;

    cells += `<div class="cells">`;
    for(let i=0;i<100;i++){
        cells += `<div class="row">`
        for(let j=0;j<26;j++){
            cells += `<div class="cell" rowid="${i}" colid="${j}" contentEditable="true"></div>`
        }
        cells += `</div>`
    }
    cells += `</div>`
    cellsContent.innerHTML = cells;
}
initCells();

let sheetsDB = [];
let db;  // active database
let visitedCells; // active sheet visitedCells
function initDB(){
    newSheetDB = [];
    for(let i=0;i<100;i++){
        let row = [];
        for(let j=0;j<26;j++){
            //i j
            let name = String.fromCharCode(65+j)+(i+1)+"";
            let cellObject = {
                name:name,
                value:"",
                formula:"",
                children:[],
                parents:[],
                isVisited:false,
                fontStyle: {bold: false, underline: false, italic: false}
            }
            row.push(cellObject);
        }
        newSheetDB.push(row);
    }
    visitedCells = [];
    db = newSheetDB;
    sheetsDB.push({db:newSheetDB, visitedCells: visitedCells});
    //console.log(sheetsDB);
}
initDB();