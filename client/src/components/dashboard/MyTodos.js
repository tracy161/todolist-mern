import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  getTodo,
  clearTodo,
  filterTodos,
} from '../../actions/todo';
import PaginationTodos from '../layout/paginations/PaginationTodos';
import { setAlert } from '../../actions/alert';
import Spinner from '../layout/Spinner';

const MyTodos = ({
  setAlert,
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  clearTodo,
  filterTodos,
  todo: { todos, todo, filtered, loading },
}) => {
  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (todo !== null) {
      setFormData(todo);
    } else {
      setFormData({
        content: '',
        status: '',
      });
    }
  }, [todo]);

  const [formData, setFormData] = useState({
    content: '',
    status: '',
  });

  const { content, status } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = e => {
    e.preventDefault();
    if (content === '' || status === '') {
      setAlert('Please fill in all fields', 'danger');
    } else if (todo === null) {
      addTodo(formData);
      setFormData({ content: '', status: '' });
    } else {
      updateTodo(formData);
      setFormData({ content: '', status: '' });
    }
    clearAll();
  };

  const clearAll = () => {
    clearTodo();
  };

  // Pagination
  const [currentPageTodos, setCurrentPageTodos] = useState(1);
  const [itemsPerPageTodos] = useState(10);

  const indexofLastTodos = currentPageTodos * itemsPerPageTodos;
  const indexofFirstTodos = indexofLastTodos - itemsPerPageTodos;
  const currentTodos = todos.slice(indexofFirstTodos, indexofLastTodos);

  const paginateTodos = pageNumber => setCurrentPageTodos(pageNumber);

  const todolist = currentTodos.map(todo => (
    <tr key={todo._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{todo.content}</h6>
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
          className='btn btn-link text-danger text-gradient px-3 mb-0'
          href='#!'
          onClick={() => deleteTodo(todo._id)}
        >
          <i className='material-icons text-sm me-2'>delete</i>Delete
        </a>
        <a
          className='btn btn-link text-dark px-3 mb-0'
          href='#!'
          onClick={() => getTodo(todo)}
        >
          <i className='material-icons text-sm me-2'>edit</i>Edit
        </a>
      </td>
    </tr>
  ));

  const filteredTodoTable = filtered.map(todo => (
    <tr key={todo._id}>
      <td>
        <div className='d-flex px-3 py-1'>
          <div className='d-flex flex-column justify-content-center'>
            <h6 className='mb-0 text-sm'>{todo.content}</h6>
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
          className='btn btn-link text-danger text-gradient px-3 mb-0'
          href='#!'
          onClick={() => deleteTodo(todo._id)}
        >
          <i className='material-icons text-sm me-2'>delete</i>Delete
        </a>
        <a
          className='btn btn-link text-dark px-3 mb-0'
          href='#!'
          onClick={() => getTodo(todo)}
        >
          <i className='material-icons text-sm me-2'>edit</i>Edit
        </a>
      </td>
    </tr>
  ));

  const [searchTermTodo, setSearchTermTodo] = useState('');

  const onChangeTodo = e => {
    setSearchTermTodo(e.target.value);
    filterTodos(e.target.value);
  };

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
            <div className='col-7'>
              <div className='card mt-7'>
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
                              placeholder='Search Item...'
                              className='form-control'
                              onChange={e => onChangeTodo(e)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {todos.length === 0 && !loading ? (
                  <h5 className='d-flex justify-content-center py-5'>
                    Please add a todo!
                  </h5>
                ) : (
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
                        {todos !== null && !loading ? (
                          <tbody>
                            {searchTermTodo !== ''
                              ? filteredTodoTable
                              : todolist}
                          </tbody>
                        ) : (
                          <tbody>
                            <tr>
                              <td>
                                <Spinner />
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </table>
                    </div>
                    <PaginationTodos
                      itemsPerPageTodos={itemsPerPageTodos}
                      totalItems={todos.length}
                      paginate={paginateTodos}
                    />
                  </div>
                )}
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

MyTodos.propTypes = {
  setAlert: PropTypes.func.isRequired,
  getTodos: PropTypes.func.isRequired,
  getTodo: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  clearTodo: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  todo: state.todo,
});

export default connect(mapStateToProps, {
  setAlert,
  getTodos,
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo,
  clearTodo,
  filterTodos,
})(MyTodos);
