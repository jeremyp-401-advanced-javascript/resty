import React from 'react';
import ReactJson from 'react-json-view';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <fieldset id='restyResultsFields'>
        <legend>Results:</legend>
        <div id='apiResults'>
          <span class='strong'>{this.props.method}</span>&nbsp;<span>{this.props.url}</span>
          <ReactJson src={this.props.headers} name='Headers' />
          <ReactJson src={this.props.result} name='Response' />
        </div>
      </fieldset>
    )
  }
}

export default Results;