import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8080');

function getMessage(cb) {
    socket.on('message', data => cb(null, data));
}

function sendMessage(data, cb) {
    socket.emit('send-message', data);
}

function sendNewUserMessage(data, cb) {
    socket.emit('new user', data);
}

function getOnlineUsers(cb) {
    socket.on('online-users', data => cb(null, data));
}

function emitToGetUsers(data, cb) {
    socket.emit('get-users', data);
}

function disconnectUser(data, cb) {
    socket.emit('disconnect', data);
}

export { getMessage, sendMessage, sendNewUserMessage, getOnlineUsers, emitToGetUsers, disconnectUser };