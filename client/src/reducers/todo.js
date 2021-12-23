import {
  GET_TODOS,
  GET_TODO,
  TODO_ERROR,
  ADD_TODO,
  DELETE_TODO,
} from '../actions/types';

const initialState = {
  todos: [],
  todo: null,
  loading: true,
  error: {},
};

const todoReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TODOS:
    case GET_TODO:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== payload),
        loading: false
      }
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default todoReducer;
