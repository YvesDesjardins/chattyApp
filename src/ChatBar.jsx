/* eslint-disable react/prop-types */
import React from 'react';

export default function ChatBar(props) {
  return (
    <footer>
      <div className='chatbar'>
        <textArea className='chatbar-username' name='userName' placeholder='Your name (optional)' value={props.username !== '' ? props.userName : undefined} />
        <textArea className='chatbar-message' name='message' placeholder='Type a message and hit ENTER' />
      </div>
    </footer>
  );
}
