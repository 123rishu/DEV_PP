let sticky = document.querySelector("#sticky");

sticky.addEventListener("click", function(e){
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

    appendSticky();
})

function appendSticky(){
    let stickyDiv = document.createElement("div");
    stickyDiv.classList.add("sticky");
    stickyDiv.innerHTML = `
            <div class="sticky-header">
                <div class="minimise"></div>
                <div class="close"></div>
            </div>
            <div class="sticky-content">
                <div class="textarea" contenteditable="true"></div>
            </div>`;

    
    stickyDiv.querySelector(".minimise").addEventListener("click" , function(e){
        let stickyContent = stickyDiv.querySelector(".sticky-content");
        if(stickyContent.classList.contains('hide')){
            stickyContent.classList.remove("hide");
        }
        else{
            stickyContent.classList.add("hide");
        }
    });

    stickyDiv.querySelector(".close").addEventListener("click", function(){
        stickyDiv.remove();
    })

    body.append(stickyDiv);
}