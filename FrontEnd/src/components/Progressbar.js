import React from 'react';
import PropTypes from 'prop-types';


const Progressbar = ({ percentage }) => {
  return (
    <div className='progress'>
      <div
        className='progress-bar'
        style={{ width: `${percentage}%` }}
      >
        {/* {percentage}% */}
      </div>
      <h1 className="count">{`${percentage}%`}</h1>
    </div>
  );
};

Progressbar.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default Progressbar;