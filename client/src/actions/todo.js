import axios from 'axios';
import { setAlert } from './alert';
import { GET_TODOS, GET_TODO, TODO_ERROR, ADD_TODO, DELETE_TODO } from './types';

// Get Todos
export const getTodos = () => async dispatch => {
  try {
    const res = await axios.get('/api/todos/mytodos')

    dispatch({
      type: GET_TODOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Add Todo
export const addTodo = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/todos/', formData, config);

    dispatch({
      type: ADD_TODO,
      payload: res.data
    });

    dispatch(setAlert('Item Created', 'success'));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

// Delete todo
export const deleteTodo = id => async dispatch => {
  try {
    await axios.delete(`/api/todos/${id}`);

    dispatch({
      type: DELETE_TODO,
      payload: id
    });

    dispatch(setAlert('Item Removed', 'success'));
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}
