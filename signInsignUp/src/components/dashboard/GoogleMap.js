import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import GoogleMapPlace from './use_components/Co-GoogleMapPlace.js';
import '../../styles/dashboard/GoogleMap.scss';

type Props = {};

type States = {
  location: string
};

class GoogleMap extends React.Component <Props, States>{
  scriptCache: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  changePlace = newPlace => {
    this.setState({location: newPlace});
  };

  render() {
    const { t } = this.props.i18next;
    return (
      <div className="googlemap-component">
        <h1 className="title">{t('app-google-map')}</h1>
        <div className="div-result">
          {this.state.location
            ?
            <div className="result">{t('place')}: {this.state.location}</div>
            :
            <div className="result">{t('result app google map')} !!!</div>
          }
        </div>
        <GoogleMapPlace
          onChange = {this.changePlace}
          className="map"
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

export default withRouter(connect(mapStateToProps)(GoogleMap));
