import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Navigate to='/' />;
  }
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
