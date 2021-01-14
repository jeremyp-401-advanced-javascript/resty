import React from 'react';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Footer from '../Footer/Footer';

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
