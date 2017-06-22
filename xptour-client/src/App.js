import React, { Component } from 'react';
import './App.css';
import { Map } from './custom'

class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      markers: [
        // {
        //   position: {
        //     lat: 25.0112183,
        //     lng: 121.52067570000001,
        //   },
        //   key: `Taiwan`,
        //   defaultAnimation: 2,
        // }
      ]
    };
  }

  handleMapLoad = (map) => {
    this._mapComponent = map;

    if (map) {
      console.log(map);
      if (navigator.geolocation) {
          
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.panTo(pos);
          // new google.maps.Marker({
          //   position: pos,
          //   map: map,
          //   icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
          // }).setMap(map);
        })
      }
    }
  }

  render() {
    return (
      // <div style={{height: `100%`}}>
      <div style={{height: `800px`}}>
        <Map
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          //onMapClick={this.handleMapClick}
          markers={this.state.markers}
          //onMarkerRightClick={this.handleMarkerRightClick}
        />
      </div>
    );
  }
}

export default App;
