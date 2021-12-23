import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { getTodos, addTodo, deleteTodo } from '../../actions/todo';
import { setAlert } from '../../actions/alert';

const MyTodos = ({ setAlert, getTodos, addTodo, deleteTodo, todo: { todos } }) => {
  useEffect(() => {
    getTodos();
  }, [getTodos])

  const [formData, setFormData] = useState({
    content: '',
    status: '',
  });

  const { content, status } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = e => {
    e.preventDefault();
    if (!content || !status) {
      setAlert('Please fill in all fields', 'danger');
    } else {
      addTodo({ content, status });
    }
  };

  const todolist = todos.map(todo => (
    <tr key={todo._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{todo.content}</h6>
            <p className='text-xs text-secondary mb-0'>john@creative-tim.com</p>
          </div>
        </div>
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
      <td className='align-middle text-center'>
        <span className='text-secondary text-xs font-weight-bold'>
          <Moment format='DD/MM/YYYY'>{todo.createdAt}</Moment>
        </span>
      </td>
      <td className='align-middle text-center'>
        <a
          class='btn btn-link text-danger text-gradient px-3 mb-0'
          href='#!'
          onClick={() => deleteTodo(todo._id)}
        >
          <i class='material-icons text-sm me-2'>delete</i>Delete
        </a>
        <a class='btn btn-link text-dark px-3 mb-0' href='javascript:;'>
          <i class='material-icons text-sm me-2'>edit</i>Edit
        </a>
      </td>
    </tr>
  ));

  return (
    <>
      <div className='main-content position-relative max-height-vh-100 h-100 border-radius-lg'>
        <div className='container-fluid py-4'>
          <div className='row'>
            <div className='col-xl-4 d-flex flex-column ms-auto me-auto ms-lg-auto'>
              <div className='card card-plain'>
                <div className='card-header'>
                  <h4 className='font-weight-bolder'>Todo List</h4>
                  <p className='mb-0'>What is your plan today?</p>
                </div>
                <div className='card-body'>
                  <form onSubmit={e => submitHandler(e)}>
                    <div className='input-group input-group-outline mb-4'>
                      <input
                        type='text'
                        placeholder='Item Name'
                        className='form-control'
                        name='content'
                        value={content}
                        onChange={e => onChange(e)}
                      />
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='status'
                        value='In Progress'
                        onChange={e => onChange(e)}
                      />
                      <label
                        className='form-check-label'
                        htmlFor='exampleRadios1'
                      >
                        In Progress
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='status'
                        value='Complete'
                        onChange={e => onChange(e)}
                      />
                      <label
                        className='form-check-label'
                        htmlFor='exampleRadios2'
                      >
                        Complete
                      </label>
                    </div>
                    <div className='text-center'>
                      <button
                        type='submit'
                        className='btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0'
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <div className='card mt-7'>
                <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2'>
                  <div className='bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3'>
                    <h6 className='text-white text-capitalize ps-3'>
                      Todo List table
                    </h6>
                  </div>
                </div>
                <div className='card-body px-0 pb-2'>
                  <div className='table-responsive p-0'>
                    <table className='table align-items-center mb-0'>
                      <thead>
                        <tr>
                          <th className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Items
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Status
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Date Created
                          </th>
                          <th className='text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>{todolist}</tbody>
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

MyTodos.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getTodos: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todos: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  todo: state.todo,
});

export default connect(mapStateToProps, { setAlert, getTodos, addTodo, deleteTodo })(MyTodos);
