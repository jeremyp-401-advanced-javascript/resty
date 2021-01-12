import React from 'react';

import './Form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ``,
      method: ``,
      results: ``,
    };
  }

  handleUrl = (event) => {
    let newUrl = event.target.value;
    this.setState({ url: newUrl });
  }

  handleMethod = (event) => {
    let newMethod = event.target.value;
    this.setState({ method: newMethod });
  }

  handleClick = (event) => {
    event.preventDefault();
    if (this.state.url && this.state.method) {
      let newResult = `${this.state.method} ${this.state.url}`;
      let newResultSet = `${newResult}
${this.state.results}`;
      this.setState({ results: newResultSet });
    }
  }

  render() {
    return (
      <div id='resty'>
        <form id='restyForm'>
          <fieldset id='restyUrlFields'>
            <legend>URL:</legend>
            <label for="restyUrl">
              <input type="text" id="restyUrlInput" name="restyUrl"
              placeholder="Enter a URL..." autoFocus onBlur={ this.handleUrl }></input>
              <button onClick={ this.handleClick } id='submitButton'>Go!</button>
            </label>
          </fieldset>
          <fieldset id='restyMethodFields' onChange={ this.handleMethod }>
            <legend>Choose a method:</legend>
              <label for="restyGet">
                <input type="radio" id="restyGet" name="restyMethod" value="GET"></input>
                <span>GET</span>
              </label>
              <label for="restyPost">
                <input type="radio" id="restyPost" name="restyMethod" value="POST"></input>
                <span>POST</span>
              </label>
              <label for="restyPut">
                <input type="radio" id="restyPut" name="restyMethod" value="PUT"></input>
                <span>PUT</span>
              </label>
              <label for="restyDelete">
                <input type="radio" id="restyDelete" name="restyMethod" value="DELETE"></input>
                <span>DELETE</span>
              </label>
          </fieldset>
          <fieldset id='restyResultsFields'>
            <legend>Results:</legend>
              <textarea value={ this.state.results } readOnly></textarea>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Form;