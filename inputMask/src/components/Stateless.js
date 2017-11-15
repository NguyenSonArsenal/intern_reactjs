// @flow

import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import '../styles/InputMask.scss';

const Text = (props: propTypes) => {
  let inputElement;

  const formatNumber = (num: any) => {
    // console.log('zo fomat');
    let input = num.substring(
      props.prefix.length,
      num.length - props.suffix.length
    ).trim();

    if (input == '') {
      return null;
    }
    let length = input.length;
    console.log(length);
    if (input[length-1] != null || input[length-1] != undefined) {
      if (input.indexOf(props.decimalSymbol) >= 0) {
        if (input[length-1] != props.decimalSymbol) {
          console.log('ccc');
          let res = input.split(props.decimalSymbol);
          console.log(res);
          console.log(res[1]);
          return Number(res[0].replace(/\D/g, '') + props.decimalSymbol + res[1]);
        } else if (input[length-1] === props.decimalSymbol) {
          console.log('ddd');
          let res = input.split(props.decimalSymbol);
          return res[0].replace(/\D/g, '') + props.decimalSymbol;
        }
      }
    }

    return Number(input.replace(/\D/g, ''));
  };

  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    (e.currentTarget: HTMLInputElement);
    let input = e.currentTarget.value;
    console.log(input);
    let res = formatNumber(input);
    console.log(res);
    props.onChange(res, input);
  };

  const numberMask = () => {
    let obj = {
      prefix: props.prefix,
      suffix: props.suffix,
      allowDecimal: props.allowDecimal,
      decimalLimit: props.decimalLimit,
      allowLeadingZeroes: props.allowLeadingZeroes,
      thousandsSeparatorSymbol: props.thousandsSeparatorSymbol,
      decimalSymbol: props.decimalSymbol
    };
    return createNumberMask(obj);
  };

  const setCaretPosition = (ctrl: HTMLInputElement, pos: number) => {
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
  };

  const handleInputFocus = () => {
    setTimeout(() => {
      if (inputElement) {
        const pos = inputElement.value.length - props.suffix.length;
        if (pos >= 0) setCaretPosition(inputElement, pos);
      }
    }, 0);
  };

  return (
    <div className="div_component">
      <MaskedInput
        mask={ numberMask() }
        className="input_mask"
        placeholder={ props.placeholder }
        onChange={ handleInput }
        onFocus={ handleInputFocus }
        ref={ ref => {
          if (ref) {
            inputElement = ref.inputElement;
            if (props.getRef) props.getRef(ref.inputElement);
          }
        } }
        type={ props.inputMaskType }
        value={ props.value }
      />
    </div>
  );
};

Text.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number || null,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  allowDecimal: PropTypes.bool,
  allowLeadingZeroes: PropTypes.bool,
  decimalLimit: PropTypes.number,
  mask: PropTypes.func,
  getRef: PropTypes.func,
  decimalSymbol: PropTypes.string,
  thousandsSeparatorSymbol: PropTypes.string,
  inputMaskType: PropTypes.string
};

export default Text;
