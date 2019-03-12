import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
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
