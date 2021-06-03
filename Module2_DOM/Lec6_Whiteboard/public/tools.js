let pencil = document.querySelector("#pencil");
let pencilImgDiv = pencil.querySelector("img");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let sticky = document.querySelector("#sticky");
let photo = document.querySelector("#photo");
let download = document.querySelector("#download");
let toolOptionsPencils = pencil.querySelector(".tool-options");
let toolOptionsEraser = eraser.querySelector(".tool-options");
let pencilInputSize = pencil.querySelector("input");
let eraserInputSize = eraser.querySelector("input");
let pencilColors = document.querySelectorAll(".pencil-colors div");
let pencilSize = "1";
let eraserSize = "1";
let currPencilColor = "black";

for(let i=0;i<pencilColors.length;i++){
    pencilColors[i].addEventListener("click", function(e){
        let updatedPencilColor = e.target.className;
        ctx.strokeStyle = updatedPencilColor;
        currPencilColor = updatedPencilColor;
    })
}

pencilInputSize.addEventListener("change", function(e){
    let updatedInputSize = pencilInputSize.value;
    ctx.lineWidth = updatedInputSize;
    pencilSize = updatedInputSize;
})

eraserInputSize.addEventListener("change", function(e){
    let updatedInputSize = eraserInputSize.value;
    ctx.lineWidth = updatedInputSize;
    eraserSize = updatedInputSize;
})

pencilImgDiv.addEventListener("click", function(e){
    let curToolBtn = e.target;
    if(curToolBtn.classList.contains("active-element")){
        //second time clicked => options open ya close honge
        if(toolOptionsPencils.classList.contains("hide")){
            toolOptionsPencils.classList.remove("hide");
        }
        else{
            toolOptionsPencils.classList.add("hide");
        }
    }
    else{
        //first time clicked => basic chise set hongi
        toolOptionsEraser.classList.add("hide");
        document.querySelector(".active-element").classList.remove("active-element");
        curToolBtn.classList.add("active-element");
        ctx.strokeStyle = currPencilColor;
        ctx.lineWidth = pencilSize;
    }
})

eraser.addEventListener("click", function(e){
    let curToolBtn = e.target;
    if(curToolBtn.classList.contains("active-element")){
        //second time clicked
        if(toolOptionsEraser.classList.contains("hide")){
            toolOptionsEraser.classList.remove("hide");
        }
        else{
            toolOptionsEraser.classList.add("hide");
        }
    }
    else{
        //first time clicked
        toolOptionsPencils.classList.add("hide");
        document.querySelector(".active-element").classList.remove("active-element");
        curToolBtn.classList.add("active-element");
        ctx.strokeStyle = "white";
        ctx.lineWidth = eraserSize;
    }
})

undo.addEventListener("click", function(e){
    let curToolBtn = e.target;
    if(curToolBtn.classList.contains("active-element")){

    }
    else{
        toolOptionsEraser.classList.add("hide");
        toolOptionsPencils.classList.add("hide");
        document.querySelector(".active-element").classList.remove("active-element");
        curToolBtn.classList.add("active-element");
    }
})

redo.addEventListener("click", function(e){
    let curToolBtn = e.target;
    if(curToolBtn.classList.contains("active-element")){

    }
    else{
        toolOptionsEraser.classList.add("hide");
        toolOptionsPencils.classList.add("hide");
        document.querySelector(".active-element").classList.remove("active-element");
        curToolBtn.classList.add("active-element");
    }
})

sticky.addEventListener("click", function(e){
    let curToolBtn = e.target;
    if(curToolBtn.classList.contains("active-element")){

    }
    else{
        toolOptionsEraser.classList.add("hide");
        toolOptionsPencils.classList.add("hide");
        document.querySelector(".active-element").classList.remove("active-element");
        curToolBtn.classList.add("active-element");
    }
})

photo.addEventListener("click", function(e){
    let curToolBtn = e.target;
    if(curToolBtn.classList.contains("active-element")){

    }
    else{
        toolOptionsEraser.classList.add("hide");
        toolOptionsPencils.classList.add("hide");
        document.querySelector(".active-element").classList.remove("active-element");
        curToolBtn.classList.add("active-element");
    }
})

download.addEventListener("click", function(e){
    let curToolBtn = e.target;
    if(curToolBtn.classList.contains("active-element")){

    }
    else{
        toolOptionsEraser.classList.add("hide");
        toolOptionsPencils.classList.add("hide");
        document.querySelector(".active-element").classList.remove("active-element");
        curToolBtn.classList.add("active-element");
    }
})






