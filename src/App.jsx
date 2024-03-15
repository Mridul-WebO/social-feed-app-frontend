import { useContext } from 'react';
import CustomAppBar from './components/CustomAppBar';
import { Outlet } from 'react-router-dom';
import { Auth } from './context/AuthContext';

function App() {
  const { isLoggedIn } = useContext(Auth);
  console.log('App', { isLoggedIn });

  return (
    <>
      {isLoggedIn && <CustomAppBar />}
      <Outlet />
    </>
  );
}

export default App;
