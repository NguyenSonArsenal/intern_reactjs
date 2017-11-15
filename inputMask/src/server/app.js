// src/server/app.js
// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import InputMask from '../components/InputMask.js';
import Text from '../components/Stateless.js';
import Test from '../components/test.js';

import '../styles/app.scss';

type Props = {};

type States = {
  inputMaskEnd: number | null,
  inputMaskDefaultValue: number | null,
  isShowFormCustomMask: number,
  isAccept: number,
  txtPrefixComponentDefault: string,
  txtSuffixComponentDefault: string,
  txtPrefixCustom:string,
  txtSuffixCustom:string,
  decimalLimit: number,
  allowDecimal: boolean,
  allowLeadingZeroes: boolean,
  placeholder: string,
  thousandsSeparatorSymbol: string,
  decimalSymbol: string,
  inputMaskType: string
};

class Todo extends React.Component <Props, States> {
  inputPrefix: ?HTMLInputElement;
  inputSuffix: ?HTMLInputElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      inputMaskEnd: null,
      inputMaskDefaultValue: 100,
      isShowFormCustomMask: 0,
      isAccept: 0,
      txtPrefixComponentDefault: '$',
      txtSuffixComponentDefault: ' per hour',
      txtPrefixCustom: '',
      txtSuffixCustom: '',
      decimalLimit: 5,
      allowDecimal: true,
      allowLeadingZeroes: true,
      placeholder: '$297.00 per hour',
      thousandsSeparatorSymbol: ' ',
      decimalSymbol: '.',
      inputMaskType: 'text'
    }
  }

  handleInputNumber = (res, input) => {
    // console.log('Input: ', input);
    // console.log('Res: ', res);
    let result = Number(res);
    if (result == 0) {
      console.log('input text mas: ' + '(' + typeof(res) + ')', res);
    } else {
      console.log('input text mas: ' + '(' + typeof(result) + ')', result);
    }

    this.setState({
      inputMaskEnd: result,
      inputMaskDefaultValue: input
    });
  };

  handleChangeTextPrefix = e => {
    this.setState({txtPrefixCustom: e.target.value});
  };

  handleChangeTextSuffix = e => {
    this.setState({txtSuffixCustom: e.target.value});
  };

  handleShowFormCustomMask = n => e => {
    this.setState({isShowFormCustomMask: n})
  };

  handleCustomMask = () => {
    this.setState({
      txtPrefixComponentDefault: this.state.txtPrefixCustom,
      txtSuffixComponentDefault: ' ' + this.state.txtSuffixCustom,
      isShowFormCustomMask: 0
    })
  };

  render() {
    return (
      <div className="wrapper">
        <Text
          onChange = { this.handleInputNumber }
          prefix = { this.state.txtPrefixComponentDefault }
          suffix = { this.state.txtSuffixComponentDefault }
          decimalLimit = { this.state.decimalLimit }
          allowDecimal = { this.state.allowDecimal }
          allowLeadingZeroes = { this.state.allowLeadingZeroes }
          placeholder = { this.state.placeholder }
          thousandsSeparatorSymbol = { this.state.thousandsSeparatorSymbol }
          decimalSymbol = { this.state.decimalSymbol }
          inputMaskType = { this.state.inputMaskType }
          value = { this.state.inputMaskDefaultValue }
        />
        <h1>Money Input Mask App</h1>
        <label className="lbl_test_input_mask">{this.state.inputMaskEnd}</label>
        <p
          className="title_custom_mask"
          onClick={ this.handleShowFormCustomMask(1) }
          title="click to custom mask"
        >
          Custom mask
        </p>
        {this.state.isShowFormCustomMask == 1 ?
          <div className="custom_mask">
            <div className="box_input">
              <label className="lbl_for_prefix_suffix">Prefix</label>
              <input
                className="input_text_mask"
                onChange={ this.handleChangeTextPrefix }
                ref={ (inputPrefix: ?HTMLInputElement) => {
                  this.inputPrefix = inputPrefix;
                } }
              />
            </div>
            <div className="box_input">
              <label className="lbl_for_prefix_suffix">Suffix</label>
              <input
                className="input_text_mask"
                onChange={this.handleChangeTextSuffix}
                ref={ (inputSiffix: ?HTMLInputElement) => {
                  this.inputSuffix = inputSiffix;
                } }
              />
            </div>
            <div className="box_input">
              <label className="lbl_for_prefix_suffix"></label>
              <div
                className="btn_control btn_accept"
                onClick={ this.handleCustomMask }
              >
                Accept
              </div>
              <div
                className="btn_control"
                onClick={ this.handleShowFormCustomMask(0) }
              >
                Cancel
              </div>
            </div>
          </div>
          : ''
        }
        </div>
    );
  }
}

// module.hot.accept();

ReactDOM.render(
  <Todo />,
  document.getElementById('app')
);
