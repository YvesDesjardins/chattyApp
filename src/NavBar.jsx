import React from 'react';

export default function NavBar(props) {
  return (
    <header>
      <div className='navbar'>
        <div className='navbar-brand'>Chatty</div>
        <div className='navbar-usercount'>Users connected: {props.userCount}</div>
      </div>
    </header>
  );
}
