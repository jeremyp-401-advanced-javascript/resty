import React from 'react';
import Header from '../Header/Header';
import Form from '../Form/Form';
import Footer from '../Footer/Footer';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayResults: false,
      url: ``,
      method: ``,
      result: {},
      headers: {},
      requestBody: {},
      requestHistory: []
    }
  }

  // A universal, do everything, parent state updater.
  // It's like setState(), but more like the AngularJS $rootScope
  // Just pass it down from child to sub-child, ???, profit!
  updateState = (stateObject) => {
    this.setState(stateObject)
  }

  render() {
    console.log(`this.state`, this.state);
    return (
      <>
        <Header />
        <Form
          displayResults={this.state.displayResults}
          url={this.state.url}
          method={this.state.method}
          result={this.state.result}
          headers={this.state.headers}
          requestBody={this.state.requestBody}
          requestHistory={this.state.requestHistory}
          updateState={this.updateState}
        />
        <Footer />
      </>
    )
  }
}

export default App;
