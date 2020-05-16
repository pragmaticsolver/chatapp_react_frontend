import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import RegisterView from './RegisterView';
import ChatListView from './ChatListView';
import { sendNewUserMessage } from '../services/socket.api';
import { getUser } from '../services/user.service';
import { removeNewMessageCount } from '../services/message.service';

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowType: 0,
      name: '',
      email: '', 
      isExpand: false
    }
  }

  componentDidMount() {
    let user = getUser();//JSON.parse(localStorage.getItem('user') || '{}');

    if (user.email) {
      this.setState({
        windowType: 1,
        toUser: {}
      })
    }
  }

  onUserInputSubmit(message) {
    message.to = this.state.toUser;
    let user = getUser();//JSON.parse(localStorage.getItem('user') || '{}');
    message.from = user;
    this.props.onUserInputSubmit(message);
  }

  onFilesSelected(filesList) {
    this.props.onFilesSelected(filesList);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onRegistered(data) {
    // api request for register user
    sendNewUserMessage(data);

    // if success callback
    this.setState({
      windowType: 1
    });
  }

  onChatUserClick(to) {
    removeNewMessageCount(to);
    // if success callback
    this.setState({
      windowType: 2,
      toUser: to
    });
  }

  onPrev() {
    this.setState({
      windowType: 1
    });
  }

  onExpand() {
    this.setState({
      isExpand: !this.state.isExpand
    });
  }

  render() {
    let messageList = this.props.messageList || [];
    let userList = this.props.userList || [];
    let newMessageCountList = this.props.newMessageCountList || {};

    let classList = [
      'sc-chat-window',
      (this.props.isOpen ? 'opened' : 'closed'),
      (this.state.isExpand ? 'expanded' : '')
    ];
    return (
      <div className={classList.join(' ')}>
        <Header
          teamName={this.props.agentProfile.teamName}
          imageUrl={this.props.agentProfile.imageUrl}
          onClose={this.props.onClose}
          onExpand={this.onExpand.bind(this)}
          onPrev={this.onPrev.bind(this)}
          isPrevBtn={this.state.windowType == 2}
          toUser={this.state.toUser}
        />
        {
          this.state.windowType == 0 ? (
            <React.Fragment>
              <RegisterView onRegistered={this.onRegistered.bind(this)}/>
            </React.Fragment>
          ) : this.state.windowType == 1 ? (
            <React.Fragment>
              <ChatListView users={userList} newMessageCountList={newMessageCountList} onChatUserClick={this.onChatUserClick.bind(this)}/>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <MessageList
                to={this.state.toUser}
                messages={messageList}
                imageUrl={this.props.agentProfile.imageUrl}
              />
              <UserInput
                onSubmit={this.onUserInputSubmit.bind(this)}
                onFilesSelected={this.onFilesSelected.bind(this)}
                showEmoji={this.props.showEmoji}
              />
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

ChatWindow.propTypes = {
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool
};

export default ChatWindow;
