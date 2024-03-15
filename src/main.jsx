import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import appRouting from './appRouting';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouting} />
);
