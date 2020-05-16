import React, { Component } from 'react';
import closeIcon from './../assets/close-icon.png';
import PrevIcon from './icons/PrevIcon';
import ExpandIcon from './../assets/expand.png';

class Header extends Component {

  render() {
    return (
      <div className="sc-header">
        {
          this.props.isPrevBtn ? (<PrevIcon onClick={this.props.onPrev}></PrevIcon>) : ''
        }
        <img className="sc-header--img" src={this.props.imageUrl} alt="" />
        <div className="sc-header--team-name"> {this.props.isPrevBtn ? this.props.toUser.name : this.props.teamName} </div>
        <div className="sc-header--expand-button" onClick={this.props.onExpand}>
          <img src={ExpandIcon} alt=""/>
        </div>
        <div className="sc-header--close-button" onClick={this.props.onClose}>
          <img src={closeIcon} alt="" />
        </div>
      </div>
    );
  }
}

export default Header;
