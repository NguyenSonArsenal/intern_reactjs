'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FlatRadioSwitch from "../components/FlatRadioSwitch.js";
import '../styles/app.scss';

class Todo extends React.Component {
  constructor(){
    super();
    this.state = {
      txtLeft : '',
      txtRight: ''
    };
  };

  handleChangeInputLabelOn(e) {
    this.setState({
      txtLeft: e.target.value
    });
  };

  handleChangeInputLabelOff(e) {
    this.setState({
      txtRight: e.target.value
    });
  };

  handChange(new_state){
    if(new_state == true)
      console.log('state has been changed to RIGHT');
    else
      console.log('state has been changed to LEFT');
  }

  render() {
    return (
      <div className="wrapper">
        <h3>App FlashRadioSwitch</h3>
        <div className="label on">
          <p>Label On</p>
          <input className="inputLabel" onChange={this.handleChangeInputLabelOn.bind(this)} type="text" placeholder="Enter label On"/>
        </div>
        <div className="label off">
          <p>Label Off</p>
          <input className="inputLabel" onChange={this.handleChangeInputLabelOff.bind(this)} type="text" placeholder="Enter label Off" />
        </div>
        <FlatRadioSwitch
          value={true}
          inputTxtLeft  = {this.state.txtLeft}
          inputTxtRight = {this.state.txtRight}
          onChange      = {this.handChange.bind(this)}
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



