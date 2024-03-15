import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Auth } from '../context/AuthContext';

// eslint-disable-next-line react/prop-types
function Authenticate({ children }) {
  const { isLoggedIn } = useContext(Auth);

  if (isLoggedIn) {
    console.log('Authenticated');
    return <Navigate to="/feed" />;
  }

  return children;
}

export default Authenticate;
