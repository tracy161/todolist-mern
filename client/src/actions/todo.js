import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_TODOS,
  GET_TODO,
  TODO_ERROR,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  CLEAR_TODO,
  FILTER_TODOS_USER
} from './types';

// Get Todos
export const getTodos = () => async dispatch => {
  try {
    const res = await axios.get('/api/todos/mytodos');

    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Todo by Id
export const getTodoById = todoId => async dispatch => {
  try {
    const res = await axios.get(`/api/todos/${todoId}`);

    dispatch({
      type: GET_TODO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Current Todo
export const getTodo = todo => async dispatch => {
  dispatch({ type: GET_TODO, payload: todo });
};

// Add Todo
export const addTodo = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/todos/', formData, config);

    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });

    dispatch(setAlert('Item Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Todo
export const updateTodo = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.put(`/api/todos/${formData._id}`, formData, config);

    dispatch({
      type: UPDATE_TODO,
      payload: res.data,
    });

    dispatch(setAlert('Item Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete todo
export const deleteTodo = id => async dispatch => {
  try {
    await axios.delete(`/api/todos/${id}`);

    dispatch({
      type: DELETE_TODO,
      payload: id,
    });

    dispatch(setAlert('Item Removed', 'success'));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Clear Current Todo
export const clearTodo = () => async dispatch => {
  dispatch({ type: CLEAR_TODO });
};

// Filter todos
export const filterTodos = text => dispatch => {
  try {
    dispatch({
      type: FILTER_TODOS_USER,
      payload: text,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


