import { useAuthContext } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  page: JSX.Element;
}

export const PrivateRoute = ({ page }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return page;
};
