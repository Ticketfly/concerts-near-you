import React from 'react';
import PropTypes from 'prop-types';

const containerStyle = {
  fontFamily: 'Avenir',
  display: 'flex',
  backgroundColor: '#F8F8F8',
  padding: '5px',
  width: 'calc(100% + 10px',
  borderBottom: '1px solid rgba(0,0,0,0.08)'
}

const linkStyle = {
  display: 'inline-block',
  flexGrow: 1,
  border: 'none',
  background: 'none',
  color: '#33AF80'
}

const selectStyle = {
  display: 'inline-block',
  flexGrow: 0,
  border: 'none',
  cursor: 'pointer',
  color: '#949191',
  width: '70px'
}

const cityStyle = {
  textAlign: 'center',
  flexGrow: 2,
  color: '#949191'
}

class HeaderComponent extends React.Component {
  render() {
    return (
      <div style={containerStyle}>
        <button style={linkStyle}>Show Map</button>
        <select value={this.props.range} onChange={this.props.onSelectRange} style={selectStyle}>
          <option value="1">1 Mile</option>
          <option value="50">50 Miles</option>
          <option value="150">150 Miles</option>
          <option value="-1">Everywhere</option>
        </select>
        <span style={cityStyle}>{this.props.geoLocatedCity}</span>
      </div>
    )
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

HeaderComponent.propTypes = {
  range: PropTypes.string,
  onSelectRange: PropTypes.func
}
export default HeaderComponent;
