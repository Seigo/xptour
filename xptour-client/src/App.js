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
    let self = this

    if (map) {
      console.log(map);
      if (navigator.geolocation) {
          
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          map.panTo(pos);
          self.setState({
            markers: [
              {
                position: pos,
                key: 'HEre',
                defaultAnimation: 2,
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
              }
            ]
          })

          // var service = new google.maps.places.PlacesService(map);
          // service.nearbySearch({
          //   location: pos,
          //   radius: 500,
          //   type: ['restaurant']
          // }, callback);
          
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
