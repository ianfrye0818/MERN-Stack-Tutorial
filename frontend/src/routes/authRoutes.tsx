import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AuthRoutes() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/workouts');
    }
  }, [user, navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
}
