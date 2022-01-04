import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { getAllTodos, getAllUsers, deleteUser } from '../../actions/users';
import { setAlert } from '../../actions/alert';

const UserList = ({
  getAllUsers,
  getAllTodos,
  deleteUser,
  user: { users, todos },
}) => {
  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllTodos();
  }, []);

  const usersTable = users.map(user => (
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
        <a
          className='btn btn-link text-danger text-gradient px-3 mb-0'
          href='#!'
          onClick={() => deleteUser(user._id)}
        >
          <i className='material-icons text-sm me-2'>delete</i>
          Delete
        </a>
      </td>
    </tr>
  ));

  const todoListTable = todos.map(todo => (
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
                    <h6 className='text-white text-capitalize ps-3'>
                      Users table
                    </h6>
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
                      <tbody>{usersTable}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-7'>
              <div className='card my-4'>
                <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
                  <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3'>
                    <h6 className='text-white text-capitalize ps-3'>
                      Todo List table
                    </h6>
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
                      <tbody>{todoListTable}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

UserList.propsTypes = {
  getAllUsers: PropTypes.func.isRequired,
  getAllTodos: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getAllUsers,
  getAllTodos,
  deleteUser,
})(UserList);
