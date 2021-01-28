import React from 'react';

import './Header.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
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
          {this.state.showMenu ?
            <div id="navMenuItems">
              <a class="center" alt="View Root Notes" href="/rootnotes/">Home</a>
              <a class="center" alt="Add Root Notes" href="/rootnotes/add/">History</a>
              <a class="center" alt="View Root Notes" href="/about/">About</a>
            </div>
          :
            <li>No history to show.</li>
          }
        </nav>
      </header>
    )
  }
}

export default Header;



