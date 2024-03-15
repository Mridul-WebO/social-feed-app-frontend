import { createContext, useState } from 'react';
import { deleteCookie, setCookie } from '../utils/helperFunctions';

export const Auth = createContext();

// eslint-disable-next-line react/prop-types
const Context = ({ children }) => {
  const [userData, setUserData] = useState();

  const cookie = document.cookie === '' ? false : true;
  const [isLoggedIn, setIsLoggedIn] = useState(cookie);

  const handleLoggedInUser = (userData) => {
    setUserData(userData);
    setIsLoggedIn(true);
    setCookie(userData);
  };

  const handleLoggedOutUser = () => {
    setIsLoggedIn(false);
    deleteCookie();
  };

  return (
    <Auth.Provider
      value={{ userData, handleLoggedInUser, isLoggedIn, handleLoggedOutUser }}
    >
      {children}
    </Auth.Provider>
  );
};

export default Context;
