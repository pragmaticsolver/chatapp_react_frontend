import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import {setUser} from '../services/user.service';

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowType: 0,
      name: '',
      email: ''
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onRegister() {
    let data = {
      name: this.state.name,
      email: this.state.email
    };

    fetch('http://localhost:8080/api/users', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
      return null;
    })
    .then((jsonData) => {
      if (jsonData) {
        // localStorage.setItem('user', JSON.stringify(jsonData));
        setUser(jsonData);
        this.props.onRegistered(jsonData)
      }
      console.log(jsonData);
    });
  }

  render() {
    
    return (
        <div className="sc-register-view">
            <div className="login-wrapper">
                <div className="input-item">
                    <label className="label">
                      Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="input-field"
                      value={this.state.name}
                      onChange={this.handleInputChange.bind(this)} />
                </div>
                <div className="input-item">
                    <label className="label">
                      Email
                    </label>
                    <input
                      name="email"
                      type="text"
                      className="input-field"
                      value={this.state.email}
                      onChange={this.handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="btn-wrapper">
              <button className="register-btn" onClick={this.onRegister.bind(this)}>Register</button>
            </div>
        </div>
    );
  }
}

export default RegisterView;
