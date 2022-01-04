import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/DashboardAdmin';
import UserList from './components/dashboard/UserListAdmin';
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
          <Alert />
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route
              path='dashboard'
              element={
                <>
                  <PrivateRoute component={Navbar} />
                  <PrivateRoute component={Sidebar} />
                  <PrivateRoute component={Dashboard} />
                </>
              }
            />
            <Route
              path='users'
              element={
                <>
                  <PrivateRoute component={Navbar} />
                  <PrivateRoute component={Sidebar} />
                  <PrivateRoute component={UserList} />
                </>
              }
            />
            <Route
              path='mytodos'
              element={
                <>
                  <PrivateRoute component={Navbar} />
                  <PrivateRoute component={Sidebar} />
                  <PrivateRoute component={MyTodos} />
                </>
              }
            />
            <Route
              path='profile'
              element={
                <>
                  <PrivateRoute component={Navbar} />
                  <PrivateRoute component={Sidebar} />
                  <PrivateRoute component={Profile} />
                </>
              }
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
