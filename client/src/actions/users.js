import axios from 'axios';
import { setAlert } from './alert';
import {
  DELETE_USER,
  FILTER_TODOS,
  FILTER_USERS,
  GET_ALL_TODOS,
  GET_ALL_USERS,
  USERS_ERROR,
  CLEAR_FILTER
} from './types';

// Get all users by admin
export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all todos by admin
export const getAllTodos = () => async dispatch => {
  try {
    const res = await axios.get('/api/todos');

    dispatch({
      type: GET_ALL_TODOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete user by admin
export const deleteUser = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`);

    dispatch({
      type: DELETE_USER,
      payload: id,
    });

    dispatch(setAlert('User Removed', 'success'));
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Filter todos
export const filterTodos = text => dispatch => {
  try {
    dispatch({
      type: FILTER_TODOS,
      payload: text,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Filter users
export const filterUsers = text => async dispatch => {
  try {
    dispatch({
      type: FILTER_USERS,
      payload: text,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Clear Filter
export const clearFilter = () => async dispatch => {
  dispatch({ type: CLEAR_FILTER });
};
