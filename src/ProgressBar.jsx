import { PropTypes } from 'prop-types';
import { React } from 'react';

/**
 * A simple progress bar made from setting the width
 * of a div
 */
function ProgressBar({ bgcolor, completed }) {
  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 5,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: '5px 0 0 5px',
    textAlign: 'right',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles} />
    </div>
  );
}

ProgressBar.propTypes = {
  bgcolor: PropTypes.string.isRequired,
  completed: PropTypes.number.isRequired,
};

export default ProgressBar;
