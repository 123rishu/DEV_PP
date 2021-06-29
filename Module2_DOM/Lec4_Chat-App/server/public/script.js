let chatInput = document.querySelector(".chat-input-box");
let chatWindow = document.querySelector(".chat-window");
let myName = document.querySelector(".me .user-name");

let username = prompt("Enter your name");
myName.textContent = username;


chatInput.addEventListener("keypress", function(e){
    if(e.key == "Enter"){
        let chatDiv = document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("right");
        chatDiv.textContent = username + " : " + chatInput.value;
        chatWindow.append(chatDiv);
        //emit chat message and your name
        socket.emit("chat", {username, chat: chatInput.value});
        chatInput.value = "";
    }
})