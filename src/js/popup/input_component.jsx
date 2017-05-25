import React from 'react';
import PropTypes from 'prop-types';

class InputComponent extends React.Component {
  render() {
    return <p><input value={this.props.inputValue} onChange={this.props.onInputChange} /></p>;
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
