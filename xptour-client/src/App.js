import React, { Component } from 'react';
import './App.css';
import { Map } from './custom'

class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      markers: []
    };
  }

  handleMapLoad = (map) => {
    let self = this

    if (map) {
      // console.log(map);
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
                key: 'User position',
                defaultAnimation: 2,
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                infowindow: {
                  visible: true,
                  name: 'You are here'
                }
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
    console.log('', place)
    // const infoWindowText = place.name + ' (' +
    //         place.rating ? place.rating : 'not rated' +
    //         ')'
    // // result: 4.6
    const infoWindowText = place.name + ' (' +
            (place.rating ? place.rating : 'not rated') +
            ')'
    // result: Pizzaria Massa Fera (4.6)
    var m = {
      position: place.geometry.location,
      key: place.name,
      defaultAnimation: 2,
      infowindow: {
        visible: false,
        name: infoWindowText
      }
    }

    markers.push(m)

    this.setState({
      markers: markers
    })
  }

  handleMarkerMouseOver = (marker) => {
    let { markers } = this.state
    let index = undefined
    markers.forEach((m, i, arr) => {
      if (m.key === marker.key) {
        index = i
        return
      }
    })
    markers[index].infowindow.visible = true
    this.setState({
      markers: markers
    })
  }

  handleMarkerMouseOut = (marker) => {
    let { markers } = this.state
    let index = undefined
    markers.forEach((m, i, arr) => {
      if (m.key === marker.key) {
        index = i
        return
      }
    })
    markers[index].infowindow.visible = false
    this.setState({
      markers: markers
    })
  }

  render() {
    return (
      <div style={{height: `800px`}}>
        <Map
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          markers={this.state.markers}
          onMarkerMouseOver={this.handleMarkerMouseOver}
          onMarkerMouseOut={this.handleMarkerMouseOut}
        />
      </div>
    );
  }
}

export default App;
