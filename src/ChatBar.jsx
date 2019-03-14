/* eslint-disable react/prop-types */
import React from 'react';

export default function ChatBar(props) {
  return (
    <footer>
      <div className='chatbar'>
        <textarea onKeyDown={props.onKeyDown} onChange={props.onTypingUser} className='chatbar-username' name='userName' placeholder='Your name (optional)' value={props.username} />
        <textarea onKeyDown={props.onKeyDown} onChange={props.onTypingMessage} className='chatbar-message' name='message' placeholder='Type a message and hit ENTER' value={props.content} />
      </div>
    </footer>
  );
}
