import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import { emitToGetUsers, sendNewUserMessage } from '../services/socket.api';
import { getUser } from '../services/user.service';
import { getNewMessageList, removeNewMessageCount } from '../services/message.service';


class ChatListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowType: 0,
      name: '',
      email: ''
    }
  }

  componentDidMount() {
    let user = getUser();//JSON.parse(localStorage.getItem('user') || '{}');

    if (user.email) {
        sendNewUserMessage(user, null);
    }
  }

  render() {
    let allusers = this.props.users || [];
    let user = getUser();//JSON.parse(localStorage.getItem('user') || '{}');
    let newMessageCountList = this.props.newMessageCountList || {};

    console.log(newMessageCountList);
    let otherUsers = [];
    for (let i=0; i<allusers.length; i++) {
        if (allusers[i].email != user.email) {
            otherUsers.push(allusers[i]);
        }
    }

    return (
        <div className="sc-chat-list-view">
            <div className="chat-item-wrapper">
                {
                    otherUsers.map((item, index) => {
                        return (
                            <div key={index} className="chat-item" onClick={() => this.props.onChatUserClick(item)}>
                                <img className="sc-header--img" src="https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png" alt="" />
                                <span className={item.isOnline ? "online-mark online" : "online-mark offline"}></span>
                                <div className="sc-header--team-name"> {item.name} </div>
                                {
                                  newMessageCountList[item.email] ? (
                                    <span className="chat-item-new-message-count">{newMessageCountList[item.email]}</span>
                                  ) : ''
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
  }
}

export default ChatListView;
