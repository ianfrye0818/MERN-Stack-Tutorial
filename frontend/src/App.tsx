//library imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

//route imports
import Home from './app/home/page';
import Workout from './app/workouts/page';
import Signup from './app/signup/page';
import Signin from './app/signin/page';
import AddAWorkout from './app/workouts/add-a-workout/page';
import NotFoundPage from './app/not-found/page';
import AuthProviderContext from './context/AuthProviderContext';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AllWorkouts from './app/get-all-workouts/page';

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
    element: (
      <ProtectedRoutes>
        <Workout />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/workouts/add-a-workout',
    element: (
      <ProtectedRoutes>
        <AddAWorkout />
      </ProtectedRoutes>
    ),
  },
  {
    path: '/workouts/all-workouts',
    element: (
      <ProtectedRoutes>
        <AllWorkouts />
      </ProtectedRoutes>
    ),
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
    <AuthProviderContext>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProviderContext>
  );
}
