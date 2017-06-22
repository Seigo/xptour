import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={16}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    onClick={props.onMapClick}
  >
    {props.markers.map(marker => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(marker)}
      />
    ))}
  </GoogleMap>
));

export default Map