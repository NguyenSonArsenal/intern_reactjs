import React from 'react';
import PropTypes from 'prop-types';

const Text = (props) => {
  return (
    <div>
      <h3>Child: {props.text}</h3>
    </div>
  )
};

Text.propTypes = {
  text: PropTypes.string
};
Text.defaultProps = { text: 'default' };

export default Text;
