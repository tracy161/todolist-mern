import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if registered in
  if (isAuthenticated) {
    return <Navigate to="/mytodos" />
  }

  return (
    <section>
      <div className='page-header min-vh-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column'>
              <div className='position-relative register-bg bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center'></div>
            </div>
            <div className='col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5'>
              <div className='card card-plain'>
                <div className='card-header'>
                  <h4 className='font-weight-bolder'>Sign Up</h4>
                  <p className='mb-0'>
                    Enter your email and password to register
                  </p>
                </div>
                <div className='card-body'>
                  <form onSubmit={e => onSubmit(e)}>
                    <div className='input-group input-group-outline mb-3'>
                      <input
                        type='text'
                        placeholder='Name'
                        className='form-control'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                      />
                    </div>
                    <div className='input-group input-group-outline mb-3'>
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
                    <div className='input-group input-group-outline mb-3'>
                      <input
                        type='password'
                        placeholder='Confirm Password'
                        className='form-control'
                        name='password2'
                        value={password2}
                        onChange={e => onChange(e)}
                      />
                    </div>

                    <div className='text-center'>
                      <button
                        type='submit'
                        className='btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0'
                        value='Register'
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
                <div className='card-footer text-center pt-0 px-lg-2 px-1'>
                  <p className='mb-2 text-sm mx-auto'>
                    Already have an account?
                    <Link
                      to='/'
                      className='text-primary text-gradient font-weight-bold'
                    >
                      {' '}
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
