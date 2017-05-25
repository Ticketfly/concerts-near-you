import React from 'react';
import PropTypes from 'prop-types';

class InputComponent extends React.Component {
  render() {
    return <div><center>Change Your Location: <input value={this.props.inputValue || this.props.geoLocatedZipCode || "94117"} onChange={this.props.onInputChange} /></center></div>;
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

InputComponent.propTypes = {
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired
}

export default InputComponent;
