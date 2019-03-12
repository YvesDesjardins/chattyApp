import React from 'react';

export default function Message(props) {
  return (
    <div className='message' >
      <div className='message-username'>{props.username}</div>
      <div className='message-content'>{props.content}</div>
    </div>
  );
}
