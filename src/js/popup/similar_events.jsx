import React, { Component } from 'react';
import SimilarEvent from './similar_event';
import EventItem from './event_item_component';
import PropTypes from 'prop-types';
import getSecretURL from './utils/get-secret-url';
import "../../css/similar-events.css";

class SimilarEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      similarArtists: props.similarArtists,
      geolocation: props.geolocation,
      range: props.range,
      similarEvents: [],
    };
  }

  componentDidMount() {
    try{
      this.queryArtist();
    } catch(e) {
      console.log(e);
    }
  }

  queryArtist() {
    const geolocation = this.state.geolocation;
    const range = this.state.range;
    const promises = this.state.similarArtists.map(similarArtist => {
      return fetch(getSecretURL(encodeURIComponent(similarArtist.name), geolocation, range)).then(r => r.json());
    });

    return Promise.all(promises).then((values) => {
      const list = [];

      values.forEach((value, index) => {
        if(value._embedded && value._embedded.events) {
          let newEvents = [...value._embedded.events];
          newEvents = newEvents.sort((a,b) => a.distance - b.distance).slice(0, 5).map(event => {
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

    const text = "Similar Artists' Events Near You"

    const similarEvents = this.state.similarEvents.map(similarEvent =>
      <EventItem key={similarEvent.eventId} event={similarEvent} />
    )

    return (
      <div className='similar-events'>
        <h3 className='similar-heading'>{text}</h3>
        <ul>
          {similarEvents}
        </ul>
      </div>
    );
  }
}

SimilarEvents.propTypes = {
  similarEvents: PropTypes.array,
  geolocation: PropTypes.object,
  range: PropTypes.string
}

export default SimilarEvents;
