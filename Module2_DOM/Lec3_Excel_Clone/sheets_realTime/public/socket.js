socket.on("setRealTimeCell", function(realTimeCellInfo){
    //console.log(realTimeCellInfo);
    let {username, rowId, colId} = realTimeCellInfo;

    if(document.querySelector(".realtime-cell")){
        document.querySelector(".realtime-cell").classList.remove("realtime-cell");
        document.querySelector(".username-div").remove();
    }

    let usernameDiv = document.createElement("div");
    usernameDiv.textContent = username;
    usernameDiv.classList.add("username-div");

    let realTimeCell = document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`);
    realTimeCell.classList.add("realtime-cell");
    realTimeCell.append(usernameDiv);
})

socket.on("setCellValue", function(cellValue){
    let realTimeCell = document.querySelector(".realtime-cell");
    let childNodes = realTimeCell.childNodes;
    if(childNodes.length == 1){
        let usernameDiv = childNodes[0];
        realTimeCell.innerHTML = cellValue;
        realTimeCell.append(usernameDiv);
    }
    else{
        let usernameDiv = childNodes[1];
        realTimeCell.innerHTML = cellValue;
        realTimeCell.append(usernameDiv);
    }
})