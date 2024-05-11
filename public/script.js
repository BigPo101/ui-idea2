const socket = io();

let username = "";

function enterChat() {
    username = document.getElementById("usernameInput").value.trim();
    if (username) {
        document.getElementById("startPage").style.display = "none";
        document.getElementById("chatPage").style.display = "block";
        socket.emit("newUser", username);
    } else {
        alert("Please enter a username!");
    }
}

function sendMessage() {
    const message = document.getElementById("messageInput").value.trim();
    if (message) {
        socket.emit("message", { username, message });
        document.getElementById("messageInput").value = "";
    }
}

socket.on("message", (data) => {
    const { username, message } = data;
    const chatMessages = document.getElementById("chatMessages");
    const messageElement = document.createElement("p");
    messageElement.innerHTML = `<strong>${username}</strong>: ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
