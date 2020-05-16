import React, { Component } from 'react';
import Message from './Messages';
import {getUser} from '../services/user.service';
import { removeNewMessageCount } from '../services/message.service';

class MessageList extends Component {

  componentDidUpdate(_prevProps, _prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  componentWillUnmount() {
    removeNewMessageCount(this.props.to);
  }

  render () {
    const { to, messages } = this.props;
    // let user = JSON.parse(localStorage.getItem('user') || '{}');
    let user = getUser();
    let messageList = [];

    for (var i=0; i<messages.length; i++) {
      if (messages[i].to._id == to._id && messages[i].from._id == user._id || messages[i].to._id == user._id && messages[i].from._id == to._id) {
        messageList.push(messages[i]);
      }
    }

    return (
      <div className="sc-message-list" ref={el => this.scrollList = el}>
        {messageList.map((message, i) => {
          return <Message message={message} key={i} />;
        })}
      </div>);
  }
}

export default MessageList;
