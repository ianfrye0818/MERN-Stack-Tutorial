//library imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
// import NotFoundPage from './pages/not-found/NotFoundPage';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

//component imports

//custom imports

//type imports

//route imports

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
