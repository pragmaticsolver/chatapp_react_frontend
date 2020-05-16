import React, {Component} from 'react';
import {render} from 'react-dom';
import {Launcher} from './ChatComponent';
import messageHistory from './messageHistory';
import TestArea from './TestArea';
import Header from './Header';
import Footer from './Footer';
// import monsterImgUrl from './../assets/monster.png';
import './styles';
import { getMessage, sendMessage, getOnlineUsers, disconnectUser  } from './ChatComponent/services/socket.api';
import { setNewMessage, getNewMessageList } from './ChatComponent/services/message.service';
import { getUser } from './ChatComponent/services/user.service';

class Demo extends Component {

  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: false,
      onlineUsers: [],
      chatUsers: [],
      newMessagesCountForEachUser: []
    };

    getMessage((err, data) => {
      setNewMessage(data);
      console.log(data);
      data.author = "them";
      this.setState({
        newMessagesCount: this.state.newMessagesCount + 1,
        messageList: [...this.state.messageList, data],
        newMessageCountList: getNewMessageList()
      });
    })

    getOnlineUsers((err, data) => {
      console.log(data);
      this.setState({
        onlineUsers: data
      })
    })
  }

  componentDidMount() {
    // socket.on("message", data => {
    //   console.log(data);
    // })
    
  }

  componentWillUnmount() {
    window.alert("hello");
    let user = getUser();
    disconnectUser(user);
  }

  _onMessageWasSent(message) {
    sendMessage(message, null);
    // socket.emit('send-message', message);
    this.setState({
      messageList: [...this.state.messageList, message]
    });
  }

  _onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);
    this.setState({
      messageList: [...this.state.messageList, {
        type: 'file', author: 'me',
        data: {
          url: objectURL,
          fileName: fileList[0].name
        }
      }]
    });
  }

  _sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1;
      
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      });
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    });
  }

  render() {
    return <div>
      {/* <Header />
      <TestArea
        onMessage={this._sendMessage.bind(this)}
      /> */}
      <Launcher
        agentProfile={{
          teamName: 'react-chat-window',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        onFilesSelected={this._onFilesSelected.bind(this)}
        userList={this.state.onlineUsers}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        newMessageCountList={this.state.newMessageCountList}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        showEmoji
      />
      {/* <img className="demo-monster-img" src={monsterImgUrl} /> */}
      {/* <Footer /> */}
    </div>;
  }
}

export default Demo;
// render(<Demo/>, document.querySelector('#demo'));
