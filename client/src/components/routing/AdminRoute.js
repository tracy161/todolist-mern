import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminRoute = ({ component: AdminComponent, auth: { isAuthenticated, user } }) => {
  if (isAuthenticated && user.isAdmin === true) return <AdminComponent />;

  return <Navigate to='/' />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);