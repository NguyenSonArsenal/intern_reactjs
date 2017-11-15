import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

import i18n from '../../helpers/i18n';
import Routes from './Routes';

// append app to dom
ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Routes />
  </I18nextProvider>,
  document.getElementById('app')
);
