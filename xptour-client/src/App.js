import React, { Component } from 'react';
import './App.css';
import { Map } from './custom'
import { MoreInfoBox } from './MoreInfoBox'

class App extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      markers: [],
      moreInfoBox: {
        visualState: 'invisible'
      },
      map: {
        visualState: 'default'
      }
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
    
    var m = {
      position: place.geometry.location,
      key: place.name,
      defaultAnimation: 2,
      infowindow: {
        visible: false,
        name: place.name + ' (' +
            (place.rating ? place.rating : 'not rated') +
            ')'
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

  onButtonClicked = () => {
    let mapVisualState = this.state.map.visualState
    let moreInfoBoxVisualState = this.state.moreInfoBox.visualState

    if (mapVisualState === 'default') {
      mapVisualState = 'smaller'
    } else {
      mapVisualState = 'default'
    }

    if (moreInfoBoxVisualState === 'invisible') {
      moreInfoBoxVisualState = 'visible'
    } else {
      moreInfoBoxVisualState = 'invisible'
    }

    let { map, moreInfoBox }  = this.state
    map.visualState = mapVisualState
    moreInfoBox.visualState = moreInfoBoxVisualState
    this.setState({
      map: map,
      moreInfoBox: moreInfoBox
    })
  }
  
  render() {
    console.log()
    return (
      <div style={{height: `800px`}}>
        <button onClick={this.onButtonClicked}>
          I'm a button
        </button>
        <MoreInfoBox
          visualState={this.state.moreInfoBox.visualState}
        />
        <div className={this.state.map.visualState}>
          <Map
            visualState={this.state.map.visualState}
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
        
      </div>
    );
  }
}

export default App;
