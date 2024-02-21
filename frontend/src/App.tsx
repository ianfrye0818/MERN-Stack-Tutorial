//library imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/Home';
// import NotFoundPage from './pages/not-found/NotFoundPage';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Workout from './pages/workouts/Workout';
import Signup from './pages/signup/Signup';
import Signin from './pages/signin/Signin';

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
  {
    path: '/workouts',
    element: <Workout />,
  },
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
