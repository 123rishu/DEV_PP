let photo = document.querySelector("#photo");
let photoInput = photo.querySelector("input");
let download = document.querySelector("#download");

photo.addEventListener("click", function(e){
    let curToolBtn = e.target;
    if(curToolBtn.classList.contains("active-element")){

    }
    else{
        //first time clicked
        toolOptionsEraser.classList.add("hide");
        toolOptionsPencils.classList.add("hide");
        document.querySelector(".active-element").classList.remove("active-element");
        curToolBtn.classList.add("active-element");
    }
    photoInput.click();
})

photoInput.addEventListener("change", function(e){
    let fileObject = e.target.files[0];

    let imageUrl = URL.createObjectURL(fileObject);
    let image = document.createElement("img");
    image.src = imageUrl;
    image.classList.add("image-upload");
    appendSticky(image);
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
    downloadCanvasAsImage();
})

function downloadCanvasAsImage(){
    let canvasUrl = canvas.toDataURL({type:"image/png"});
    let aTag = document.createElement("a");
    aTag.download = "canvas.png";
    aTag.href = canvasUrl;
    aTag.click();
}