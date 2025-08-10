import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ adminOnly }) => {
  const role = localStorage.getItem('role');

  // Assuming if we reach here, the httpOnly cookie has been set and is valid
  // A more robust solution would involve a backend call to verify session/token

  if (adminOnly && role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
