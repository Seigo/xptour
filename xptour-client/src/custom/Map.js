import React from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'

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
        onMouseOver={() => {props.onMarkerMouseOver(marker)}}
        onMouseOut={() => {props.onMarkerMouseOut(marker)}}
      >
        {
          marker.infowindow && marker.infowindow.visible
              ? (<InfoWindow
                  >
                    <div>{marker.infowindow.name}</div>
                  </InfoWindow>)
              : <div id='empty infowindow'></div>
        }
      </Marker>
    ))}
    
  </GoogleMap>
));

export default Map