import React from 'react';
import Results from '../Results/Results';

import './Form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleUrl = (event) => {
    let newUrl = event.target.value;
    this.props.updateState({ url: newUrl });
  }

  handleMethod = (event) => {
    let newMethod = event.target.value;
    this.props.updateState({ method: newMethod });
  }

  handleRequestBody = (event) => {
    let newRequestBody = event.target.value;
    this.props.updateState({ requestBody: newRequestBody });
  }

  prepResults = e => {
    e.preventDefault();
    this.getResults();
    this.props.updateState({ displayResults: true })
  }

  useHistoryItem = (e, idx) => {
    e.preventDefault();
    // TODO: Need to get the index from a link on the history list on the page.
    //let historyItemIdx = event.target.value;

    let historyItemIdx = idx;

    let historyList = this.props.requestHistory;
    let url = historyList[historyItemIdx].url;
    let requestOptions= historyList[historyItemIdx].requestOptions;
    
    this.props.updateState({ url });
    this.props.updateState({ method: requestOptions.method })
    this.props.updateState({ displayResults: true })

    this.getResultsFromHistory(e, url, requestOptions);
  }

  getResultsFromHistory = async (e, url, requestOptions) => {
    let responseHeaders = {};

    const result = await fetch(url, requestOptions)
      .then(response => {
        if (response.status === 200) {
          // Get headers from the response
          for (var pair of response.headers.entries()) {
            responseHeaders[pair[0]] = pair[1];
          }
          return response.json();
        } else {
          return;
        }
      });
    this.props.updateState({ result: result });
    this.props.updateState({ headers: responseHeaders });
  }

  getResults = async (e) => {
    const url = this.props.url;
    const method = this.props.method;
    let requestOptions;
    let requestHeaders = { "content-type": "application/json; charset=UTF-8" }
    let responseHeaders = {};
    let historyItem = [];

    let requestBody = this.props.requestBody;

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
          // If the call was successful, add it to the history.
          historyItem = {
            url,
            requestOptions
          }
          let historyList = this.props.requestHistory;
          historyList.push(historyItem);
          this.props.updateState({ requestHistory: historyList });
          // Get headers from the response
          for (var pair of response.headers.entries()) {
            responseHeaders[pair[0]] = pair[1];
          }
          return response.json();
        } else {
          return;
        }
      });
    this.props.updateState({ result: result });
    this.props.updateState({ headers: responseHeaders });

  }

  render() {
    console.log(this.props);
    return (
      <div id='resty'>
        <form id='restyForm'>
          <fieldset id='restyUrlFields'>
            <legend>URL:</legend>
            <label for="restyUrl">
              <input type="text" id="restyUrlInput" name="restyUrl"
                placeholder="Enter a URL..." autoFocus onBlur={this.handleUrl}></input>
              {this.props.requestHistory.length ?
                <button onClick={this.useHistoryItem} id='historyButton'>History</button>
                : ''
              }  
              <button onClick={this.prepResults} id='submitButton'>Go!</button>
            </label>
              
          </fieldset>
          <fieldset id="restyHistoryList">
            <legend>History:</legend>
            <ul id="historyList">
              {this.props.requestHistory.length ?
                this.props.requestHistory.forEach((histItem, idx) => {
                  console.log(`histItem at ${idx}`, histItem);
                  <li onClick={() => this.getResultsFromHistory(idx)} key={idx}>
                    <span><span class="strong">{histItem.requestOptions.method}</span> {histItem.url}</span>
                  </li>
                })
              :
                <li>No history to show.</li>
              }
            </ul>
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
          {(this.props.method === 'POST' || this.props.method === 'PUT') ?
            <fieldset id='restyRequestBody'>
              <legend>Request Body:</legend>
              <textarea name='requestBody' onBlur={this.handleRequestBody}></textarea>
            </fieldset>
            : ""
          }

          {!this.props.displayResults ? '' :
            <Results
              url={this.props.url}
              method={this.props.method}
              result={this.props.result}
              headers={this.props.headers}
              updateState={this.props.updateState}
            />
          }
        </form>
      </div>
    )
  }
}

export default Form;