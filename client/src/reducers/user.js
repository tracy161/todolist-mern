import {
  DELETE_USER,
  GET_ALL_TODOS,
  GET_ALL_USERS,
  USERS_ERROR,
  CLEAR_USERS
} from '../actions/types';

const initialState = {
  users: [],
  user: null,
  todos: [],
  loading: true,
  error: {},
};

function usersReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_ALL_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload),
        todos: state.todos.filter(todo => todo.user._id !== payload),
        loading: false,
      }
    case USERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default usersReducer;
