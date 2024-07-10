import React from 'react'
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({  children, allowedRoles, redirectPath }) => {
  const [cookies] = useCookies(['user']);
  const userRole = cookies.user ? cookies.user.role : null;

  // if (!cookies.user || !allowedRoles.includes(cookies.user.role)) {
  //   return <Navigate to="/" />;
  // }

  if (!userRole) {
    return <Navigate to="/login" />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to='/' />;
  }

    return children;
    
}

export default PrivateRoute
