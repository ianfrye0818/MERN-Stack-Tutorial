import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../hooks/useUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export default function Header() {
  const { isSignedIn, user, setUser } = useUser();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async () => {
      if (user) {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
    },
  });

  async function handleSignOut() {
    try {
      await mutate.mutateAsync();
      queryClient.clear();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className=' p-4 bg-gray-900 text-white h-20 flex items-center'>
      <nav className=' md:container flex justify-between items-center'>
        <h1 className='text-2xl'>Workout Tracker</h1>
        <ul className='flex gap-3'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/workouts'>Workouts</Link>
          </li>
          <li>
            {isSignedIn ? (
              <button onClick={handleSignOut}>Sign Out</button>
            ) : (
              <Link to='/signin'>Sign In</Link>
            )}
          </li>
          {user?.isAdmin && (
            <li>
              <Link to='/workouts/all-workouts'>Get All Workouts</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
