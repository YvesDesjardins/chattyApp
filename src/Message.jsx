/* eslint-disable react/prop-types */
import React from 'react';

// parse message to check if gif or not
export default function Message(props) {
  function parseMessage() {
    if (props.type === 'gifMessage') {
      return <div className='message-content'><img src={props.content} alt='Gif' /></div>
    } else {
      return <div className='message-content'>{props.content}</div>;
    }
  }

  return (
    <div className='message' >
      <div className='message-username'>{props.username}</div>
      {parseMessage()}
    </div>
  );
}
