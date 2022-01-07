import React from 'react';

const Footer = () => {
  return (
    <footer className="footer py-4 main-content position-absolute" style={{bottom: '0'}}>
      <div className='container-fluid'>
        <div className='row align-items-center justify-content-center'>
          <div className='col-lg-12 mb-lg-0 mb-4'>
            <div className='copyright text-center text-sm text-muted text-lg-start'>
              &copy; {new Date().getFullYear()}, made
              with {' '}<i className='fa fa-heart'></i>{' '} by {'  '}
              <a
                href='#!'
                className='font-weight-bold'
                target='_blank'
              >
                Tracy Pham
              </a>{' '}
              for a better web.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
