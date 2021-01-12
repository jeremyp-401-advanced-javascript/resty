import React from 'react';
import Header from './Header';
import Form from './Form';
import Footer from './Footer';

import './App.scss';
import './reset.scss';

class App extends React.Component {

  render() {
    return (
      <>
        <Header />
        <Form />
        <Footer />
      </>
    )
  }
}

export default App;
