import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Sidebar = ({ logout }) => {
  const values = [
    { id: 1, name: 'Dashboard', to: '/dashboard', icon: 'dashboard' },
    { id: 2, name: 'Users', to: '/users', icon: 'table_view' },
    { id: 3, name: 'My Todo List', to: '/mytodos', icon: 'view_in_ar' },
  ];

  const [activeId, setActiveId] = useState(1);

  return (
    <aside
      className='sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark'
      id='sidenav-main'
    >
      <div className='sidenav-header'>
        <i
          className='fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none'
          aria-hidden='true'
          id='iconSidenav'
        />
        <Link className='navbar-brand m-0' to='/dashboard'>
          <span className='ms-1 font-weight-bold text-white'>
            Material Dashboard 2
          </span>
        </Link>
      </div>
      <hr className='horizontal light mt-0 mb-2' />
      <div
        className='collapse navbar-collapse  w-auto  max-height-vh-100'
        id='sidenav-collapse-main'
      >
        <ul className='navbar-nav'>
          {values.map((item, index) => (
            <li className='nav-item' key={index}>
              <Link
                to={item.to}
                onClick={() => setActiveId(item.id)}
                className={
                  activeId === item.id
                    ? 'nav-link text-white active bg-gradient-primary'
                    : 'nav-link text-white'
                }
              >
                <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                  <i className='material-icons opacity-10'>{item.icon}</i>
                </div>
                <span className='nav-link-text ms-1'>{item.name}</span>
              </Link>
            </li>
          ))}
          <li className='nav-item mt-3'>
            <h6 className='ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8'>
              Account pages
            </h6>
          </li>
          <li className='nav-item'>
            <Link className='nav-link text-white ' to='/profile'>
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <i className='material-icons opacity-10'>person</i>
              </div>
              <span className='nav-link-text ms-1'>Profile</span>
            </Link>
          </li>
          <li className='nav-item'>
            <a className='nav-link text-white ' href='#!' onClick={logout}>
              <div className='text-white text-center me-2 d-flex align-items-center justify-content-center'>
                <i className='material-icons opacity-10'>logout</i>
              </div>
              <span className='nav-link-text ms-1'>Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Sidebar);
