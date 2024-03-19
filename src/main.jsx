import ReactDOM from 'react-dom/client';
// import { RouterProvider } from 'react-router-dom';
// import appRouting from './appRouting';
import { SnackbarProvider } from 'notistack';
import { store } from './store/store';
import { Provider } from 'react-redux';
import Context from './context/AuthContext';
import App from './App';
import LikedPostContext from './context/LikedPostContext';
// import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <SnackbarProvider
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <Provider store={store}>
      <Context>
        <LikedPostContext>
          <App />
        </LikedPostContext>
      </Context>
    </Provider>
  </SnackbarProvider>
);
