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
      messages: [{
        username: 'Bob',
        content: 'Has anyone seen my marbles?',
      },
      {
        username: 'Anonymous',
        content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
      }],
    };

    this.onTyping = this.onTyping.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: 'Michelle', content: 'Hello there!' };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newMessage = {
        username: this.state.currentUser.name === '' ? 'Anonymous' : this.state.currentUser.name,
        content: this.state.currentContent,
      };
      this.setState({
        messages: this.state.messages.concat(newMessage),
        currentContent: '',
      });
    }
  }
  onTyping(event) {
    this.setState({ currentContent: event.target.value })
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} />
        <ChatBar onKeyDown={this.onKeyDown} onTyping={this.onTyping} username={this.state.currentUser.name} content={this.state.currentContent} />
      </div>
    );
  }
}
export default App;
