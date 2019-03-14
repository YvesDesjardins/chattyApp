import React, { useState, useEffect } from 'react';

import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

const socket = new WebSocket('ws://localhost:3001');

export default function AppHook() {
  const [currentUser, setCurrentUser] = useState({ name: '' });
  const [currentContent, setCurrentContent] = useState('');
  const [messages, setMessages] = useState([{}]);
  const [userCount, setUserCount] = useState();

  useEffect(() => {
    socket.onmessage = (event) => {
      processResponse(JSON.parse(event.data));
    }
  });

  function processResponse({ type, username, content }) {
    switch (type) {
      case 'userCount':
        setUserCount(content);
        break;
      default:
        setMessages(messages.concat({
          username,
          content
        }));
        break;
    }
  }

  function onKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newMessage = {
        username: currentUser.name === '' ? 'Anonymous' : currentUser.name,
        content: currentContent,
      };

      socket.send(JSON.stringify(newMessage));
      setCurrentContent('');
    }
  }
  function onTypingUser(event) {
    setCurrentUser({ name: event.target.value });
  }
  function onTypingMessage(event) {
    setCurrentContent(event.target.value);
  }

  return (
    <div>
      <NavBar userCount={userCount} />
      <MessageList messages={messages} />
      <ChatBar onKeyDown={onKeyDown} onTypingUser={onTypingUser} onTypingMessage={onTypingMessage} username={currentUser.name} content={currentContent} />
    </div>
  );
}
