import React, { useState, useEffect } from 'react';

import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

const socket = new WebSocket('ws://localhost:3001');

export default function AppHook() {
  const [tempUser, setTempUser] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: 'Anonymous' });
  const [currentContent, setCurrentContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [userCount, setUserCount] = useState();

  useEffect(() => {
    socket.onmessage = (event) => {
      processResponse(JSON.parse(event.data));
    }
  });

  function processResponse({ type, username, content, id }) {
    switch (type) {
      case 'userCount':
        setUserCount(content);
        break;
      case 'gifMessage':
      case 'notificationMessage':
      case 'textMessage':
        setMessages(messages.concat({
          username,
          content,
          id,
        }));
        break;
      default:
        break;
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.target.className === 'chatbar-username') {
        checkUserChanged();
      } else {
        sendMessage();
      }
    }
  }
  function onTypingUser(event) {
    setTempUser(event.target.value);
  }
  function onTypingMessage(event) {
    setCurrentContent(event.target.value);
  }

  function sendMessage() {
    const newMessage = {
      username: currentUser.name === '' ? 'Anonymous' : currentUser.name,
      content: currentContent,
    };

    socket.send(JSON.stringify(newMessage));
    setCurrentContent('');
  }
  function checkUserChanged() {
    if (currentUser.name !== tempUser) {
      const message = {
        content: '/userChange ',
        oldUser: currentUser.name,
        newUser: tempUser,
      }
      socket.send(JSON.stringify(message));
      setCurrentUser({ name: tempUser });
    }
  }

  return (
    <div>
      <NavBar userCount={userCount} />
      <MessageList messages={messages} />
      <ChatBar onKeyDown={onKeyDown} onTypingUser={onTypingUser} onTypingMessage={onTypingMessage} username={tempUser} content={currentContent} />
    </div>
  );
}
