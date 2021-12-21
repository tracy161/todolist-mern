import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <div className='page-header login align-items-start min-vh-100'>
      <span className='mask bg-gradient-dark opacity-6'></span>
      <div className='container my-auto'>
        <h2 className='text-white font-weight-bolder text-center mb-7'>
          Welcome to Todo List Portal
        </h2>
        <div className='row'>
          <div className='col-lg-4 col-md-8 col-12 mx-auto'>
            <div className='card z-index-0 fadeIn3 fadeInBottom'>
              <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
                <div className='bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1'>
                  <h4 className='text-white font-weight-bolder text-center mt-2 mb-0'>
                    Sign in
                  </h4>
                  <div className='row mt-3'></div>
                </div>
              </div>
              <div className='card-body'>
                <form
                  role='form'
                  className='text-start'
                  onSubmit={e => onSubmit(e)}
                >
                  <div className='input-group input-group-outline my-3'>
                    <input
                      type='email'
                      placeholder='Email'
                      className='form-control'
                      name='email'
                      value={email}
                      onChange={e => onChange(e)}
                    />
                  </div>
                  <div className='input-group input-group-outline mb-3'>
                    <input
                      type='password'
                      placeholder='Password'
                      className='form-control'
                      name='password'
                      value={password}
                      onChange={e => onChange(e)}
                    />
                  </div>
                  <div className='form-check form-switch d-flex align-items-center mb-3'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='rememberMe'
                    />
                    <label
                      className='form-check-label mb-0 ms-2'
                      htmlFor='rememberMe'
                    >
                      Remember me
                    </label>
                  </div>
                  <div className='text-center'>
                    <button
                      type='submit'
                      className='btn bg-gradient-primary w-100 my-4 mb-2'
                      value='Login'
                    >
                      Sign in
                    </button>
                  </div>
                  <p className='mt-4 text-sm text-center'>
                    Don't have an account?
                    <Link
                      to='/register'
                      className='text-primary text-gradient font-weight-bold'
                    >
                      {' '}
                      Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
