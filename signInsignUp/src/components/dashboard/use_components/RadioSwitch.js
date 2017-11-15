'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import './RadioSwitch.scss';

const bgDefaultOn = '#00e1df';
const bgDefaultOff = 'white';

export default class FlatRadioSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.value,
    };
    this.handleSwitchBg = this.handleSwitchBg.bind(this);
  };

  handleSwitchBg(e) {
    let classname = e.target.className;
    if (classname != 'bgOn') {
      this.setState({
        status: !this.state.status
      });
      this.props.onChange(this.state.status);
    } else {
      return;
    }
  }

  render() {
    const classes = classnames('bgOn');
    return (
      <div className="radioswitch-component">
        <div
          className={this.state.status == true ? 'bgOn' : ''}
          onClick={this.handleSwitchBg} >
            {this.props.inputTxtLeft}
        </div>
        <div
          className={this.state.status != true ? 'bgOn' : ''}
          onClick={this.handleSwitchBg} >
            {this.props.inputTxtRight}
        </div>
      </div>
    );
  }
}

module.hot.accept(); // apply hot reloading, if no, the page will reload when change somthing
