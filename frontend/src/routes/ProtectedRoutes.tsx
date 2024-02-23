import { PropsWithChildren, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }: PropsWithChildren) {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
  }, [user, navigate]);
  return <div>{children}</div>;
}
