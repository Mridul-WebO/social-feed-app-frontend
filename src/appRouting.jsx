import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorPage from './pages/errorPage/ErrorPage';
import SignInPage from './pages/signIn/SignInPage';
import SignUpPage from './pages/signUp/SignUpPage';
// import ProtectedRoute from "./components/ProtectedRoute";
// import Authenticate from "./components/Authenticate";
import { SnackbarProvider } from 'notistack';
import HomePage from './pages/home/HomePage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Context from './context/AuthContext';
import ProfilePage from './pages/profile/ProfilePage';
// import Authenticate from './components/Authenticate';
import Protected from './components/Protected';
import Authenticate from './components/Authenticate';
import PostsContext from './context/PostsContext';

// import Authenticate from './components/Authenticate';

const appRouting = createBrowserRouter([
  {
    path: '/',
    element: (
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Provider store={store}>
          <Context>
            <App />
          </Context>
        </Provider>
      </SnackbarProvider>
    ),
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
            <PostsContext>
              <HomePage />
            </PostsContext>
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
    element: <ErrorPage />,
  },
]);

export default appRouting;
