import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import UserList from './components/dashboard/UserList';
import MyTodos from './components/dashboard/MyTodos';
import Profile from './components/dashboard/Profile';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// Css
import './assets/css/material-dashboard.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Sidebar />
          <Alert />
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='register' element={<Register />} />
            <Route
              exact
              path='dashboard'
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              exact
              path='users'
              element={<PrivateRoute component={UserList} />}
            />
            <Route
              exact
              path='mytodos'
              element={<PrivateRoute component={MyTodos} />}
            />
            <Route
              exact
              path='profile'
              element={<PrivateRoute component={Profile} />}
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
