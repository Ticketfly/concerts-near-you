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

const loadingContainer = {
  textAlign: 'center'
};

const loadingIconStyle = {
  width: '100px',
  height: '100px',
  textAlign: 'center',
  marginTop: '-30px',
  padding: '0',
  display: 'inline-block'
};

const LoadingData = ({ artist, range }) => {
	const rangeAlert = (range === '-1' ? "around the world!" : `within ${range} miles around you.`);
	return (
    <div>
      <div style={loadingStyle}>Looking for <span className='loading-artist-name'>{artist}</span> concerts {rangeAlert} </div>
      <div style={loadingContainer}><img src='icons/loader.png' style={loadingIconStyle}/></div>
    </div>
  );
}

export default LoadingData;
