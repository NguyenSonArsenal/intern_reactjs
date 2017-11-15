import React from 'react';
import {withGoogleMap, GoogleMap as Map, Marker} from 'react-google-maps';

import './Co-GoogleMapPlace.scss';

const GoogleMap = withGoogleMap(({children, ...rest}) =>
  <Map {...rest}>{children}</Map>
);

type Props = {
  onChange: Function
};

type States = {
  center: Object
};


class GoogleMapPlace extends React.Component <Props, States> {
  autocomplete: any; // properti
  placeSearchBox: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      center: {
        lat: 0, lng: 0 // Ha Noi
      }
    }
  }

  getDefaultCenter = () => {
    fetch('http://ipinfo.io/json').then((response) => response.json()).then((data) => {
      const location = data.loc;
      if (location) {
        const lat = parseFloat(location.split(',')[0]);
        const lng = parseFloat(location.split(',')[1]);
        this.setState({
          center: {lat, lng}
        });
      }
    });
  };

  componentDidMount() {
    this.getDefaultCenter();
    this.placeSearchBox = new window.google.maps.places.Autocomplete(this.autocomplete);
    this.placeSearchBox.addListener('place_changed', this.handleChange);
  }

  handleChange = () => {
    const place = this.placeSearchBox.getPlace();
    let position = place.geometry.location;

    this.setState({
      center: {
        lat: parseFloat(position.lat()),
        lng: parseFloat(position.lng()),
      }
    });

    if (this.props.onChange) {
      this.props.onChange(place.formatted_address);
    }
  };

  render() {
    return (
      <div className="div-component">
        <div className='input-place'>
          <input
            type="text"
            placeholder="Enter place ..."
            className="input-search-box"
            ref={(autocomplete) => (this.autocomplete = autocomplete)}
          />
        </div>
        <GoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={this.state.center}
          defaultZoom={14}
        >
          <Marker position={{lat: this.state.center.lat, lng: this.state.center.lng}} />
        </GoogleMap>
      </div>
    )
  }
}
export default GoogleMapPlace;
