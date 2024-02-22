//library imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

//route imports
import Home from './pages/home/Home';
import Workout from './pages/workouts/Workout';
import Signup from './pages/signup/Signup';
import Signin from './pages/signin/Signin';
import AddAWorkout from './pages/workouts/add-a-workout/AddAWorkout';
import NotFoundPage from './pages/not-found/NotFoundPage';

//create new clearly client
const queryClient = new QueryClient();

//define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/workouts',
    element: <Workout />,
  },
  {
    path: '/workouts/add-a-workout',
    element: <AddAWorkout />,
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
