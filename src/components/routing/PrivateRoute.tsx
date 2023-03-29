import { useAuthContext } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  page: JSX.Element;
}

export const PrivateRoute = ({ page }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/sign-in');
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return isAuthenticated ? page : null;
};
