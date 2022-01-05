import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  getAllTodos,
  getAllUsers,
  filterTodos,
  filterUsers,
  clearFilter,
} from '../../actions/users';
import Pagination from '../layout/Pagination';

const Dashboard = ({
  getAllTodos,
  getAllUsers,
  filterTodos,
  filterUsers,
  clearFilter,
  user: { users, todos, filteredTodo, filteredUser },
}) => {
  useEffect(() => {
    getAllUsers();
    getAllTodos();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const indexofLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexofLastItem - itemsPerPage;
  const currentTodos = todos.slice(indexofFirstItem, indexofLastItem);
  const currentUsers = users.slice(indexofFirstItem, indexofLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Table
  const todoListTable = currentTodos.map(todo => (
    <tr key={todo._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div></div>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{todo.content}</h6>
          </div>
        </div>
      </td>
      <td className='align-middle text-center text-sm'>
        <span className='text-xs font-weight-bold'>{todo.user.name}</span>
      </td>
      <td className='align-middle text-center text-sm'>
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
      <td className='align-middle text-center text-sm'>
        <span className='text-xs font-weight-bold'>
          {' '}
          <Moment format='DD/MM/YYYY'>{todo.createdAt}</Moment>
        </span>
      </td>
    </tr>
  ));

  const filteredTodosTable = filteredTodo.map(todo => (
    <tr key={todo._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div></div>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{todo.content}</h6>
          </div>
        </div>
      </td>
      <td className='align-middle text-center text-sm'>
        <span className='text-xs font-weight-bold'>{todo.user.name}</span>
      </td>
      <td className='align-middle text-center text-sm'>
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
      <td className='align-middle text-center text-sm'>
        <span className='text-xs font-weight-bold'>
          {' '}
          <Moment format='DD/MM/YYYY'>{todo.createdAt}</Moment>
        </span>
      </td>
    </tr>
  ));

  const usersTable = currentUsers.map(user => (
    <tr key={user._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{user.name}</h6>
          </div>
        </div>
      </td>
      <td className='align-middle text-center'>
        <span className='text-xs font-weight-bold'>{user.email}</span>
      </td>
      <td className='align-middle text-center'>
        <span className='text-secondary text-xs font-weight-bold'>
          <Moment format='DD/MM/YYYY'>{user.createdAt}</Moment>
        </span>
      </td>
    </tr>
  ));

  const filteredUsersTable = filteredUser.map(user => (
    <tr key={user._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{user.name}</h6>
          </div>
        </div>
      </td>
      <td className='align-middle text-center'>
        <span className='text-xs font-weight-bold'>{user.email}</span>
      </td>
      <td className='align-middle text-center'>
        <span className='text-secondary text-xs font-weight-bold'>
          <Moment format='DD/MM/YYYY'>{user.createdAt}</Moment>
        </span>
      </td>
    </tr>
  ));

  // Count total tasks
  const completeTasks = todos.filter(todo => todo.status === 'Complete');

  const curr = new Date(); // get current date

  const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week

  const firstday = new Date(curr.setDate(first));

  const increaseTasks = todos.filter(
    todo => Date.parse(todo.createdAt) > Date.parse(firstday)
  );

  const increaseCompleteTasks = todos.filter(
    todo =>
      Date.parse(todo.createdAt) > Date.parse(firstday) &&
      todo.status === 'Complete'
  );

  const increaseUsers = users.filter(
    user => Date.parse(user.createdAt) > Date.parse(firstday)
  );

  // Filter
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
          <h4 className='font-weight-bolder p-3 mb-4'>Dashboard</h4>
          <div className='row'>
            <div className='col-xl-4 col-sm-6 mb-xl-0 mb-4'>
              <div className='card'>
                <div className='card-header p-3 pt-2'>
                  <div className='icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute'>
                    <i className='material-icons opacity-10'>weekend</i>
                  </div>
                  <div className='text-end pt-1'>
                    <p className='text-sm mb-0 text-capitalize'>Total Tasks</p>
                    <h4 className='mb-0'>{todos.length}</h4>
                  </div>
                </div>
                <hr className='dark horizontal my-0' />
                <div className='card-footer p-3'>
                  <p className='mb-0'>
                    <span className='text-success text-sm font-weight-bolder'>
                      +{increaseTasks.length}{' '}
                    </span>
                    Tasks than lask week
                  </p>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-sm-6 mb-xl-0 mb-4'>
              <div className='card'>
                <div className='card-header p-3 pt-2'>
                  <div className='icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute'>
                    <i className='material-icons opacity-10'>weekend</i>
                  </div>
                  <div className='text-end pt-1'>
                    <p className='text-sm mb-0 text-capitalize'>
                      Total Complete Tasks
                    </p>
                    <h4 className='mb-0'>{completeTasks.length}</h4>
                  </div>
                </div>
                <hr className='dark horizontal my-0' />
                <div className='card-footer p-3'>
                  <p className='mb-0'>
                    <span className='text-success text-sm font-weight-bolder'>
                      +{increaseCompleteTasks.length}{' '}
                    </span>
                    Tasks than lask week
                  </p>
                </div>
              </div>
            </div>
            <div className='col-xl-4 col-sm-6 mb-xl-0 mb-4'>
              <div className='card'>
                <div className='card-header p-3 pt-2'>
                  <div className='icon icon-lg icon-shape bg-gradient-success shadow-primary text-center border-radius-xl mt-n4 position-absolute'>
                    <i className='material-icons opacity-10'>person</i>
                  </div>
                  <div className='text-end pt-1'>
                    <p className='text-sm mb-0 text-capitalize'>Total Users</p>
                    <h4 className='mb-0'>{users.length}</h4>
                  </div>
                </div>
                <hr className='dark horizontal my-0' />
                <div className='card-footer p-3'>
                  <p className='mb-0'>
                    <span className='text-success text-sm font-weight-bolder'>
                      +{increaseUsers.length}{' '}
                    </span>
                    Users than lask week
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-lg-6 col-md-6 mb-md-0 mb-4'>
              <div className='card h-100'>
                <div className='card-header pb-0'>
                  <div className='row'>
                    <div className='col-lg-6 col-7'>
                      <h6>Todo List Table</h6>
                    </div>
                    <div className='col-lg-6 col-5 my-auto text-end'>
                      <div className='ms-md-auto pe-md-3 d-flex align-items-center'>
                        <div className='input-group input-group-outline'>
                          <input
                            type='text'
                            placeholder='Search Item or Username...'
                            className='form-control'
                            onChange={e => onChangeTodo(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-body px-0 pb-2'>
                  <div className='table-responsive'>
                    <table className='table align-items-center mb-0'>
                      <thead>
                        <tr>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Items
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Users Name
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Status
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
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
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={todos.length}
                  paginate={paginate}
                />
              </div>
            </div>
            <div className='col-lg-6 col-md-6'>
              <div className='card h-100'>
                <div className='card-header pb-0'>
                  <div className='row'>
                    <div className='col-lg-6 col-7'>
                      <h6>Users List Table</h6>
                    </div>
                    <div className='col-lg-6 col-5 my-auto text-end'>
                      <div className='ms-md-auto pe-md-3 d-flex align-items-center'>
                        <div className='input-group input-group-outline'>
                          <input
                            type='text'
                            placeholder='Search Username or Email...'
                            className='form-control'
                            onChange={e => onChangeUser(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='card-body px-0 pb-2'>
                  <div className='table-responsive'>
                    <table className='table align-items-center mb-0'>
                      <thead>
                        <tr>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Users Name
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Email
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Date Created
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
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={users.length}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  getAllTodos: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
  filterUsers: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getAllUsers,
  getAllTodos,
  filterTodos,
  filterUsers,
  clearFilter,
})(Dashboard);
