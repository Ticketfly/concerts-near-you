import React, { Component } from 'react';
import EventItem from './event_item_component';
import NoEvents from './no_events_component';
import PropTypes from 'prop-types';
import { getSecretURL } from "secrets";
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import _ from "lodash";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

const AsyncGettingStartedExampleGoogleMap = withScriptjs(
  withGoogleMap(
    props => (
      <GoogleMap
          ref={props.onMapLoad}
          defaultZoom={8}
          defaultCenter ={props.geolocation}
          onClick={props.onMapClick}
      >
          {props.markers.map((marker, index) => (
            <Marker
                {...marker}
                onClick={()=> props.onMarkerClick(marker)}
                onRightClick={() => props.onMarkerRightClick(index)}
            >
              {marker.showInfo && (
                <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                  <div>{marker.infoContent}</div>
                </InfoWindow>
              )}
            </Marker>
          ))}
      </GoogleMap>
  ))
);

class MapSection extends Component {
  constructor(props) {
    super(props);
    console.log(props.geolocation);
    const markers = [];
    const events = props.events;

    events.forEach(event => {
      const obj = {};
      console.log('event', event);
      obj.key = event.name;
      obj.position = {
        lat: event.lat,
        lng: event.lng
      }
      obj.infoContent = event.name;
      obj.showInfo = false;
      markers.push(obj);
    });

    // const yourLocationMarker = new
    // markers.push({
    //   key: 'Your location',
    //   lat: props.geolocation.latitude,
    //   lng: props.geolocation.longitude
    // });

    console.log('markers', markers);
    this.state = {
      events: props.events,
      geolocation: props.geolocation,
      markers: markers
    };
  }

  setMarkers() {
    const markers = [];
    const events = this.state.events;

    events.forEach(event => {
      const obj = {};
      console.log('event', event);
      obj.key = event.name;
      obj.position = {
        lat: event.lat,
        lng: event.lng
      }
      obj.infoContent = event.name;
      obj.showInfo = false;
      markers.push(obj);
    });

    this.setState({
      'markers': markers
    });
  }

  render() {
    const geolocation = {};

    geolocation.lat = this.state.geolocation.latitude;
    geolocation.lng = this.state.geolocation.longitude;

    const markerClick = (targetMarker) => {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              showInfo: true,
            };
          }
          return marker;
        }),
      });
    };

    const markerClose = (targetMarker) => {
      this.setState({
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              showInfo: false,
            };
          }
          return marker;
        }),
      });
    }

    return (
      <AsyncGettingStartedExampleGoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCL77v5T8j7Httcf4NNwHKTtna02oW2McA"
        loadingElement={
          <div style={{ height: `100%` }}>

          </div>
        }
        containerElement={
            <div style={{ height: `336px` }} />
        }
        mapElement={
            <div style={{ height: `336px` }} />
        }
        onMapLoad={_.noop}
        onMapClick={_.noop}
        markers={this.state.markers}
        geolocation={geolocation}
        onMarkerRightClick={_.noop}
        onMarkerClick={markerClick}
        onMarkerClose={markerClose}
      />
    )
  }
}

MapSection.propTypes = {
  events: PropTypes.array
}

export default MapSection;
