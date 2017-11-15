// Try HTML5 geolocation.
if (navigator && navigator.geolocation) {
  console.log(123678);
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log(123);
    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;
    let position = new google.maps.LatLng(lat, lng);
    this.setState({
      center: {
        lat,
        lng
      }
    });
    let geocoder= new google.maps.Geocoder();
    geocoder.geocode({'latLng': position}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          let locationCurrently = results[0].formatted_address;
          console.log(locationCurrently);
        } else {
          alert('No results found');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  });
}

if (prevProps.google !== this.props.google) {
  this.loadMap();
}

<MapWithASearchBox
  className="map"
  center={this.state.center}
/>

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
)( (props) =>
  <GoogleMap
    defaultZoom={14}
    center={props.center}
  >
    <Marker position={{lat: props.center.lat, lng: props.center.lng}} />
  </GoogleMap>
);

<GoogleMapPlace onChange = {this.changePlace} />
