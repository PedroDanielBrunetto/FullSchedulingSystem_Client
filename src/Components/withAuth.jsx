import React from 'react';
import { useAuth } from '../hooks/useAuth.js';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
