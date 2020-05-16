import React, { Component } from 'react';

class PrevIcon extends Component {

  render() {
    return (
      <button
        onClick={(e) => { e.preventDefault(); this.props.onClick(e); }}
        className="sc-user-input--send-icon-wrapper"
      >
        <svg
          version='1.1'
          className='sc-user-input--send-icon'
          xmlns='http://www.w3.org/2000/svg'
          x='0px'
          y='0px'
          width='37.393px'
          height='37.393px'
          viewBox='-6 -6 37.393 37.393'
          enableBackground='new 0 0 37.393 37.393'>
          <polyline fill="none" points="15.5,21 6.5,12 15.5,3 " stroke="#FFFFFF" strokeMiterlimit="10" strokeWidth="4"/>
        </svg>
      </button>
    );
  }
}

export default PrevIcon;
