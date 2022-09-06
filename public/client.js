const socket = io();
const btn = document.getElementById("btn");
const text = document.getElementById("text");
const msg = document.getElementById("msg");
let name;
do {
  name = prompt("Enter your name");
} while (!name);

text.addEventListener("keyup", (e) => {
  if (e.key === "Enter") sendMessage(text.value);
});

// btn.addEventListener("click", () => {
//   sendMessage(text.value);
// });

btn.addEventListener("click", () => {
  if(text.value != '') sendMessage(text.value)
});

function sendMessage(message) {
  let textmsg = {
    user: name,
    message: message.trim(),
  };
  // append message to our page
  appendMessage(textmsg, "outgoing");
  text.value = "";

  scrollToBottom();
  // send message to server
  socket.emit("message", textmsg);
}

function appendMessage(textmsg, type) {
  let maindiv = document.createElement("div");
  let className = type;
  maindiv.classList.add(className, "message");
  let markup = `${textmsg.user} : ${textmsg.message}`;
maindiv.innerText = markup
  msg.appendChild(maindiv);
}

socket.on("message", (textmsg) => {
  appendMessage(textmsg, "incoming");
  scrollToBottom()
});



function scrollToBottom() {
  msg.scrollTop = msg.scrollHeights;
}
