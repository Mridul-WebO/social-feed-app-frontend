import { Navigate, createBrowserRouter } from 'react-router-dom';

import SignInPage from './pages/signIn/SignInPage';
import SignUpPage from './pages/signUp/SignUpPage';

import HomePage from './pages/home/HomePage';

import ProfilePage from './pages/profile/ProfilePage';

import Layout from './layouts/Layout';
import { Suspense, useContext } from 'react';
import { Auth, AuthRedirect } from './context/AuthContext';

import LikedPostPage from './pages/likedPosts/LikedPostPage';
import { Box, CircularProgress } from '@mui/material';

// eslint-disable-next-line react-refresh/only-export-components

const getRouteWrapper = (component, authRoute = true) => {
  return (
    <AuthRedirect authenticatedRoute={authRoute}>
      <Suspense
        fallback={
          <Box
            width="100%"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        }
      >
        {component}
      </Suspense>
    </AuthRedirect>
  );
};

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
        element: getRouteWrapper(<SignInPage />, false),
      },
      {
        path: 'sign-up',
        element: getRouteWrapper(<SignUpPage />, false),
      },
      {
        path: 'feed',
        element: getRouteWrapper(<HomePage />, true),
      },
      {
        path: 'profile',
        element: getRouteWrapper(<ProfilePage />, true),
      },
      {
        path: 'liked-posts',
        element: getRouteWrapper(<LikedPostPage />, true),
      },
    ],
  },

  {
    path: '*',
    element: <DefaultNavigate />,
  },
]);

export default appRouting;
