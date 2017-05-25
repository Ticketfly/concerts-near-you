import React, { Component } from 'react';
import SimilarEvent from './similar_event';
import PropTypes from 'prop-types';
import { getSecretURL } from "secrets";

class SimilarEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similarArtists: props.similarArtists,
      geolocation: null,
      similarEvents: [],
    };
  }

  componentDidMount() {
    try{
      this.findCurrentLocation();
    } catch(e) {
      console.log(e);
    }
  }

  findCurrentLocation() {
    if (navigator.geolocation && !this.state.geolocation) {
      this.queryArtist();

      const setState = this.setState;
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(`location found long: ${position.coords.longitude} lat: ${position.coords.latitude}`);

          this.setState({
            geolocation: position.coords,
            url: getSecretURL(encodeURIComponent(this.state.artist), position.coords)
          });
          console.log('position.coords', position.coords);
          this.queryArtist();
        });
      } catch(e) {
        console.log(e);
      }
    } else {
      console.log("Browser does not support geolocation.");
      this.queryArtist();
    }
  }

  queryArtist() {
    console.log('queryArtist');
    const promises = this.state.similarArtists.map(similarArtist => {
      return fetch(getSecretURL(encodeURIComponent(similarArtist.name))).then(r => r.json());
    });


    return Promise.all(promises).then((values) => {
      const list = [];

      values.forEach((value, index) => {
        if(value._embedded && value._embedded.events) {
          const newEvents = [...value._embedded.events];
          console.log('newEvents', newEvents);
          newEvents.forEach(event=> {
            event.artistName = this.state.similarArtists[index].name;
          });

          list.push(...newEvents);
        }
      });

      this.setState({
        similarEvents: list
      });
    });
  }

  render() {
    if (this.state.similarEvents.length === 0) {
      return null;
    }

    const similarEvents = this.state.similarEvents.map((similarEvent, index) =>
      <SimilarEvent key={index} similarEvent={similarEvent} />
    )

    return (
      <div>
        <h4>Similar Events</h4>
        <ul>
          {similarEvents}
        </ul>
      </div>
    );
  }
}

SimilarEvents.propTypes = {
  similarEvents: PropTypes.array
}

export default SimilarEvents;
