let cellContent = document.querySelector(".cells-content");

function initCells(){
    // <div class="row">
    // <div class="cell"></div>
    // <div class="cell"></div>
    // <div class="cell"></div>
    // <div class="cell"></div>
    // <div class="cell"></div>
    // <div class="cell"></div> so on .... 26 cells in one row and 100 total rows
    // </div>

    let cells = "";

    for(let i=0;i<100;i++){
        cells += `<div class="row">`
        for(let j=0;j<26;j++){
            cells += `<div class="cell">Cell</div>`
        }
        cells += `</div>`
    }

    cellContent.innerHTML = cells;
}
initCells();











