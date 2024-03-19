import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Auth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
function NonAuthRoutes({ children }) {
  const { isLoggedIn } = useContext(Auth);

  if (isLoggedIn) {
    return <Navigate to="/feed" />;
  }
  return children;
}

export default NonAuthRoutes;
