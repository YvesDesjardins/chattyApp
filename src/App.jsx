import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: '' },
      currentContent: '',
      messages: [{}],
      socket: {}
    };

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onTypingUser = this.onTypingUser.bind(this)
    this.onTypingMessage = this.onTypingMessage.bind(this)
  }

  componentDidMount() {
    const socket = new WebSocket('ws://192.168.88.161:3001');

    this.setState({ socket });
    socket.onmessage = (event) => {
      const { username, content } = JSON.parse(event.data);

      this.setState({
        messages: this.state.messages.concat({
          username,
          content
        })
      });
    }
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newMessage = {
        username: this.state.currentUser.name === '' ? 'Anonymous' : this.state.currentUser.name,
        content: this.state.currentContent,
      };
      this.state.socket.send(JSON.stringify(newMessage));
      this.setState({ currentContent: '' });
    }
  }
  onTypingUser(event) {
    this.setState({ currentUser: { name: event.target.value } })
  }
  onTypingMessage(event) {
    this.setState({ currentContent: event.target.value })
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar onKeyDown={this.onKeyDown} onTypingUser={this.onTypingUser} onTypingMessage={this.onTypingMessage} username={this.state.currentUser.name} content={this.state.currentContent} />
      </div>
    );
  }
}
export default App;
