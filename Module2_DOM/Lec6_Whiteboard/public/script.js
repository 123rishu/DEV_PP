let canvas = document.querySelector("#canvas");
let body = document.querySelector("body");
let sticky = document.querySelector("#sticky");
let currSelectedStickyID;
let isStickyMouseDown = false;
let initialX;
let initialY;

let {top : canvasTop} = canvas.getBoundingClientRect();

canvas.height = window.innerHeight - canvasTop;
canvas.width = window.innerWidth;

window.addEventListener("resize",function(){
    canvas.height = window.innerHeight - canvasTop;
    canvas.width = window.innerWidth;
    redrawLines();
});

let db = [];
let redoDB =[];
let line = [];

let ctx = canvas.getContext("2d");
ctx.lineCap = "round";
let isMouseDown = false;

canvas.addEventListener("mousedown", function(e){
    //console.log(e.clientX, e.clientY);
    if(redoDB.length){
        redoDB = [];
    }

    let x = e.clientX;
    let y = e.clientY - canvasTop;
    ctx.beginPath();
    ctx.moveTo(x, y);
    isMouseDown = true;

    let pointObject = {
        type: "md",
        x:x,
        y:y,
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    }
    line.push(pointObject);
});

canvas.addEventListener("mousemove", function(e){
    //console.log(e.clientX, e.clientY);
    if(isMouseDown){
        let x = e.clientX;
        let y = e.clientY - canvasTop;
        ctx.lineTo(x, y);
        ctx.stroke();

        let pointObject = {
            type: "mm",
            x: x,
            y: y
        }
        line.push(pointObject);
    }

    if(isStickyMouseDown){  
        let x = e.clientX;
        let y = e.clientY;
        let finalX = x;
        let finalY = y;
        let dx = finalX - initialX;
        let dy = finalY - initialY;
        let stickyDynamicDiv = document.querySelector(`.sticky[id="${currSelectedStickyID}"]`);
        let {top, left} = stickyDynamicDiv.getBoundingClientRect();
        stickyDynamicDiv.style.top = top + dy + "px";
        stickyDynamicDiv.style.left = left + dx + "px";
        initialX = finalX;
        initialY = finalY;
        isStickyMouseDown = false;
    }
});

canvas.addEventListener("mouseup", function(e){
    //console.log(e.clientX, e.clientY);
    isMouseDown = false;
    isStickyMouseDown = false;
    db.push(line);
    line = [];
    //console.log(db);
});





















