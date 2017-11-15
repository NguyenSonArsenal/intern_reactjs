import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import InputMaskComponent from './use_components/Co-InputMask.js';

import '../../styles/dashboard/InputMask.scss';

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

class InputMask extends React.Component <Props, States> {
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
    let result = Number(res);
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
    const { t } = this.props.i18next;
    return (
      <div className="inputmask-component">
        <h1 className="title">{t('title-input-mask')}</h1>
        <InputMaskComponent
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
        {this.state.inputMaskEnd
          ?
            <label className="lbl_test_input_mask">{t('result')}: {this.state.inputMaskEnd}</label>
          :
            ''
        }
        <p
          className="title_custom_mask"
          onClick={ this.handleShowFormCustomMask(1) }
          title="click to custom mask"
        >
          {t('custom_mask')}
        </p>
        {this.state.isShowFormCustomMask == 1 ?
          <div className="custom_mask">
            <div className="box_input">
              <label className="lbl_for_prefix_suffix">{t('prefix')}</label>
              <input
                className="input_text_mask"
                onChange={ this.handleChangeTextPrefix }
                ref={ (inputPrefix: ?HTMLInputElement) => {
                  this.inputPrefix = inputPrefix;
                } }
              />
            </div>
            <div className="box_input">
              <label className="lbl_for_prefix_suffix">{t('suffix')}</label>
              <input
                className="input_text_mask"
                onChange={this.handleChangeTextSuffix}
                ref={ (inputSiffix: ?HTMLInputElement) => {
                  this.inputSuffix = inputSiffix;
                } }
              />
            </div>
            <div className="box_input btn">
              <div
                className="btn_control btn_accept"
                onClick={ this.handleCustomMask }
              >
                {t('accept')}
              </div>
              <div
                className="btn_control"
                onClick={ this.handleShowFormCustomMask(0) }
              >
                {t('cancel')}
              </div>
            </div>
          </div>
          : ''
        }
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.isLogin
  }
}

export default withRouter(connect(mapStateToProps)(InputMask));
