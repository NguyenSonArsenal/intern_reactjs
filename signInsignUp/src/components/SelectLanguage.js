import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { translate } from 'react-i18next';

class SelectLanguage extends Component {
  render() {
    const i18n = this.props.i18n;
    const changeLanguage = lng => i18n.changeLanguage(lng);

    return (
      <div className="select-language-component">
        <input
          type="radio"
          name="language"
          defaultChecked={true}
          onClick={() => changeLanguage('en')}
        />
        <label>en</label>
        <input
          type="radio"
          name="language"
          onClick={() => changeLanguage('vn')}
        />
        <label>vn</label>
      </div>
    );
  }
}

export default translate('translations')(SelectLanguage); // get t function and i18next content
