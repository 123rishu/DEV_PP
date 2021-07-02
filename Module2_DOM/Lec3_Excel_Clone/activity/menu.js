let boldBtn = document.querySelector(".bold");
let underlineBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");
let left = document.querySelector(".left");
let center = document.querySelector(".center");
let right = document.querySelector(".right");

left.addEventListener("click", function(e){
    //left alignment
    setAlignment("left", left);
})

center.addEventListener("click", function(e){
    //center alignment
    setAlignment("center", center);
})

right.addEventListener("click", function(e){
    //right alignment
    setAlignment("right", right);
})

function setAlignment(alignmentName, element){
    //1. when user clicked on already selected alignment, do nothimg return
    if(element.classList.contains("active-font-style") || !lastSelectedCell){
        return;
    }

    //2. when user clicked on left align, which is a new option
    //Menu par changes ayenge
    document.querySelector(".font-alignment .active-font-style").classList.remove("active-font-style");
    element.classList.add("active-font-style");

    //Cells UI par changes ayenge
    lastSelectedCell.style.textAlign = alignmentName;

    //DB par changes ayenge
    let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
    let cellObj = db[rowId][colId];
    cellObj.textAlign = alignmentName;
}

boldBtn.addEventListener("click", function(e){
    setFontStyle("bold", boldBtn);
})
underlineBtn.addEventListener("click", function(e){
    setFontStyle("underline", underlineBtn);
})
italicBtn.addEventListener("click", function(e){
    setFontStyle("italic", italicBtn);
})

function setFontStyle(styleName, element){
    if(lastSelectedCell){
        let {rowId, colId} = getRowIdColIdFromElement(lastSelectedCell);
        let cellObject = db[rowId][colId];

        //style agar pehle se true tha
        if(cellObject.fontStyle[styleName]){
            if(styleName == "bold"){
                lastSelectedCell.style.fontWeight = "normal";
            }
            else if(styleName == "underline"){
                lastSelectedCell.style.textDecoration = "none";
            }
            else if(styleName == "italic"){
                lastSelectedCell.style.fontStyle = "normal";
            }
            element.classList.remove("active-font-style");
        }
        else{
            if(styleName == "bold"){
                lastSelectedCell.style.fontWeight = "bold";
            }
            else if(styleName == "underline"){
                lastSelectedCell.style.textDecoration = "underline";
            }
            else{
                lastSelectedCell.style.fontStyle = "italic";
            }
            element.classList.add("active-font-style");
        }
        //DB change
        cellObject.fontStyle[styleName] = !cellObject.fontStyle[styleName];
    }
}

