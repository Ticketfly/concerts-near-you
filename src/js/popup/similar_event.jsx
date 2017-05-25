import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SimilarEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  render() {
    return (
      <li>
        <p>Artist: {this.state.similarEvent.artistName}</p>
        <p>{this.state.similarEvent.name}</p>
      </li>
    );
  }
}

SimilarEvent.propTypes = {
  similarEvent: PropTypes.shape({
    artistName: PropTypes.string,
    name: PropTypes.string
  })
}

export default SimilarEvent;
