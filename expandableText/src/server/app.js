// server/app.js

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import ExpandableText from '../components/ExpandableText.js';
import '../styles/ExpandableText.scss';

class Todo extends React.Component {
  constructor(){
    super();
    this.state = {
      txtTextAreaToTest: '',
      height: 0
    };
  };

  handleChangeInputTextArea = (e) => {
    this.setState({
      txtTextAreaToTest: e.target.value,
      // height: e.scrollHeight
    });
  };

  render() {
    return (
      <div>
        <ExpandableText maxHeight = {80}>
          <div>{this.state.txtTextAreaToTest}</div>
        </ExpandableText>
        <textarea
          className = "txtTest"
          autoFocus={true}
          rows = "15"
          name = "txtToTest"
          value = {this.state.txtTextAreaToTest}
          onChange = {this.handleChangeInputTextArea}
        />
      </div>
    );
  }
}

module.hot.accept();

ReactDOM.render(
  <Todo />,
  document.getElementById('app')
);
