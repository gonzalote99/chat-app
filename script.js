const socket = io();
let username;
const textarea = document.querySelector('#textarea');
const msgArea = document.querySelector('.message_area');


do {
 username = prompt('enter name');
} while (!username)

textarea.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') {
    sendMessage(e.target.value);
  }
});

function sendMessage(msg) {
  let msgData = {
    user: username,
    message: msg.trim(),
  };

  appendMessage(msgData, 'outgoing');
  textarea.value = '';
  scrollBottom();

  socket.emit('message', msgData);
}


function appendMessage(msg, type) {
  let mainDiv = document.createElement('div');
  let classname = type;

  mainDiv.classList.add(classname,'message');

  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>
  `;

  mainDiv.innerHTML = markup;
  msgArea.appendChild(mainDiv);
}

socket.on('message', (msg) => {
  appendMessage(msg, 'incoming')
  scrollBottom();
})

function scrollBottom() {
  msgArea.scrollTop = msgArea.scrollHeight;
}