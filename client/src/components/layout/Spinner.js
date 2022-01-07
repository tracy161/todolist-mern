import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <div className='justify-content-center'>
    <img
      src={spinner}
      style={{ width: '100px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </div>
);

export default Spinner;