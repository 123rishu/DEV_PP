let onlineList = document.querySelector(".online-list");
socket.emit("userConnected", username);

socket.on("userDisconnected", function(dataObj){
    let leaveDiv = document.createElement("div");
    leaveDiv.classList.add("chat");
    leaveDiv.classList.add("leave");
    leaveDiv.textContent = `${dataObj.username} left the chat`;
    chatWindow.append(leaveDiv);

    deleteFromOnlineList(dataObj.id);
})

socket.on("join", function(dataObj){
    let joinDiv = document.createElement("div");
    joinDiv.classList.add("chat");
    joinDiv.classList.add("join");
    joinDiv.textContent = `${dataObj.username} joined the chat`;
    chatWindow.append(joinDiv);

    addInOnlineList(dataObj);
})

socket.on("online-list", function(userList){
    for(let i=0;i<userList.length;i++){
        if(userList[i].id != socket.id){
            let userDiv = document.createElement("div");
            userDiv.classList.add("user");
            userDiv.setAttribute("id", userList[i].id);
            userDiv.innerHTML = `<div class="user-img">
                                 <img src="default.jpg" alt="">
                             </div>
                             <div class="user-name">${userList[i].username}</div>`
            onlineList.append(userDiv);
        }
    }
})


socket.on("chatLeft", function(chatObj){
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("left");
    chatDiv.textContent = chatObj.username + " : " + chatObj.chat;
    chatWindow.append(chatDiv);
})

function deleteFromOnlineList(id){
    document.querySelector(`#${id}`).remove();
}
function addInOnlineList(userObject){
    let userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.setAttribute("id", userObject.id);
    userDiv.innerHTML = `<div class="user-img">
                                 <img src="default.jpg" alt="">
                             </div>
                             <div class="user-name">${userObject.username}</div>`;
    onlineList.append(userDiv);
}