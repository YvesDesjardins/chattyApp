import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: '' },
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
        <MessageList messages={this.state.messages} />
        <ChatBar username={this.state.currentUser.name} />
      </fragment>
    );
  }
}
export default App;
