import React from 'react';
import { Link } from 'react-router-dom' ;

const NotFound = () => {
  return (
    <section className='container mx-auto py-5'>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle'> Page Not Found</i>
      </h1>
      <p className='large'>Sorry, this page does not exist</p>
      <Link
        className='btn bg-gradient-primary mt-4'
        to='/'
        type='button'
      >
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
