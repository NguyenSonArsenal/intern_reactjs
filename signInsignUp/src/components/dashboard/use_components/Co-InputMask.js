/* eslint-disable require-jsdoc */
import React from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import './Co-InputMask.scss';

type Props = {
  onChange: Function,
  value: number | null,
  placeholder?:string,
  prefix: string,
  suffix: string,
  allowDecimal: boolean,
  decimalLimit: number,
  mask?: Function,
  getRef?: Function,
  decimalSymbol: string,
  thousandsSeparatorSymbol: string,
  inputMaskType: string
};

type States = {
};

class InputMask extends React.Component <Props, States> {
  inputElement: ?HTMLInputElement; // properti

  constructor(props: Props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  formatNumber = (num: any) => {
    let input = num.substring(
      this.props.prefix.length,
      num.length-this.props.suffix.length
    ).trim();

    if (input == '') {
      return null;
    }

    if (input.indexOf(this.props.decimalSymbol) >= 0) {
      let res = input.split(this.props.decimalSymbol);
      return Number(res[0].replace(/\D/g, '') + this.props.decimalSymbol + res[1]);
    }

    return Number(input.replace(/\D/g, ''));
  };

  handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    (e.currentTarget: HTMLInputElement);
    let input = e.currentTarget.value;
    this.setState({ value: input });
    let res = this.formatNumber(input);
    this.props.onChange(res);
  };

  numberMask = () => {
    let obj = {
      prefix: this.props.prefix,
      suffix: this.props.suffix,
      allowDecimal: this.props.allowDecimal,
      decimalLimit: this.props.decimalLimit,
      allowLeadingZeroes: true,
      thousandsSeparatorSymbol: this.props.thousandsSeparatorSymbol,
      decimalSymbol: this.props.decimalSymbol
    };
    return createNumberMask(obj);
  };

  setCaretPosition = (ctrl: HTMLInputElement, pos: number) => {
    if (!ctrl) return;
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    } else if (ctrl.createTextRange) {
      const range = ctrl.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  handleInputFocus = () => {
    setTimeout(() => {
      if (this.inputElement) {
        const pos = this.inputElement.value.length - this.props.suffix.length;
        if (pos >= 0) this.setCaretPosition(this.inputElement, pos);
      }
    }, 0);
  };

  render() {
    return (
      <div className="co-inputmask-component">
        <MaskedInput
          mask = { this.numberMask() }
          className="input_mask"
          onChange = { this.handleInput }
          placeholder={ this.props.placeholder }
          type={ this.props.inputMaskType }
          value={ this.state.value }
          onFocus={ this.handleInputFocus }
          ref={ ref => {
            if (ref) {
              this.inputElement = ref.inputElement;
              if (this.props.getRef) this.props.getRef(ref.inputElement);
            }
          }}
        />
      </div>
    );
  }
}

export default InputMask;

