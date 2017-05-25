import React, { Component } from 'react';
import EventItem from './event_item_component';
import NoEvents from './no_events_component';
import PropTypes from 'prop-types';
import getSecretURL from './utils/get-secret-url';
import LoadingData from './loading_data';
import SimilarEvents from './similar_events';
import "../../css/event-section.css";
import HeaderComponent from './header_component';

const ulStyle = {
  listStyle: 'none',
  padding: 0,
  width: '336px'
};

const updateStyle = {
  float: 'right',
  cursor: 'pointer'
}

class EventSection extends Component {
  constructor(props) {
    super(props);

    console.log('props', props);

    this.state = {
      artist: props.artist,
      similarArtists: props.similarArtists,
      geolocation: null,
      events: [],
      isLoading: false,
      range: props.range,
      geoLocatedCity: 'San Francisco, CA 94107',
      url: getSecretURL(encodeURIComponent(props.artist), null, props.range) // this will hopefully change tomorrow ^^
    };
  }

  componentDidMount() {
    this.findCurrentLocation();
  }

  getGeolocationData(lat = this.state.geolocation.latitude, lng = this.state.geolocation.longitude) {
    debugger;
    fetch(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}`)
      .then((r) => r.json())
      .then((results) => {
        if (results && results.results) {
            const geoLocatedCity = results.results[0].formatted_address;
            console.log(geoLocatedCity, results);
            this.setState({
              geoLocatedCity
            });
        }
      }).catch(console.log);
  }

  findCurrentLocation() {
    // signal start loading
    this.setState({
      isLoading: true
    });

    // TO DO
    // 1. Create a separate secret function for location
    // 2. show in plugin that browser does not support geolocation thus requiring user to change permissions
    // 3. ask for a zip code and update secretURl if they pass in a zip code or want to change to a new location
    if (navigator.geolocation && !this.state.geolocation) {
      const setState = this.setState;
      console.log('getting location');
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(`location found long: ${position.coords.longitude} lat: ${position.coords.latitude}`);

        this.setState({
          geolocation: position.coords,
          url: getSecretURL(encodeURIComponent(this.state.artist), position.coords, this.state.range)
        });

        this.getGeolocationData(position.coords.latitude,position.coords.longitude);

        this.queryArtist();
      }, () => this.queryArtist());
    } else {
      console.log("Browser does not support geolocation.");
      this.queryArtist();
    }
  }

  queryArtist() {
    const artistName = this.state.artist;
    console.log("requesting url ", this.state.url);
    if (artistName) {
      fetch(this.state.url).then(r => r.json()).then(({ _embedded }) => {
        if (!_embedded) {
          this.setState({
            isLoading: false,
            events: []
          });
          return;
        }

        const events = _embedded.events;

        this.setState({
          state: this.state,
          events: events.map((event) => {
            console.log(event);
            const date = event.dates.start.dateTime;
            const venue = event._embedded.venues[0].name;
            const city = event._embedded.venues[0].city.name;
            const name = event.name;
            const image = event.images[0].url;
            const id = event.id;
            const url = event.url;

            return {
              date,
              venue,
              name,
              image,
              city,
              eventId: id,
              url
            };
          })
        });
        // signal stop loading
        this.setState({
          isLoading: false
        });
      }).catch((e) => {
        console.log(e);
        // signal stop loading
        this.setState({
          isLoading: false
        });
      });
    } else {
      // signal stop loading
      this.setState({
        isLoading: false
      });
    }
  }

  updateArtist() {
    console.log('updating artist');
    chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
      chrome.tabs.sendMessage(tab.id, ({
        type: 'UPDATE_ARTIST_SELECTOR'
      }))
    });
  }

  onSelectRange(e) {
    const range = e.target.value;
    const url = getSecretURL(encodeURIComponent(this.state.artist), this.state.geolocation, range);
    this.setState({
      range,
      url,
      isLoading: true
    }, () => {
      console.log('updating', range, url);
      this.queryArtist();
    });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingData artist={this.state.artist} range={this.state.range}/>
    }
    return (
      <div>
        <HeaderComponent range={this.state.range} onSelectRange={(e) => this.onSelectRange(e)} geoLocatedCity={this.state.geoLocatedCity} />

        <a className='event-section__refresh' onClick={this.updateArtist}>Refresh</a>
        <IfEvents
          artist={this.state.artist}
          events={this.state.events}
          similarArtists={this.state.similarArtists}
          geolocation={this.state.geolocation}
          range={this.state.range}
        />
      </div>
    )
  }
}

function IfEvents(props) {
  if (props.events.length) {
    const eventItems = props.events.map(event =>
      <EventItem key={event.eventId} event={event} />
    );
    return (
      <div>
        <ul>
          {eventItems}
        </ul>

        <SimilarEvents similarArtists={props.similarArtists} geolocation={props.geolocation} range={props.range}/>
      </div>

    );
  }
  return <NoEvents artist={props.artist}/>
}

EventSection.propTypes = {
  artist: PropTypes.string
}

export default EventSection;
