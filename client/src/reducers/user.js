import {
  DELETE_USER,
  GET_ALL_TODOS,
  GET_ALL_USERS,
  USERS_ERROR,
  FILTER_TODOS,
  FILTER_USERS,
  CLEAR_FILTER,
} from '../actions/types';

const initialState = {
  users: [],
  user: null,
  todos: [],
  loading: true,
  filteredTodo: [],
  filteredUser: [],
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
        todos: payload.sort((a, b) => new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1),
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload),
        todos: state.todos.filter(todo => todo.user._id !== payload),
        loading: false,
      };
    case USERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case FILTER_TODOS:
      return {
        ...state,
        filteredTodo: state.todos.filter(({ content, user: { name } }) => {
          const testString = `${content}${name}`.toLowerCase();
          return testString.includes(payload.toLowerCase());
        }),
        loading: false,
      };
    case FILTER_USERS:
      return {
        ...state,
        filteredUser: state.users.filter(({ name, email }) => {
          const testString = `${name}${email}`.toLowerCase();
          return testString.includes(payload.toLowerCase());
        }),
        loading: false,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: [],
        loading: false,
      };
    default:
      return state;
  }
}

export default usersReducer;
