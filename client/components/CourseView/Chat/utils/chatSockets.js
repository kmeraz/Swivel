import socket from '../../../../utils/socket.js';

export function getPreviousMessages(currentUser, otherUser, callback) {
  socket.emit('loadMessages', currentUser, otherUser);
  socket.on('loadMessages', function(messages) {
    messages.forEach((message) => (callback(message, otherUser.id)));
  });
}

export function listenForNewMessages(otherUser, callback) {
  socket.on('newMessage', function(message) {
    callback(message, otherUser.id);
  });
}

export function disconnect(callback) {
  socket.emit('disconnect', callback);
}

export function sendMessage(currentUser, otherUser, message, callback) {
  socket.emit('newMessage', [message.author, message.body, otherUser.name, message.timestamp, currentUser.id, currentUser.type, otherUser.id, otherUser.type]);
  callback(message, otherUser.id);
}
