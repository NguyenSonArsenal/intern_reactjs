// server/app.js

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import GoogleMapPlace from '../components/GoogleMapPlace.js';

class Todo extends React.Component {
  scriptCache: any;

  changePlace = (newPlace) => {
    let place = newPlace;
    console.log('Place changed, new place is: ' + place);
  };
  render() {
    return (
      <div className="wrapper">
        <h1>This is the Google Map Place in React App dddd</h1>
        <GoogleMapPlace onChange = {this.changePlace} />
      </div>
    );
  }
}

module.hot.accept();

ReactDOM.render(
  <Todo />,
  document.getElementById('app')
);
