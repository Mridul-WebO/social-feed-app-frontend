import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Auth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
function Authenticate() {
  const { isLoggedIn } = useContext(Auth);

  if (!isLoggedIn) {
    console.log('Authenticated');
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default Authenticate;
