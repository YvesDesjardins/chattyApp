import React, { Component } from 'react';

export default class ChatBar extends Component {
  render() {
    return (
      <footer>
        <div className='chatbar'>
          <textArea className='chatbar-username' name='userName' placeholder='Your name (optional)' />
          <textArea className='chatbar-message' name='message' placeholder='Type a message and hit ENTER' />
        </div>
      </footer>
    );
  }
}
