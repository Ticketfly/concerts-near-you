import React from 'react';
import "../../css/loading-data.css";

const loadingStyle = {
  width: '360px',
  height: 'auto',
  padding: '34px 0 43px',
  textAlign: 'center',
  verticalAlign: 'middle',
  fontSize: '15px',
  fontFamily: 'Avenir',
  fontWeight: 'medium',
  color: '#585858'
};

const LoadingData = ({ artist, range }) => {
	const rangeAlert = (range === '-1' ? "around the world!" : `within ${range} miles of your location.`);
	return (<div style={loadingStyle}>Looking for <span className='loading-artist-name'>{artist}</span> concerts {rangeAlert} </div>);
}

export default LoadingData;
