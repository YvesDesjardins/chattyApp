import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: { name: 'Bob' },
      messages: [{
        username: 'Bob',
        content: 'Has anyone seen my marbles?',
      },
      {
        username: 'Anonymous',
        content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
      }],
    };
  }
  render() {
    return (
      <fragment>
        <NavBar />
        <MessageList />
        <ChatBar />
      </fragment>
    );
  }
}
export default App;
