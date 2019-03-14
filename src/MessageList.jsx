/* eslint-disable react/prop-types */
import React from 'react';
import Message from './Message.jsx';

export default function MessageList(props) {
  const parseMessages =
    props.messages.map((message) => {
      return (
        <Message
          key={message.id}
          username={message.username}
          content={message.content} />
      );
    });

  return (
    <div>
      {parseMessages}
    </div>
  );
}
