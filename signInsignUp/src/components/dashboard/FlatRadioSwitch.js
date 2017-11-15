import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import RadioSwitch from './use_components/RadioSwitch.js';
import '../../styles/dashboard/FlatRadioSwitch.scss';

type Props = {};

type States = {
};

class FlatRadioSwitch extends React.Component <Props, States> {
  constructor() {
    super();
    this.state = {
      txtLeft: '',
      txtRight: '',
      resultSwitch: 'LEFT'
    };
  }

  handleChangeInputLabelOn(e) {
    this.setState({
      txtLeft: e.target.value
    });
  }

  handleChangeInputLabelOff(e) {
    this.setState({
      txtRight: e.target.value
    });
  }

  handChange(newState) {
    if (newState == true) {
      this.setState({resultSwitch: 'RIGHT'})
    } else {
      this.setState({resultSwitch: 'LEFT'})
    }
  }
  render() {
    const { t, i18n } = this.props.i18next;
    return (
      <div className="flatradioswitch-component">
        <h3>{t('flatradioswitch')}</h3>
        <div className="centered on">
          <label className="lbl-on-off">{t('label-on')}</label>
          <input className="input-on-off" onChange={this.handleChangeInputLabelOn.bind(this)} type="text" placeholder="Enter label On"/>
        </div>
        <div className="centered off">
          <label className="lbl-on-off">{t('label-off')}</label>
          <input className="input-on-off" onChange={this.handleChangeInputLabelOff.bind(this)} type="text" placeholder="Enter label Off" />
        </div>
        <div className="result">
          {t('result')} : {this.state.resultSwitch}
        </div>
        <RadioSwitch
          value={true}
          inputTxtLeft = {this.state.txtLeft}
          inputTxtRight = {this.state.txtRight}
          onChange = {this.handChange.bind(this)}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isLogin: state.isLogin
  }
}

export default withRouter(connect(mapStateToProps)(FlatRadioSwitch));
