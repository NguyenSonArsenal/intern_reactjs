// server/app.js

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux';
let redux = require('redux');

import reducer from '../reducers';
import '../styles/AvatarBlurbSkill.scss';
import AvatarBlurbSkill from '../components/AvatarBlurbSkill.js';

let store = createStore(reducer, redux.compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));


class Todo extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="wrapper">
          <AvatarBlurbSkill />
        </div>
      </Provider>
    );
  }
}

module.hot.accept();

ReactDOM.render(
  <Todo />,
  document.getElementById('app')
);
