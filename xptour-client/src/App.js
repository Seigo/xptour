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

          var service = new window.google.maps.places.PlacesService(map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
          service.nearbySearch({
            location: pos,
            radius: 500,
            type: ['restaurant']
          }, self.callback);
        })
      }
    }
  }

  callback = (results, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }

  createMarker = (place) => {
    let { markers } = this.state
    var placeLoc = place.geometry.location;
    console.log('', place)
    var m = {
      position: place.geometry.location,
      key: place.name,
      defaultAnimation: 2
    }
    markers.push(m)

    this.setState({
      markers: markers
    })

    // google.maps.event.addListener(marker, 'mouseover', function() {
    //   infowindow.setContent(place.name +
    //                         ' (' + place.rating + ')');
    //   infowindow.open(map, this);
    // });
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
