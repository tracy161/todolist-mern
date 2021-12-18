import './App.css';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';

import './assets/css/material-dashboard.css';

const App = () => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Dashboard />
    </>
  );
}

export default App;
