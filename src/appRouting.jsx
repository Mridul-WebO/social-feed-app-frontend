import { Navigate, createBrowserRouter } from 'react-router-dom';
// import App from './App';
// import ErrorPage from './pages/errorPage/ErrorPage';
import SignInPage from './pages/signIn/SignInPage';
import SignUpPage from './pages/signUp/SignUpPage';
// import ProtectedRoute from "./components/ProtectedRoute";
// import Authenticate from "./components/Authenticate";
// import { SnackbarProvider } from 'notistack';
import HomePage from './pages/home/HomePage';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import Context from './context/AuthContext';
import ProfilePage from './pages/profile/ProfilePage';
// import Authenticate from './components/Authenticate';
import Protected from './components/Protected';
import Authenticate from './components/Authenticate';
// import PostsContext from './context/PostsContext';
import Layout from './layouts/Layout';
import { useContext } from 'react';
import { Auth } from './context/AuthContext';

// import Authenticate from './components/Authenticate';

// eslint-disable-next-line react-refresh/only-export-components
const DefaultNavigate = () => {
  const { isLoggedIn } = useContext(Auth);

  return <Navigate to={isLoggedIn ? '/feed' : '/'} />;
};

const appRouting = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,

        element: (
          <Authenticate>
            <SignInPage />
          </Authenticate>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <Authenticate>
            <SignUpPage />
          </Authenticate>
        ),
      },
      {
        path: 'feed',
        element: (
          <Protected>
            <HomePage />
          </Protected>
        ),
      },
      {
        path: 'profile',
        element: (
          <Protected>
            <ProfilePage />
          </Protected>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <DefaultNavigate />,
  },
]);

export default appRouting;
