import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_USER_PROFILE,
  USER_UPDATE_PROFILE,
  USER_PROFILE_ERROR,
  CLEAR_TODO
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async dispatch => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.message, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

// Get Current User Details
export const getUserDetails = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth/');

    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateUserDetails = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/auth', formData, config);

    dispatch({
      type: USER_UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(loadUser());

  } catch (err) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
