import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  getAllTodos,
  getAllUsers,
  deleteUser,
  filterTodos,
  filterUsers,
} from '../../actions/users';
import PaginationTodos from '../layout/paginations/PaginationTodos';
import PaginationUsers from '../layout/paginations/PaginationUsers';

const UserList = ({
  getAllUsers,
  getAllTodos,
  deleteUser,
  filterTodos,
  filterUsers,
  user: { users, todos, filteredTodo, filteredUser },
}) => {
  useEffect(() => {
    getAllUsers();
    getAllTodos();
  }, []);

  // Pagination
  const [currentPageTodos, setCurrentPageTodos] = useState(1);
  const [itemsPerPageTodos] = useState(10);

  const indexofLastTodos = currentPageTodos * itemsPerPageTodos;
  const indexofFirstTodos = indexofLastTodos - itemsPerPageTodos;
  const currentTodos = todos.slice(indexofFirstTodos, indexofLastTodos);

  const paginateTodos = pageNumber => setCurrentPageTodos(pageNumber);

  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [itemsPerPageUsers] = useState(10);

  const indexofLastUsers = currentPageUsers * itemsPerPageUsers;
  const indexofFirstUsers = indexofLastUsers - itemsPerPageUsers;
  const currentUsers = users.slice(indexofFirstUsers, indexofLastUsers);

  const paginateUsers = pageNumber => setCurrentPageUsers(pageNumber);

  const usersTable = currentUsers.map(user => (
    <tr key={user._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{user.name}</h6>
            <p className='text-xs text-secondary mb-0'>{user.email}</p>
          </div>
        </div>
      </td>

      <td className='align-middle text-center'>
        <span className='text-secondary text-xs font-weight-bold'>
          <Moment format='DD/MM/YYYY'>{user.createdAt}</Moment>
        </span>
      </td>
      <td className='align-middle text-center'>
        {user.isAdmin === false ? (
          <a
            className='btn btn-link text-danger text-gradient px-3 mb-0'
            href='#!'
            onClick={() => deleteUser(user._id)}
          >
            <i className='material-icons text-sm me-2'>delete</i>
            Delete
          </a>
        ) : (
          ''
        )}
      </td>
    </tr>
  ));

  const filteredUsersTable = filteredUser.map(user => (
    <tr key={user._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{user.name}</h6>
            <p className='text-xs text-secondary mb-0'>{user.email}</p>
          </div>
        </div>
      </td>

      <td className='align-middle text-center'>
        <span className='text-secondary text-xs font-weight-bold'>
          <Moment format='DD/MM/YYYY'>{user.createdAt}</Moment>
        </span>
      </td>
      <td className='align-middle text-center'>
        {user.isAdmin === false ? (
          <a
            className='btn btn-link text-danger text-gradient px-3 mb-0'
            href='#!'
            onClick={() => deleteUser(user._id)}
          >
            <i className='material-icons text-sm me-2'>delete</i>
            Delete
          </a>
        ) : (
          ''
        )}
      </td>
    </tr>
  ));

  const todoListTable = currentTodos.map(todo => (
    <tr key={todo._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{todo.content}</h6>
          </div>
        </div>
      </td>
      <td className='align-middle text-center'>
        <span className='text-secondary text-xs font-weight-bold'>
          <h6 className='mb-0 text-sm'>{todo.user.name}</h6>
        </span>
      </td>
      <td className='align-middle text-center'>
        <span
          className={
            todo.status === 'Complete'
              ? 'badge badge-sm bg-gradient-success'
              : 'badge badge-sm bg-gradient-secondary'
          }
        >
          {todo.status}
        </span>
      </td>
      <td className='align-middle text-center'>
        <span className='text-secondary text-xs font-weight-bold'>
          <Moment format='DD/MM/YYYY'>{todo.createdAt}</Moment>
        </span>
      </td>
    </tr>
  ));

  const filteredTodosTable = filteredTodo.map(todo => (
    <tr key={todo._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{todo.content}</h6>
          </div>
        </div>
      </td>
      <td className='align-middle text-center'>
        <span className='text-secondary text-xs font-weight-bold'>
          <h6 className='mb-0 text-sm'>{todo.user.name}</h6>
        </span>
      </td>
      <td className='align-middle text-center'>
        <span
          className={
            todo.status === 'Complete'
              ? 'badge badge-sm bg-gradient-success'
              : 'badge badge-sm bg-gradient-secondary'
          }
        >
          {todo.status}
        </span>
      </td>
      <td className='align-middle text-center'>
        <span className='text-secondary text-xs font-weight-bold'>
          <Moment format='DD/MM/YYYY'>{todo.createdAt}</Moment>
        </span>
      </td>
    </tr>
  ));

  const [searchTermTodo, setSearchTermTodo] = useState('');
  const [searchTermUser, setSearchTermUser] = useState('');

  const onChangeTodo = e => {
    setSearchTermTodo(e.target.value);
    filterTodos(e.target.value);
  };

  const onChangeUser = e => {
    setSearchTermUser(e.target.value);
    filterUsers(e.target.value);
  };

  return (
    <>
      <div className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
        <div className='container-fluid pb-4'>
          <h4 className='font-weight-bolder p-3 mb-4'>Users List</h4>
          <div className='row'>
            <div className='col-5'>
              <div className='card my-4'>
                <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
                  <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3'>
                    <div className='row'>
                      <div className='col-lg-6 col-7'>
                        <h6 className='text-white text-capitalize ps-3'>
                          Users Table
                        </h6>
                      </div>
                      <div className='col-lg-6 col-5 my-auto text-end'>
                        <div className='ms-md-auto pe-md-3 d-flex align-items-center'>
                          <div className='input-group input-group-outline'>
                            <input
                              type='text'
                              style={formControl}
                              placeholder='Search Username or Email...'
                              className='form-control'
                              onChange={e => onChangeUser(e)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-body px-0 pb-2'>
                  <div className='table-responsive p-0'>
                    <table className='table align-items-center mb-0'>
                      <thead>
                        <tr>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            User Name
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Date Created
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchTermUser !== ''
                          ? filteredUsersTable
                          : usersTable}
                      </tbody>
                    </table>
                  </div>
                </div>
                <PaginationUsers
                  itemsPerPageUsers={itemsPerPageUsers}
                  totalItems={users.length}
                  paginate={paginateUsers}
                />
              </div>
            </div>
            <div className='col-7'>
              <div className='card my-4'>
                <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
                  <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3'>
                    <div className='row'>
                      <div className='col-lg-6 col-7'>
                        <h6 className='text-white text-capitalize ps-3'>
                          Todo List Table
                        </h6>
                      </div>
                      <div className='col-lg-6 col-5 my-auto text-end'>
                        <div className='ms-md-auto pe-md-3 d-flex align-items-center'>
                          <div className='input-group input-group-outline'>
                            <input
                              type='text'
                              style={formControl}
                              placeholder='Search Item or Username...'
                              className='form-control'
                              onChange={e => onChangeTodo(e)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-body px-0 pb-2'>
                  <div className='table-responsive p-0'>
                    <table className='table align-items-center justify-content-center mb-0'>
                      <thead>
                        <tr>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Items
                          </th>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2'>
                            Users
                          </th>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2'>
                            Status
                          </th>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2'>
                            Date Created
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchTermTodo !== ''
                          ? filteredTodosTable
                          : todoListTable}
                      </tbody>
                    </table>
                  </div>
                </div>
                <PaginationTodos
                  itemsPerPageTodos={itemsPerPageTodos}
                  totalItems={todos.length}
                  paginate={paginateTodos}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const formControl = {
  color: 'white',
};

UserList.propsTypes = {
  getAllUsers: PropTypes.func.isRequired,
  getAllTodos: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  filterUsers: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getAllUsers,
  getAllTodos,
  deleteUser,
  filterTodos,
  filterUsers,
})(UserList);
