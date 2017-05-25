import React from 'react';

const loadingStyle = {
  width: '336px',
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
	const rangeAlert = (range === '-1' ? "around the world!" : `within ${range} miles around you.`);
	return (<div style={loadingStyle}>Looking for {artist} concerts {rangeAlert} </div>);
}

export default LoadingData;
