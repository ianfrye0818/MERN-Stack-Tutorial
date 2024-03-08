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
import AuthRoutes from './routes/authRoutes';

//create new clearly client
const queryClient = new QueryClient();

//define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRoutes />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <Home /> },
      { path: 'signup', element: <Signup /> },
      { path: 'signin', element: <Signin /> },
    ],
  },
  {
    path: '/workouts',
    element: <ProtectedRoutes />,
    children: [
      { path: '', element: <Workout /> },
      { path: 'add-a-workout', element: <AddAWorkout /> },
      { path: 'all-workouts', element: <AllWorkouts /> },
    ],
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
