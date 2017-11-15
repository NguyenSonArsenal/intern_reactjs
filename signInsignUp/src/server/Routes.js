// src/server/app.js
// @flow

import React from 'react';
import { Route, BrowserRouter, HashRouter, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import { translate } from 'react-i18next';

import Header from '../components/helpers/Header.js';
import Login from '../components/authenticate/Login.js';
import Home from '../components/Home.js';
import ResetPassword from '../components/authenticate/ResetPassword.js';
import ReactModal from '../components/dashboard/index.js';
import FlatRadioSwitch from '../components/dashboard/FlatRadioSwitch.js';
import ExpandableText from '../components/dashboard/ExpandableText.js';
import GoogleMap from '../components/dashboard/GoogleMap.js';
import InputMask from '../components/dashboard/InputMask.js';

import '../styles/app.scss';
import reducer from '../reducers';
// import i18n from '../../helpers/i18n.js';

let redux = require('redux');

let store = createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

type Props = {};

type States = {};

class Routes extends React.Component <Props, States> {

  render() {
    const i18next = this.props;
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="app">
            <Header i18next={i18next}/>
            <Route
              exact path='/'
              render={props => <Home {...props } i18next={i18next} />}
            />
            <Route
              path='/login'
              render={props => <Login {...props } i18next={i18next} />}
            />
            <Route
              path='/reset'
              render={props => <ResetPassword {...props } i18next={i18next} />}
            />
            <Route exact
              path='/dashboard'
              render={props => <ReactModal {...props } i18next={i18next}/>}
            />
            <Route
              path='/dashboard/lession1'
              render={props => <FlatRadioSwitch {...props } i18next={i18next} />}
            />
            <Route
              path='/dashboard/lession3'
              render={props => <ExpandableText {...props } i18next={i18next} />}
            />
            <Route
              path='/dashboard/lession5'
              render={props => <GoogleMap {...props } i18next={i18next} />}
            />
            <Route
              path='/dashboard/lession6'
              render={props => <InputMask {...props } i18next={i18next} />}
            />
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default translate('translations')(Routes); // get t function and i18next content
