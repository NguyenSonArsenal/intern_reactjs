/* eslint-disable require-jsdoc */
import React from 'react';
import {withGoogleMap, GoogleMap as Map, Marker} from 'react-google-maps';
import FaClose from 'react-icons/lib/fa/close';

import './GoogleMapPlace.scss';

const GoogleMap = withGoogleMap(({children, ...rest}) =>
  <Map {...rest}>{children}</Map>
);

type Props = {
  handleCloseModal: Function,
  handleAddLocation: Function
};

type States = {
  center: Object,
  currentLocation: string
};

class GoogleMapPlace extends React.Component <Props, States> {
  autocomplete: any; // properti
  placeSearchBox: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      center: {
        lat: 0, lng: 0 // Ha Noi
      },
      currentLocation: ''
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
    this.placeSearchBox.addListener('place_changed', this.onChange);
  }

  onChange = () => {
    const place = this.placeSearchBox.getPlace();

    let position = place.geometry.location;

    this.setState({
      center: {
        lat: parseFloat(position.lat()),
        lng: parseFloat(position.lng()),
      },
      currentLocation: place.formatted_address
    });
  };

  handleAddLocation = () => {
    if (this.state.currentLocation) {
      if (this.props.handleAddLocation) {
        this.props.handleAddLocation(this.state.currentLocation);
      }
      this.closeModal();
    } else {
      alert('You must enter location or close modal');
    }

  };

  closeModal = () => {
    this.props.handleCloseModal(false);
  };

  render() {
    return (
      <div className="wrapper_component_googlemap">
        <div className="icon_close" onClick={this.closeModal}><FaClose /></div>
        <div className='div_input_place'>
          <div className="title_for_input_serach_box">Address</div>
          <input
            type="text"
            placeholder="Where do you want to learn ?"
            className="input_search_box_googlemap"
            ref={(autocomplete) => (this.autocomplete = autocomplete)}
          />
        </div>
        <GoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          containerElement={<div className="googlemap_containerElement" />}
          mapElement={<div style={{ height: `100%` }} />}
          center={this.state.center}
          defaultZoom={14}
          className="map_component"
        >
          <Marker position={{lat: this.state.center.lat, lng: this.state.center.lng}} />
        </GoogleMap>

        <div className="div_btn_control">
          <div
            className="btn_control btn_add"
            onClick={this.handleAddLocation}
          >
            Add
          </div>
          <div
            className="btn_control btn_cancel"
            onClick={this.closeModal}
          >
            Cancel
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleMapPlace;
