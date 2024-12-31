// public/script.js
const socket = io();

const usernameInput = document.getElementById('username');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

let username;

usernameInput.addEventListener('change', function() {
    username = usernameInput.value;
    socket.emit('register', username);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value && username) {
        socket.emit('chat message', { user: username, message: input.value });
        input.value = '';
    }
});

socket.on('chat message', function(data) {
    const item = document.createElement('li');
    item.textContent = `${data.user}: ${data.message}`;
    messages.appendChild(item);
    window.scrollTo(0, document .body.scrollHeight);
});