import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Password do not match');
    } else {
      const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);
        console.log(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

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
                  <form role='form' onSubmit={e => onSubmit(e)}>
                    <div className='input-group input-group-outline mb-3'>
                      <input
                        type='text'
                        placeholder='Name'
                        className='form-control'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
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
                        required
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
                        required
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
                        required
                      />
                    </div>
                    <div className='form-check form-check-info text-start ps-0'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        value=''
                        id='flexCheckDefault'
                        checked
                      />
                      <label
                        className='form-check-label'
                        for='flexCheckDefault'
                      >
                        I agree the{' '}
                        <a
                          href='javascript:;'
                          className='text-dark font-weight-bolder'
                        >
                          Terms and Conditions
                        </a>
                      </label>
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
                      to='/login'
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

export default Register;
