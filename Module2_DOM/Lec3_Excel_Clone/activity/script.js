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
            cells += `<div class="cell" contentEditable="true"></div>`
        }
        cells += `</div>`
    }
    cells += `</div>`
    cellsContent.innerHTML = cells;
}
initCells();

let topRow = document.querySelector(".top-row");
let leftCol = document.querySelector(".left-col");
let topLeftCell = document.querySelector(".top-left-cell");
console.log(topLeftCell);

cellsContent.addEventListener("scroll", function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;
    //console.log(e);
    topRow.style.top = top+"px";
    topLeftCell.style.top =top+"px";
    topLeftCell.style.left =left+"px";
    leftCol.style.left =left+"px";
})









