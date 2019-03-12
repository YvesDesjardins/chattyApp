/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Message from './Message.jsx';

export default function MessageList(props) {
  const parseMessages = props.messages.map((message) => (
    <Message
      username={message.username}
      content={message.content} />
  ));

  return (
    <div>
      {parseMessages}
    </div>
  );
}
