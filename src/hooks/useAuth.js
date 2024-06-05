import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessCookie = Cookies.get('userId');
    if (accessCookie == 1 || accessCookie == 2) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/');
    }
  }, [navigate]);

  return isAuthenticated;
};
