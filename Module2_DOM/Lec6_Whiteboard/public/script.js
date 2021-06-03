    let canvas = document.querySelector("#canvas");

let {top : canvasTop} = canvas.getBoundingClientRect();

canvas.height = window.innerHeight - canvasTop;
canvas.width = window.innerWidth;

window.addEventListener("resize",function(){
    canvas.height = window.innerHeight - canvasTop;
    canvas.width = window.innerWidth;
});

let ctx = canvas.getContext("2d");
ctx.lineCap = "round";
let isMouseDown = false;

canvas.addEventListener("mousedown", function(e){
    //console.log(e.clientX, e.clientY);
    let x = e.clientX;
    let y = e.clientY;
    ctx.beginPath();
    ctx.moveTo(x, y - canvasTop);
    isMouseDown = true;
});

canvas.addEventListener("mousemove", function(e){
    //console.log(e.clientX, e.clientY);
    if(isMouseDown){
        let x = e.clientX;
        let y = e.clientY;
        ctx.lineTo(x, y-canvasTop);
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup", function(e){
    //console.log(e.clientX, e.clientY);
    isMouseDown = false;
});





















