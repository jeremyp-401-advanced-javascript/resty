import React from 'react';

import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <header>
        <div id="headerText">
          <h1 id="title">RESTy</h1>
          <h2 id="description">API Tester</h2>
        </div>
        <nav id="navMenu">
          <button id="navMenuButton">&equiv;</button>
          <div id="navMenuItems">
            <a class="center" alt="View Root Notes" href="/rootnotes/">View Root Notes</a>
            <a class="center" alt="Add Root Notes" href="/rootnotes/add/">Add Root Notes</a>
            <a class="center" alt="View Scales" href="/scales/">View Scales</a>
            <a class="center" alt="View Root Notes" href="/scales/add">Add a Scale</a>
            <a class="center" alt="View Root Notes" href="/about/">About PianoGraph</a>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;



