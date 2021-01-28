import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab, faGithub } from '@fortawesome/free-brands-svg-icons'

import './Footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div id="footerText">
          <p>&copy;2021 - By Jeremy Penning</p>
        </div>
        <div id="footerLinks">
          <div class="footerLink">
            <a href="https://github.com/jeremyp-401-advanced-javascript/resty" target="_blank"
              rel="noopener noreferrer"><FontAwesomeIcon icon={["fab", "faGithub"]} />GitHub</a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;