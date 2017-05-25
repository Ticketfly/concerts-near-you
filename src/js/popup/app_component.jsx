import React, { Component } from 'react';
import EventSection from './event_section_component';
import SimilarEvents from './similar_events';
import PropTypes from 'prop-types';

 class App extends Component {

  render() {
  	console.log("Within App Component rendering...");
  	console.log(this.props);

    const { artist, similarArtists, range=50 } = this.props;

    return (
      <div>
        <EventSection artist={artist} range={range} />
        <SimilarEvents similarArtists={similarArtists} />
      </div>
    );
  }
}

App.propTypes = {
  artist: PropTypes.string,
  range: PropTypes.string
}

export default App;
