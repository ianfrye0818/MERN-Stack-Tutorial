import { useUser } from '../hooks/useUser';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoutes() {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to='/signin'
        state={{ message: 'You must log in first', from: location.pathname }}
        replace
      />
    );
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
