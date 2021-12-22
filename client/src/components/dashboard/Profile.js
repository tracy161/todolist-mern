import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../../actions/auth';

const Profile = ({
  setAlert,
  auth: { user, loading },
  getUserDetails,
  updateUserDetails,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // useEffect to get current profile to the state
  useEffect(() => {
    if (!user) getUserDetails();

    if (!loading && user) {
      const profileData = { ...formData };
      // loop items in objects
      for (const key in user) {
        if (key in profileData) profileData[key] = user[key];
      }
      // set local state with the profileData
      setFormData(profileData);
    }
  }, [loading, getUserDetails, user]);

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = e => {
    e.preventDefault();
    if (!name || !email || !password) {
      setAlert('Please fill in all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      updateUserDetails(user);
      setAlert('User Updated', 'success');
    }
  };

  return (
    <>
      <div className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
        <div className='container-fluid px-2 px-md-4'>
          <div className='page-header profile min-height-300 border-radius-xl mt-4'>
            <span className='mask  bg-gradient-primary  opacity-6'></span>
          </div>
          <div className='card card-body mx-3 mx-md-4 mt-n6'>
            <div className='row gx-4 mb-2'>
              <div className='col-auto'>
                <div className='avatar avatar-xl position-relative'>
                  <img
                    src='../assets/img/bruce-mars.jpg'
                    alt='profile_image'
                    className='w-100 border-radius-lg shadow-sm'
                  />
                </div>
              </div>
              <div className='col-auto my-auto'>
                <div className='h-100'>
                  <h5 className='mb-1'>Richard Davis</h5>
                  <p className='mb-0 font-weight-normal text-sm'>
                    CEO / Co-Founder
                  </p>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='row'>
                <div className='col-xl-4 d-flex flex-column ms-auto me-auto ms-lg-auto'>
                  <div className='card card-plain'>
                    <div className='card-header'>
                      <h4 className='font-weight-bolder'>Update User</h4>
                      <p className='mb-0'>Update your user details</p>
                    </div>
                    <div className='card-body'>
                      <form onSubmit={e => submitHandler(e)}>
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
                          >
                            Update User
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Profile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAlert,
  getUserDetails,
  updateUserDetails,
})(Profile);
