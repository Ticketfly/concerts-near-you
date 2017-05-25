import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import "../../css/event-item.css";

class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    return (
      <li className='event-item'>
        <img alt={this.state.event.image} src={this.state.event.image} />
        <div>
          <p className='event-item__name'>{this.state.event.name}</p>
          <span className='event-item__row'>
            <p className='event-item__text'>{this.state.event.city}</p>
            <p className='event-item__dot'>
              &middot;
            </p>
            <p className='event-item__text'>{this.state.event.venue}</p>
          </span>
          <span>
            <p className='event-item__text'><Moment format="MMMM DD, YYYY">{this.state.event.date}</Moment></p>
            <p className='event-item__dot'>
              &middot;
            </p>
            <p className='event-item__text'><Moment format="hh:mm A">{this.state.event.date}</Moment></p>
          </span>
          <span className='event-item__row'>
            <a className='event-item__link' href={this.state.event.url} target="_blank">Buy Tickets</a>
          </span>
        </div>
      </li>
    );
  }
}

EventItem.propTypes = {
  event: PropTypes.shape({
    eventId: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    image: PropTypes.string,
    venue: PropTypes.string,
    city: PropTypes.string,
    url: PropTypes.string
  })
}

export default EventItem;
