/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import Message from './Message.jsx';

export default function MessageList(props) {
  const reference = useRef();
  const parseMessages =
    props.messages.map((message) => {
      return (
        <Message
          key={message.id}
          username={message.username}
          content={message.content}
          type={message.type} />
      );
    });

  useEffect(() => {
    setTimeout(function () { reference.current.scrollIntoView({ behavior: 'smooth' }); }, 1000);
  }, [props.messages]);

  return (
    <div>
      {parseMessages}
      <div ref={reference} />
    </div>
  );
}
