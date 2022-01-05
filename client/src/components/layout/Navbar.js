import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';

const routes = [
  {
    id: 1,
    path: '/dashboard',
    breadcrumb: 'Dashboard',
  },
  {
    id: 2,
    path: '/users',
    breadcrumb: 'Users',
  },
  {
    id: 3,
    path: '/mytodos',
    breadcrumb: 'My Todo List',
  },
  {
    id: 4,
    path: '/profile',
    breadcrumb: 'Profile',
  },
];

const Navbar = ({ logout, auth: { user } }) => {
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
      <nav
        className='navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl'
        id='navbarBlur'
        navbar-scroll='true'
      >
        <div className='container-fluid py-1 px-3'>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5'>
              {breadcrumbs.map((item, index) => (
                <li
                  className='breadcrumb-item text-sm text-dark active'
                  aria-current='page'
                  key={index}
                >
                  {item.breadcrumb}
                </li>
              ))}
            </ol>
          </nav>
          <div
            className='collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4'
            id='navbar'
          >
            <div className='ms-md-auto pe-md-3 d-flex align-items-center'></div>
            <ul className='navbar-nav  justify-content-end'>
              <li className='nav-item d-flex align-items-center'>
                <a
                  href='#!'
                  className='nav-link text-body font-weight-bold px-0'
                >
                  <span className='d-sm-inline d-none'>
                    Welcome {user.name}
                  </span>
                </a>
              </li>
              <li className='nav-item ps-3 d-flex align-items-center'>
                <a
                  onClick={logout}
                  href='#!'
                  className='nav-link text-body font-weight-bold px-0'
                >
                  <i className='fa fa-user me-sm-1'></i>
                  <span className='d-sm-inline d-none'>Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
