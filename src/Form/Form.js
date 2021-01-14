import React from 'react';
import Results from '../Results/Results';

import './Form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayResults: false,
      url: ``,
      method: ``,
      result: {},
      headers: {},
      requestBody: {}
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

  handleRequestBody = (event) => {
    let newRequestBody = event.target.value;
    this.setState({ requestBody: newRequestBody });
  }

  prepResults = e => {
    e.preventDefault();
    this.getResults();
    this.setState({ displayResults: true })
  }

  getResults = async (e) => {
    const url = this.state.url;
    const method = this.state.method;
    let requestOptions;
    let requestHeaders = { "content-type": "application/json; charset=UTF-8" }
    let responseHeaders = {};

    let requestBody = this.state.requestBody;

    switch (method) {
      case 'GET':
        requestOptions = { method: method, mode: 'cors' };
        break;
      case 'POST':
        requestOptions = { method: method, headers: requestHeaders, body: requestBody, mode: 'cors' };
        break;
      case 'PUT':
        requestOptions = { method: method, headers: requestHeaders, body: requestBody, mode: 'cors' };
        break;
      case 'DELETE':
        requestOptions = { method: method, mode: 'cors' };
        break;
      default:
        requestOptions = {};
        break;
    }

    const result = await fetch(url, requestOptions)
      .then(response => {
        if (response.status === 200) {
          for (var pair of response.headers.entries()) {
            responseHeaders[pair[0]] = pair[1];
          }
          return response.json();
        } else {
          return;
        }
      });
    this.setState({ result: result });
    this.setState({ headers: responseHeaders });

  }

  render() {
    return (
      <div id='resty'>
        <form id='restyForm'>
          <fieldset id='restyUrlFields'>
            <legend>URL:</legend>
            <label for="restyUrl">
              <input type="text" id="restyUrlInput" name="restyUrl"
                placeholder="Enter a URL..." autoFocus onBlur={this.handleUrl}></input>
              <button onClick={this.prepResults} id='submitButton'>Go!</button>
            </label>
          </fieldset>
          <fieldset id='restyMethodFields' onChange={this.handleMethod}>
            <legend>Choose a method:</legend>
            <label for="restyGet">
              <input type="radio" id="restyGet" name="restyMethod" value="GET"></input>
              <span>GET</span>
              {/* For a GET I don't think I need to do anything special. */}
            </label>
            <label for="restyPost">
              <input type="radio" id="restyPost" name="restyMethod" value="POST"></input>
              <span>POST</span>
              {/* For a POST I need to show an input box to add in some JSON to send with my request */}
            </label>
            <label for="restyPut">
              <input type="radio" id="restyPut" name="restyMethod" value="PUT"></input>
              <span>PUT</span>
              {/* For a PUT I need to show an input box to add in some JSON to send with my request */}
            </label>
            <label for="restyDelete">
              <input type="radio" id="restyDelete" name="restyMethod" value="DELETE"></input>
              <span>DELETE</span>
              {/* For a DELETE I don't think I need to do anything special. */}
            </label>
          </fieldset>
          {(this.state.method === 'POST' || this.state.method === 'PUT') ?
            <fieldset id='restyRequestBody'>
              <legend>Request Body:</legend>
              <textarea name='requestBody' onBlur={this.handleRequestBody}></textarea>
            </fieldset>
            : ""
          }

          {!this.state.displayResults ? '' :
            <Results
              url={this.state.url}
              method={this.state.method}
              result={this.state.result}
              headers={this.state.headers}
            />
          }
        </form>
      </div>
    )
  }
}

export default Form;