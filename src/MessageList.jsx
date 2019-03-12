/* eslint-disable react/prop-types */
import React from 'react';
import Message from './Message.jsx';

export default function MessageList(props) {
  const parseMessages = props.messages.map((message) => (
    <Message
      key={Math.trunc(Math.random() * 1000000)}
      username={message.username}
      content={message.content} />
  ));

  return (
    <div>
      {parseMessages}
    </div>
  );
}
