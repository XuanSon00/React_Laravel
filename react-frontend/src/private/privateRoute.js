import React from 'react'
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({  children, allowedRoles }) => {
    const [cookies] = useCookies(['user']);
    if (!cookies.user || !allowedRoles.includes(cookies.user.role)) {
        return <Navigate to="/" />;
      }
    
      return children;
    
}

export default PrivateRoute
