let menuDiv = document.querySelector(".menu");
let fileMenuOptionsDiv = document.querySelector(".file-menu-options");
let homeMenuOptionsDiv = document.querySelector(".home-menu-options");
let boldBtn = document.querySelector(".bold");
let underlineBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");

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

menuDiv.addEventListener("click", function(e){
    let clickedMenuDiv = e.target;
    if(clickedMenuDiv.classList.contains("menu")){
        return;
    }

    if(clickedMenuDiv.classList.contains("active-menu")){
        return;
    }

    document.querySelector(".active-menu").classList.remove("active-menu");
    clickedMenuDiv.classList.add("active-menu");

    let curSelectedMenuDivName = clickedMenuDiv.classList[0];

    if(curSelectedMenuDivName == "home"){
        homeMenuOptionsDiv.classList.remove("hide");
        fileMenuOptionsDiv.classList.add("hide");
    }
    else{
        fileMenuOptionsDiv.classList.remove("hide");
        homeMenuOptionsDiv.classList.add("hide");
    }
})