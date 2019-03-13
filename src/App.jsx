import React, { useState, useEffect } from 'react';

import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

export default function AppHook() {
  const [currentUser, setCurrentUser] = useState({ name: '' });
  const [currentContent, setCurrentContent] = useState('');
  const [messages, setMessages] = useState([{}]);
  const [socket, setSocket] = useState(new WebSocket('ws://localhost:3001'));

  useEffect(() => {
    socket.onmessage = (event) => {
      const { username, content } = JSON.parse(event.data);

      setMessages(messages.concat({
        username,
        content
      }));
    }
  });

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
      <NavBar />
      <MessageList messages={messages} />
      <ChatBar onKeyDown={onKeyDown} onTypingUser={onTypingUser} onTypingMessage={onTypingMessage} username={currentUser.name} content={currentContent} />
    </div>
  );
}
