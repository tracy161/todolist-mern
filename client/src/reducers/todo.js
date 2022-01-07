import {
  GET_TODOS,
  GET_TODO,
  TODO_ERROR,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  CLEAR_TODO,
  FILTER_TODOS_USER,
} from '../actions/types';

const initialState = {
  todos: [],
  todo: null,
  filtered: [],
  loading: true,
  error: {},
};

const todoReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TODOS:
      return {
        ...state,
        todos: payload.sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1),
        loading: false,
      };
    case GET_TODO:
      return {
        ...state,
        todo: payload,
        loading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [payload, ...state.todos],
        loading: false,
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo._id === payload._id ? payload : todo
        ),
        loading: false,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== payload),
        loading: false,
      };
    case FILTER_TODOS_USER:
      return {
        ...state,
        filtered: state.todos.filter(({ content }) => {
          const testString = `${content}`.toLowerCase();
          return testString.includes(payload.toLowerCase());
        }),
        loading: false,
      };
    case CLEAR_TODO:
      return {
        ...state,
        todo: null,
        loading: false,
      };
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
