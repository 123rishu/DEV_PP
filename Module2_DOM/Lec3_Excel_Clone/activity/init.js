let cellsContent = document.querySelector(".cells-content");

function initCells(){
    let cells = `<div class="top-left-cell"></div>`;
    cells += `<div class="top-row">`;
    for(let i=0;i<26;i++){
        cells += `<div class="top-row-cell">${String.fromCharCode(65+i)}</div>`;
    }
    cells += `</div>`;

    cells += `<div class="left-col">`;
    for(let i=0;i<100;i++){
        cells += `<div class="left-col-cell">${i+1}</div>`;
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

let db;
function initDB(){
    db = [];
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
                parents:[]
            }
            row.push(cellObject);
        }
        db.push(row);
    }
    //console.log(db);
}
initDB();