let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");

undo.addEventListener("click", function(e){
    let curToolBtn = e.target;
    if(curToolBtn.classList.contains("active-element")){

    }
    else{
        //first time clicked on undo
        toolOptionsEraser.classList.add("hide");
        toolOptionsPencils.classList.add("hide");
        document.querySelector(".active-element").classList.remove("active-element");
        curToolBtn.classList.add("active-element");
    }
    //undo fxnality in database
    let line = db.pop();
    redoDB.push(line);

    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //redraw the remaining lines
    redrawLines();
})

function redrawLines(){
    ctx.lineCap = "round";
    for(let i=0;i<db.length;i++){
        let line = db[i];
        for(let j=0;j<line.length;j++){
            let pointObj = line[j];
            if(pointObj.type == "md"){
                ctx.strokeStyle = pointObj.color;
                ctx.width = pointObj.width;
                ctx.beginPath();
                ctx.moveTo(pointObj.x, pointObj.y);
            }
            else{
                ctx.lineTo(pointObj.x, pointObj.y);
                ctx.stroke();
            }
        }
    }
}

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
    redoLine();
})

function redoLine(){
    if(redoDB.length >= 1){
        let line = redoDB.pop();
        for(let j=0;j<line.length;j++){
            let pointObj = line[j];
            if(pointObj.type == "md"){
                ctx.strokeStyle = pointObj.color;
                ctx.width = pointObj.width;
                ctx.beginPath();
                ctx.moveTo(pointObj.x, pointObj.y);
            }
            else{
                ctx.lineTo(pointObj.x, pointObj.y);
                ctx.stroke();
            }
        }
        db.push(line);
    }
}