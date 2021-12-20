import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

// Redux
import { Provider } from 'react-redux';
import store from './store';
// Css
import './assets/css/material-dashboard.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <Routes>
          <Route exact path='register' element={<Register />} />
          <Route exact path='/' element={<Login />} />
          <Route exact path='dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
