// import { useContext } from 'react';
// import CustomAppBar from './components/CustomAppBar';
import { RouterProvider } from 'react-router-dom';
// import { Auth } from './context/AuthContext';
import appRouting from './appRouting';

function App() {
  return (
    <>
      <RouterProvider router={appRouting} />
    </>
  );
}

export default App;
